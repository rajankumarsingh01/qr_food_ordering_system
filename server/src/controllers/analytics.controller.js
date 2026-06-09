import Order from "../models/Order.model.js";

import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";


const getRevenueAnalytics =
  asyncHandler(async (req, res) => {
    const revenue =
      await Order.aggregate([
        {
          $match: {
            paymentStatus:
              "paid",
          },
        },

        {
          $group: {
            _id: {
              $dateToString: {
                format:
                  "%Y-%m-%d",

                date:
                  "$createdAt",
              },
            },

            totalRevenue: {
              $sum:
                "$totalAmount",
            },

            totalOrders: {
              $sum: 1,
            },
          },
        },

        {
          $sort: {
            _id: 1,
          },
        },
      ]);

    return res.status(200).json(
      new ApiResponse(
        200,
        revenue,
        "Revenue analytics fetched"
      )
    );
  });


  const getTopItems =
  asyncHandler(async (req, res) => {
    const items =
      await Order.aggregate([
        {
          $unwind:
            "$items",
        },

        {
          $group: {
            _id:
              "$items.name",

            totalQuantity: {
              $sum:
                "$items.quantity",
            },

            revenue: {
              $sum: {
                $multiply: [
                  "$items.price",
                  "$items.quantity",
                ],
              },
            },
          },
        },

        {
          $sort: {
            totalQuantity:
              -1,
          },
        },

        {
          $limit: 10,
        },
      ]);

    return res.status(200).json(
      new ApiResponse(
        200,
        items,
        "Top items fetched"
      )
    );
  });



  const getPeakHours =
  asyncHandler(async (req, res) => {
    const peakHours =
      await Order.aggregate([
        {
          $group: {
            _id: {
              $hour:
                "$createdAt",
            },

            totalOrders: {
              $sum: 1,
            },
          },
        },

        {
          $sort: {
            _id: 1,
          },
        },
      ]);

    return res.status(200).json(
      new ApiResponse(
        200,
        peakHours,
        "Peak hours fetched"
      )
    );
  });


  export {
  getRevenueAnalytics,
  getTopItems,
  getPeakHours,
};