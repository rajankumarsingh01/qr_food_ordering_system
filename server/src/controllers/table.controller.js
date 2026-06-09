import Table from "../models/Table.model.js";

import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import generateQRCode
from "../services/qrService.js";

import {
  uploadBufferToCloudinary,
  cloudinary,
}
from "../config/cloudinary.js";


const createTable =
  asyncHandler(async (req, res) => {
    const { tableNumber } =
      req.body;

    if (!tableNumber) {
      throw new ApiError(
        400,
        "Table number required"
      );
    }

    const existingTable =
      await Table.findOne({
        tableNumber,
      });

    if (existingTable) {
      throw new ApiError(
        409,
        "Table already exists"
      );
    }

    // const qrValue =
    //   `${process.env.CLIENT_URL}/menu?table=${tableNumber}`;

    const qrValue =
  `${process.env.CLIENT_URL}/customer/menu?table=${tableNumber}`;


    const qrBuffer =
      await generateQRCode(
        qrValue
      );

    const uploadedQR =
      await uploadBufferToCloudinary(
        qrBuffer,
        "qr-food/tables"
      );

    const table =
      await Table.create({
        tableNumber,

        qrValue,

        qrCodeUrl:
          uploadedQR.secure_url,

        qrCodePublicId:
          uploadedQR.public_id,
      });

    return res.status(201).json(
      new ApiResponse(
        201,
        table,
        "Table created successfully"
      )
    );
  });








  const getTables =
  asyncHandler(async (req, res) => {
    const tables =
      await Table.find()
        .sort({
          tableNumber: 1,
        });

    return res.status(200).json(
      new ApiResponse(
        200,
        tables,
        "Tables fetched successfully"
      )
    );
  });







  const deleteTable =
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const table =
      await Table.findById(id);

    if (!table) {
      throw new ApiError(
        404,
        "Table not found"
      );
    }

    if (
      table.qrCodePublicId
    ) {
      await cloudinary.uploader.destroy(
        table.qrCodePublicId
      );
    }

    await table.deleteOne();

    return res.status(200).json(
      new ApiResponse(
        200,
        {},
        "Table deleted successfully"
      )
    );
  });










  export {
  createTable,
  getTables,
  deleteTable,
};