import Review from "../models/Review.model.js";
import Order from "../models/Order.model.js";

import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";




const createReview =
  asyncHandler(async (req, res) => {
    const {
      orderId,
      rating,
      comment,
    } = req.body;

    if (!orderId) {
      throw new ApiError(
        400,
        "Order ID required"
      );
    }

    if (
      !rating ||
      rating < 1 ||
      rating > 5
    ) {
      throw new ApiError(
        400,
        "Rating must be between 1 and 5"
      );
    }

    const order =
      await Order.findById(
        orderId
      );

    if (!order) {
      throw new ApiError(
        404,
        "Order not found"
      );
    }

    if (
      order.status !== "served"
    ) {
      throw new ApiError(
        400,
        "Review allowed only after order is served"
      );
    }

    const existingReview =
      await Review.findOne({
        orderId,
      });

    if (existingReview) {
      throw new ApiError(
        400,
        "Review already submitted"
      );
    }

    const review =
      await Review.create({
        orderId,

        tableNumber:
          order.tableNumber,

        rating,

        comment:
          comment || "",
      });

    return res.status(201).json(
      new ApiResponse(
        201,
        review,
        "Review submitted successfully"
      )
    );
  });




const getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find()
    .populate({
      path: "orderId",
      select: "totalAmount status tableNumber items",
    })
    .sort({ createdAt: -1 });

  // ✅ null populate filter karo
  const safeReviews = reviews.filter((r) => r.orderId != null);

  return res.status(200).json(
    new ApiResponse(200, safeReviews, "Reviews fetched successfully")
  );
});



  const getReviewByOrder =
  asyncHandler(async (req, res) => {
    const review =
      await Review.findOne({
        orderId:
          req.params.orderId,
      });

    if (!review) {
      throw new ApiError(
        404,
        "Review not found"
      );
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        review,
        "Review fetched successfully"
      )
    );
  });




  export {
  createReview,
  getReviews,
  getReviewByOrder,
};