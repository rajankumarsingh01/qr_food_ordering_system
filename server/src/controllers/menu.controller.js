import Category from "../models/Category.model.js";
import MenuItem from "../models/MenuItem.model.js";

import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import {
  uploadImageToCloudinary,
  cloudinary,
} from "../config/cloudinary.js";

import { getIO } from "../sockets/socketManager.js";  // ← SAHI




const createCategory =
  asyncHandler(async (req, res) => {
    const {
      name,
      order,
    } = req.body;

    if (!name) {
      throw new ApiError(
        400,
        "Category name required"
      );
    }

    const exists =
      await Category.findOne({
        name,
      });

    if (exists) {
      throw new ApiError(
        409,
        "Category already exists"
      );
    }

    const category =
      await Category.create({
        name,
        order:
          order || 0,
      });

    return res.status(201).json(
      new ApiResponse(
        201,
        category,
        "Category created"
      )
    );
  });



const getCategories =
  asyncHandler(async (req, res) => {
    const categories = await Category.find({ isActive: true })
      .sort({ displayOrder: 1 });  // pehle .sort({ order: 1 }) tha

    return res.status(200).json(
      new ApiResponse(
        200,
        categories,
        "Categories fetched"
      )
    );
  });




const createMenuItem =
  asyncHandler(async (req, res) => {
    const {
      name,
      description,
      price,
      category,
      isVeg,
      preparationTime,
    } = req.body;

    if (
      !name ||
      !price ||
      !category
    ) {
      throw new ApiError(
        400,
        "Required fields missing"
      );
    }

    let imageData = null;

    if (req.file) {
      imageData =
        await uploadImageToCloudinary(
          req.file.buffer,
          "qr-food/menu"
        );
    }

    const menuItem = await MenuItem.create({
      name,
      description,
      price,
      category,
      isVeg,
      preparationTime,
      image: imageData?.secure_url,
      imagePublicId: imageData?.public_id,   // ← ye add karo
    });

    return res.status(201).json(
      new ApiResponse(
        201,
        menuItem,
        "Menu item created"
      )
    );
  });




const getMenuItems =
  asyncHandler(async (req, res) => {
    const items =
      await MenuItem.find({
        isAvailable: true,
      })
        .populate(
          "category",
          "name"
        )
        .sort({
          createdAt: -1,
        });

    return res.status(200).json(
      new ApiResponse(
        200,
        items,
        "Menu fetched"
      )
    );
  });




const toggleAvailability = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const item = await MenuItem.findById(id);

  if (!item) {
    throw new ApiError(404, "Menu item not found");
  }

  item.isAvailable = !item.isAvailable;
  await item.save();

  const io = getIO();
  io.emit("item_unavailable", {
    menuItemId: item._id,       // ← item, not menuItem
    isAvailable: item.isAvailable,
  });

  return res.status(200).json(
    new ApiResponse(200, item, "Availability updated")
  );
});




const deleteMenuItem = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const item = await MenuItem.findById(id);

  if (!item) {
    throw new ApiError(404, "Menu item not found");
  }

  if (item.imagePublicId) {
    await cloudinary.uploader.destroy(item.imagePublicId);
  }

  await item.deleteOne();

  return res.status(200).json(
    new ApiResponse(200, {}, "Menu item deleted")
  );
});





export {
  createCategory,
  getCategories,

  createMenuItem,
  getMenuItems,

  toggleAvailability,
  deleteMenuItem,
};