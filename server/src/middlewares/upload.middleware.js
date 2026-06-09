import multer from "multer";

// ✅ memoryStorage - file pehle memory mein aati hai
// req.file.buffer milta hai
// phir manually cloudinary pe upload hoti hai uploadImageToCloudinary se
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

export default upload;





// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import { cloudinary } from "../config/cloudinary.js";  // ✅ named import

// const storage = new CloudinaryStorage({  // ✅ sirf ek storage
//   cloudinary,
//   params: async (req, file) => ({
//     folder: "qr-food-ordering",
//     resource_type: "image",
//     allowed_formats: ["jpg", "jpeg", "png", "webp"],
//   }),
// });

// const upload = multer({
//   storage,
//   limits: {
//     fileSize: 5 * 1024 * 1024,
//   },
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype.startsWith("image/")) {
//       cb(null, true);
//     } else {
//       cb(new Error("Only image files are allowed"));
//     }
//   },
// });

// export default upload;








/*
==============================================================================
📌 FILE: upload.js

PURPOSE:

Image upload middleware.

Multer image receive karta hai aur Cloudinary par upload karta hai.

==============================================================================

📌 multer

File upload middleware.

Express khud image/file upload handle nahi karta.

==============================================================================

📌 CloudinaryStorage

Multer ko batata hai ki file local server ki jagah
Cloudinary par save karni hai.

==============================================================================

📌 cloudinary

Configured Cloudinary account connection.

==============================================================================

📌 folder: "qr-food-ordering"

Cloudinary ke andar uploads ko organize karta hai.

Result:

Cloudinary
   ↓
qr-food-ordering
   ↓
uploaded images

==============================================================================

📌 resource_type: "image"

Sirf image uploads allow karega.

==============================================================================

📌 allowed_formats

Allowed image formats:

jpg
jpeg
png
webp

Security ke liye.

==============================================================================

📌 limits.fileSize

Maximum allowed file size.

5 * 1024 * 1024

= 5 MB

==============================================================================

📌 upload.single("image")

Single image upload.

==============================================================================

📌 upload.array("images",5)

Multiple image uploads.

==============================================================================

📌 FLOW

Client Image
      ↓
Multer
      ↓
CloudinaryStorage
      ↓
Cloudinary Upload
      ↓
Image URL Generate
      ↓
Controller
      ↓
MongoDB Save

==============================================================================

📌 Security Features

✅ Allowed Formats

✅ Max File Size

==============================================================================

📌 Interview Question

Q: Multer kyu use karte hain?

Answer:

Express applications me file uploads handle karne ke liye.

==============================================================================

📌 Interview Question

Q: Cloudinary kyu use karte hain?

Answer:

Images ko cloud storage me securely store karne,
optimize karne aur globally serve karne ke liye.

==============================================================================
*/