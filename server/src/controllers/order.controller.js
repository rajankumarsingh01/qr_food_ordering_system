import Order from "../models/Order.model.js";
import Table from "../models/Table.model.js";
import MenuItem from "../models/MenuItem.model.js";

import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import {
  getIO,
} from "../sockets/socketManager.js";

import Payment from "../models/Payment.model.js";
import razorpayInstance from "../services/payment.service.js";




const STATUS_FLOW = {
  received: ["preparing"],
  preparing: ["ready"],
  ready: ["served"],
  served: [],
};

const createOrder = asyncHandler(async (req, res) => {
  const { tableNumber, items } = req.body;

  if (!tableNumber || !items || !items.length) {
    throw new ApiError(
      400,
      "Table number and items are required"
    );
  }

  const table = await Table.findOne({
    tableNumber,
  });

  if (!table) {
    throw new ApiError(
      404,
      "Table not found"
    );
  }

  const orderItems = [];
  let totalAmount = 0;
  let maxPreparationTime = 0;

  for (const item of items) {
    if (
      !item.quantity ||
      item.quantity < 1
    ) {
      throw new ApiError(
        400,
        "Invalid quantity"
      );
    }

    const menuItem =
      await MenuItem.findById(
        item.menuItemId
      );

    if (!menuItem) {
      throw new ApiError(
        404,
        "Menu item not found"
      );
    }

    if (!menuItem.isAvailable) {
      throw new ApiError(
        400,
        `${menuItem.name} is unavailable`
      );
    }

    const itemTotal =
      menuItem.price *
      item.quantity;

    totalAmount += itemTotal;

    maxPreparationTime = Math.max(
      maxPreparationTime,
      menuItem.preparationTime || 10
    );

    orderItems.push({
      menuItem: menuItem._id,
      name: menuItem.name,
      price: menuItem.price,
      quantity: item.quantity,
      specialNote:
        item.specialNote || "",
    });

    await MenuItem.findByIdAndUpdate(
      menuItem._id,
      {
        $inc: {
          totalOrders:
            item.quantity,
        },
      }
    );
  }

  const estimatedReadyTime =
    new Date(
      Date.now() +
        maxPreparationTime *
          60 *
          1000
    );

  const order =
    await Order.create({
      tableId: table._id,

      tableNumber,

      items: orderItems,

      totalAmount,

      status: "received",

      paymentStatus: "pending",

      estimatedReadyTime,
    });

    const io = getIO();

io.to("admin").emit(
  "new_order",
  {
    order,
  }
);

io.to("kitchen").emit(
  "kitchen_alert",
  {
    order,
  }
);

io.to("kitchen").emit(
  "new_order",
  {
    order,
  }
);

  return res.status(201).json(
    new ApiResponse(
      201,
      order,
      "Order placed successfully"
    )
  );
});

const getOrders =
  asyncHandler(async (req, res) => {
    const orders =
      await Order.find()
        .sort({
          createdAt: -1,
        });

    return res.status(200).json(
      new ApiResponse(
        200,
        orders,
        "Orders fetched successfully"
      )
    );
  });

const getOrderById =
  asyncHandler(async (req, res) => {
    const order =
      await Order.findById(
        req.params.id
      );

    if (!order) {
      throw new ApiError(
        404,
        "Order not found"
      );
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        order,
        "Order fetched successfully"
      )
    );
  });

const updateOrderStatus =
  asyncHandler(async (req, res) => {
    const { status } =
      req.body;

    const allowedStatus = [
      "received",
      "preparing",
      "ready",
      "served",
    ];

    if (
      !allowedStatus.includes(
        status
      )
    ) {
      throw new ApiError(
        400,
        "Invalid status"
      );
    }

    const order =
      await Order.findById(
        req.params.id
      );

    if (!order) {
      throw new ApiError(
        404,
        "Order not found"
      );
    }

    const allowedTransitions =
      STATUS_FLOW[
        order.status
      ] || [];

    if (
      !allowedTransitions.includes(
        status
      )
    ) {
      throw new ApiError(
        400,
        `Invalid status transition from ${order.status} to ${status}`
      );
    }

    order.status = status;

    await order.save();

const io = getIO();

io.to(
  `table_${order.tableNumber}`
).emit(
  "order_status_update",
  {
    orderId:
      order._id,

    status:
      order.status,
  }
);


    return res.status(200).json(
      new ApiResponse(
        200,
        order,
        "Order status updated successfully"
      )
    );
  });


const cancelOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  // ✅ STEP 1 - Debug logs add karo
  console.log("🟡 Order:", order?.status, order?.paymentStatus);

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  if (order.status === "cancelled") {
    throw new ApiError(400, "Order is already cancelled");
  }

  if (order.status !== "received") {
    throw new ApiError(400, `Cannot cancel. Status: ${order.status}`);
  }

  let refundData = null;

if (order.paymentStatus === "paid") {
  const payment = await Payment.findOne({ orderId: order._id });

  if (!payment || !payment.razorpayPaymentId) {
    console.log("⚠️ No payment record — skipping refund");
  
  // ✅ Already refunded check - dobara refund mat karo
  } else if (payment.status === "refunded") {
    console.log("⚠️ Already refunded — skipping");
    refundData = {
      refundId: payment.refundId || null,
      amount: order.totalAmount,
      status: "already_refunded",
    };

  } else {
    // ✅ Razorpay call try-catch mein wrap karo
    try {
      const refund = await razorpayInstance.payments.refund(
        payment.razorpayPaymentId,
        {
          amount: order.totalAmount * 100,
          notes: {
            reason: "Customer cancelled order",
            orderId: order._id.toString(),
          },
        }
      );

      payment.status = "refunded";
      payment.refundId = refund.id;
      await payment.save();

      refundData = {
        refundId: refund.id,
        amount: order.totalAmount,
        status: refund.status,
      };

    } catch (razorpayError) {
      // ✅ Razorpay error ko properly log karo
      console.log("🔴 Razorpay Error:", JSON.stringify(razorpayError));
      throw new ApiError(
        502,
        `Refund failed: ${razorpayError?.error?.description || razorpayError?.message || "Razorpay error"}`
      );
    }
  }
}

  order.status = "cancelled";
  order.paymentStatus =
    order.paymentStatus === "paid" ? "refunded" : "cancelled";
  await order.save();

  const io = getIO();
  io.to(`table_${order.tableNumber}`).emit("order_status_update", {
    orderId: order._id,
    status: "cancelled",
  });

  io.to("admin").emit("order_cancelled", {
    orderId: order._id,
    tableNumber: order.tableNumber,
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      { order, refund: refundData },
      refundData
        ? "Order cancelled and refund initiated."
        : "Order cancelled successfully."
    )
  );
});


const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  await order.deleteOne();

  const io = getIO();
  io.to("admin").emit("order_deleted", { orderId: order._id });

  return res.status(200).json(
    new ApiResponse(200, {}, "Order deleted successfully")
  );
});

export {
  createOrder,
  getOrders,
  getOrderById,
  deleteOrder,
  cancelOrder,
  updateOrderStatus,
};