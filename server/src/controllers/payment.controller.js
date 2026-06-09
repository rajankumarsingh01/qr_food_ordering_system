// import crypto from "crypto";

// import Order from "../models/Order.model.js";
// import Payment from "../models/Payment.model.js";

// import ApiError from "../utils/ApiError.js";
// import ApiResponse from "../utils/ApiResponse.js";
// import asyncHandler from "../utils/asyncHandler.js";

// import razorpayInstance from "../services/payment.service.js";

//     import {
//   getIO,
// } from "../sockets/socketManager.js";



// const createRazorpayOrder =
//   asyncHandler(async (req, res) => {
//     const { orderId } =
//       req.body;

//     if (!orderId) {
//       throw new ApiError(
//         400,
//         "Order ID required"
//       );
//     }

//     const order =
//       await Order.findById(
//         orderId
//       );

//     if (!order) {
//       throw new ApiError(
//         404,
//         "Order not found"
//       );
//     }

// const razorpayOrder =
//   await razorpayInstance.orders.create({
//     amount:
//       order.totalAmount * 100,

//     currency: "INR",

//     receipt:
//       order._id.toString(),

//     notes: {
//       orderId:
//         order._id.toString(),

//       tableNumber:
//         order.tableNumber,
//     },
//   });
//     await Payment.create({
//       orderId:
//         order._id,

//       razorpayOrderId:
//         razorpayOrder.id,

//       amount:
//         order.totalAmount,

//       status: "created",
//     });

//     return res.status(200).json(
//       new ApiResponse(
//         200,
//         razorpayOrder,
//         "Razorpay order created"
//       )
//     );
//   });




//   const verifyPayment =
//   asyncHandler(async (req, res) => {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//     } = req.body;

//     const generatedSignature =
//       crypto
//         .createHmac(
//           "sha256",
//           process.env
//             .RAZORPAY_KEY_SECRET
//         )
//         .update(
//           `${razorpay_order_id}|${razorpay_payment_id}`
//         )
//         .digest("hex");

//     const isValid =
//       generatedSignature ===
//       razorpay_signature;

//     if (!isValid) {
//       throw new ApiError(
//         400,
//         "Payment verification failed"
//       );
//     }

//     const payment =
//       await Payment.findOne({
//         razorpayOrderId:
//           razorpay_order_id,
//       });


//       if (payment.status === "paid") {
//   return res.status(200).json(
//     new ApiResponse(
//       200,
//       payment,
//       "Payment already verified"
//     )
//   );
// }

//     if (!payment) {
//       throw new ApiError(
//         404,
//         "Payment record not found"
//       );
//     }

//     payment.razorpayPaymentId =
//       razorpay_payment_id;

//     payment.status = "paid";

//     await payment.save();

//     await Order.findByIdAndUpdate(
//       payment.orderId,
//       {
//         paymentStatus: "paid",
//       }
//     );

//     const order =
//   await Order.findById(
//     payment.orderId
//   );

// const io = getIO();

// io.to(
//   `table_${order.tableNumber}`
// ).emit(
//   "payment_confirmed",
//   {
//     orderId:
//       order._id,
//   }
// );




 


// const markPaymentFailed =
//   asyncHandler(async (req, res) => {
//     const {
//       razorpayOrderId,
//     } = req.body;

//     if (!razorpayOrderId) {
//       throw new ApiError(
//         400,
//         "Razorpay Order ID required"
//       );
//     }

//     const payment =
//       await Payment.findOne({
//         razorpayOrderId,
//       });

//     if (!payment) {
//       throw new ApiError(
//         404,
//         "Payment not found"
//       );
//     }

//     payment.status = "failed";

//     await payment.save();

//     await Order.findByIdAndUpdate(
//       payment.orderId,
//       {
//         paymentStatus:
//           "failed",
//       }
//     );

//     return res.status(200).json(
//       new ApiResponse(
//         200,
//         {},
//         "Payment marked as failed"
//       )
//     );
//   });

//   export {
//   createRazorpayOrder,
//   verifyPayment,
//   markPaymentFailed
// };




import crypto from "crypto";

import Order from "../models/Order.model.js";
import Payment from "../models/Payment.model.js";

import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import razorpayInstance from "../services/payment.service.js";

import { getIO } from "../sockets/socketManager.js";


const createRazorpayOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.body;

  if (!orderId) {
    throw new ApiError(400, "Order ID required");
  }

  const order = await Order.findById(orderId);

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  const razorpayOrder = await razorpayInstance.orders.create({
    amount: order.totalAmount * 100,
    currency: "INR",
    receipt: order._id.toString(),
    notes: {
      orderId: order._id.toString(),
      tableNumber: order.tableNumber,
    },
  });

  await Payment.create({
    orderId: order._id,
    razorpayOrderId: razorpayOrder.id,
    amount: order.totalAmount,
    status: "created",
  });

  return res.status(200).json(
    new ApiResponse(200, razorpayOrder, "Razorpay order created")
  );
});




const verifyPayment = asyncHandler(async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body;

  // ✅ Bug Fix 1: pehle payment dhundo, phir null check karo
  const payment = await Payment.findOne({
    razorpayOrderId: razorpay_order_id,
  });

  if (!payment) {
    throw new ApiError(404, "Payment record not found");
  }

  // ✅ Duplicate payment check baad mein
  if (payment.status === "paid") {
    return res.status(200).json(
      new ApiResponse(200, payment, "Payment already verified")
    );
  }

  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  const isValid = generatedSignature === razorpay_signature;

  if (!isValid) {
    throw new ApiError(400, "Payment verification failed");
  }

  payment.razorpayPaymentId = razorpay_payment_id;
  payment.status = "paid";
  await payment.save();

  await Order.findByIdAndUpdate(payment.orderId, {
    paymentStatus: "paid",
  });

  const order = await Order.findById(payment.orderId);

  const io = getIO();
  io.to(`table_${order.tableNumber}`).emit("payment_confirmed", {
    orderId: order._id,
  });

  // ✅ Bug Fix 2: response missing tha — function idhar khatam hi nahi ho raha tha
  return res.status(200).json(
    new ApiResponse(200, payment, "Payment verified successfully")
  );
});




const markPaymentFailed = asyncHandler(async (req, res) => {
  const { razorpayOrderId } = req.body;

  if (!razorpayOrderId) {
    throw new ApiError(400, "Razorpay Order ID required");
  }

  const payment = await Payment.findOne({ razorpayOrderId });

  if (!payment) {
    throw new ApiError(404, "Payment not found");
  }

  payment.status = "failed";
  await payment.save();

  await Order.findByIdAndUpdate(payment.orderId, {
    paymentStatus: "failed",
  });

  return res.status(200).json(
    new ApiResponse(200, {}, "Payment marked as failed")
  );
});


export { createRazorpayOrder, verifyPayment, markPaymentFailed };