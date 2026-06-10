import MenuItem from "../models/MenuItem.model.js";
import Category from "../models/Category.model.js";
import Order from "../models/Order.model.js";
import { getChatResponse } from "../services/gemini.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const chat = asyncHandler(async (req, res) => {
  const { message, orderId } = req.body;

  if (!message?.trim()) {
    throw new ApiError(400, "Message is required");
  }

  // Menu data fetch karo
  const [menuItems, categories] = await Promise.all([
    MenuItem.find({ isAvailable: true }).populate("category", "name"),
    Category.find({ isActive: true }),
  ]);

  // Order status fetch karo agar orderId hai
  let orderStatus = null;
  if (orderId) {
    const order = await Order.findById(orderId).catch(() => null);
    if (order) {
      orderStatus = {
        orderId: order._id,
        status: order.status,
        items: order.items,
        totalAmount: order.totalAmount,
      };
    }
  }

  const restaurantInfo = {
    name: "QR Food Restaurant",
    address: "Your Restaurant Address",
  };

  const response = await getChatResponse({
    userMessage: message,
    menuItems,
    categories,
    orderStatus,
    restaurantInfo,
  });

  return res.status(200).json(
    new ApiResponse(200, { reply: response }, "Chat response generated")
  );
});

export { chat };