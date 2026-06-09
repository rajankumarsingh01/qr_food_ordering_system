"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Upload } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

import { menuItemSchema, type MenuItemFormData } from "@/schemas/menu.schema";
import { useCreateMenuItemMutation, useGetCategoriesQuery } from "@/redux/api/menuApi";

interface Props { onClose: () => void }

export default function CreateMenuModal({ onClose }: Props) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const { data: categoriesData } = useGetCategoriesQuery();
  const [createMenuItem, { isLoading }] = useCreateMenuItemMutation();

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<MenuItemFormData>({
    resolver: zodResolver(menuItemSchema),
    defaultValues: { isVeg: true },
  });

  const selectedCategory = watch("category");
  const isVeg = watch("isVeg");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data: MenuItemFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", String(data.price));
    formData.append("category", data.category);
    formData.append("isVeg", String(data.isVeg));
    if (data.description) formData.append("description", data.description);
    if (data.preparationTime) formData.append("preparationTime", String(data.preparationTime));
    if (imageFile) formData.append("image", imageFile);
    try {
      await createMenuItem(formData).unwrap();
      toast.success("Menu item created!");
      onClose();
    } catch {
      toast.error("Failed to create item.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4">
      <div className="w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl bg-white dark:bg-gray-900 max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-5 py-4 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Add menu item</h2>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 transition dark:hover:bg-gray-800">
            <X size={16} className="text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">

          {/* Image Upload */}
          <div
            onClick={() => fileRef.current?.click()}
            className="flex h-28 cursor-pointer items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 transition hover:border-orange-300 hover:bg-orange-50/30 dark:border-gray-700 dark:bg-gray-800"
          >
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="preview" className="h-full w-full rounded-xl object-cover" />
            ) : (
              <div className="text-center">
                <Upload size={20} className="mx-auto mb-1.5 text-gray-300" />
                <p className="text-xs text-gray-400">Click to upload image</p>
                <p className="text-[10px] text-gray-300 mt-0.5">JPG, PNG, WEBP up to 5MB</p>
              </div>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />

          {/* Name */}
          <div>
            <label className="mb-1.5 block text-xs font-medium tracking-wide text-gray-500 dark:text-gray-400">Item name *</label>
            <input
              {...register("name")}
              placeholder="e.g. Paneer Tikka"
              className={`w-full rounded-lg border bg-gray-50 px-3 py-2.5 text-sm outline-none placeholder:text-gray-300 focus:border-gray-300 focus:bg-white dark:bg-gray-800 dark:text-white ${errors.name ? "border-red-300" : "border-gray-100 dark:border-gray-700"}`}
            />
            {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="mb-1.5 block text-xs font-medium tracking-wide text-gray-500 dark:text-gray-400">Description</label>
            <textarea
              {...register("description")}
              rows={2}
              placeholder="Short description of the dish..."
              className="w-full rounded-lg border border-gray-100 bg-gray-50 px-3 py-2.5 text-sm outline-none placeholder:text-gray-300 focus:border-gray-300 focus:bg-white resize-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* Price + Prep Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium tracking-wide text-gray-500 dark:text-gray-400">Price (₹) *</label>
              <input
                {...register("price", { valueAsNumber: true })}
                type="number"
                placeholder="299"
                className={`w-full rounded-lg border bg-gray-50 px-3 py-2.5 text-sm outline-none placeholder:text-gray-300 focus:border-gray-300 focus:bg-white dark:bg-gray-800 dark:text-white ${errors.price ? "border-red-300" : "border-gray-100 dark:border-gray-700"}`}
              />
              {errors.price && <p className="mt-1 text-xs text-red-400">{errors.price.message}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium tracking-wide text-gray-500 dark:text-gray-400">Prep time (min)</label>
              <input
                {...register("preparationTime", { valueAsNumber: true })}
                type="number"
                placeholder="15"
                className="w-full rounded-lg border border-gray-100 bg-gray-50 px-3 py-2.5 text-sm outline-none placeholder:text-gray-300 focus:border-gray-300 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>

          {/* ✅ Category — Pill Grid (restaurant style) */}
          <div>
            <label className="mb-2 block text-xs font-medium tracking-wide text-gray-500 dark:text-gray-400">Category *</label>
            <div className="grid grid-cols-3 gap-2">
              {categoriesData?.data.map((cat) => (
                <button
                  key={cat._id}
                  type="button"
                  onClick={() => setValue("category", cat._id, { shouldValidate: true })}
                  className={`py-2 px-3 rounded-lg border text-xs font-medium transition text-center ${
                    selectedCategory === cat._id
                      ? "border-orange-400 bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-400 dark:border-orange-700"
                      : "border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
            {errors.category && <p className="mt-1.5 text-xs text-red-400">{errors.category.message}</p>}
          </div>

          {/* ✅ Veg / Non-Veg — Visual toggle */}
          <div>
            <label className="mb-2 block text-xs font-medium tracking-wide text-gray-500 dark:text-gray-400">Type</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setValue("isVeg", true)}
                className={`flex items-center gap-2.5 rounded-lg border px-3 py-2.5 transition ${
                  isVeg
                    ? "border-green-400 bg-green-50 dark:bg-green-950 dark:border-green-700"
                    : "border-gray-100 bg-gray-50 hover:border-gray-200 dark:border-gray-700 dark:bg-gray-800"
                }`}
              >
                <div className={`w-4 h-4 rounded-[3px] border-[1.5px] flex items-center justify-center ${isVeg ? "border-green-600" : "border-gray-300"}`}>
                  <div className={`w-2 h-2 rounded-full ${isVeg ? "bg-green-600" : "bg-gray-300"}`} />
                </div>
                <span className={`text-xs font-medium ${isVeg ? "text-green-700 dark:text-green-400" : "text-gray-400"}`}>Vegetarian</span>
              </button>
              <button
                type="button"
                onClick={() => setValue("isVeg", false)}
                className={`flex items-center gap-2.5 rounded-lg border px-3 py-2.5 transition ${
                  !isVeg
                    ? "border-red-400 bg-red-50 dark:bg-red-950 dark:border-red-700"
                    : "border-gray-100 bg-gray-50 hover:border-gray-200 dark:border-gray-700 dark:bg-gray-800"
                }`}
              >
                <div className={`w-4 h-4 rounded-[3px] border-[1.5px] flex items-center justify-center ${!isVeg ? "border-red-600" : "border-gray-300"}`}>
                  <div className={`w-2 h-2 rounded-full ${!isVeg ? "bg-red-600" : "bg-gray-300"}`} />
                </div>
                <span className={`text-xs font-medium ${!isVeg ? "text-red-700 dark:text-red-400" : "text-gray-400"}`}>Non-vegetarian</span>
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-gray-900 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 active:scale-[0.98] disabled:opacity-50 dark:bg-gray-700"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Creating...
              </span>
            ) : "Create item"}
          </button>
        </form>
      </div>
    </div>
  );
}