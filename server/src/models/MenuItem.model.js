import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Item name is required"],
      trim: true,
      maxlength: 100,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: 500,
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
      index: true,
    },

    image: {
      type: String,
      default: null,
    },

    imagePublicId: {
      type: String,
      default: null,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },

    isAvailable: {
      type: Boolean,
      default: true,
      index: true,
    },

    isVeg: {
      type: Boolean,
      default: true,
      index: true,
    },

    preparationTime: {
      type: Number,
      default: 15,
      min: 1,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    totalReviews: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalOrders: {
      type: Number,
      default: 0,
      min: 0,
    },

    isFeatured: {
      type: Boolean,
      default: false,
      
    },
  },
  {
    timestamps: true,
  }
);

menuItemSchema.pre("validate", function () {
  if (this.name) {
    this.slug = this.name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  }
});

menuItemSchema.index({
  category: 1,
  isAvailable: 1,
});

menuItemSchema.index({
  isFeatured: 1,
});

menuItemSchema.index({
  totalOrders: -1,
});

menuItemSchema.index({
  rating: -1,
});

menuItemSchema.virtual(
  "formattedPrice"
).get(function () {
  return `₹${this.price}`;
});

menuItemSchema.set("toJSON", {
  virtuals: true,
});

menuItemSchema.set("toObject", {
  virtuals: true,
});

const MenuItem = mongoose.model(
  "MenuItem",
  menuItemSchema
);

export default MenuItem;









/*
==============================================================================
📌 MENU ITEM MODEL

Restaurant ke menu items ko store karta hai.

Example:

Pizza
Burger
Cold Drink
Paneer Butter Masala

==============================================================================

📌 name

Food item ka naam.

Example:

"Paneer Pizza"

trim:true

Extra spaces remove karega.

maxlength:100

Maximum 100 characters.

==============================================================================

📌 slug

URL friendly version.

Example:

"Paneer Pizza"

↓

"paneer-pizza"

unique:true

Same slug do baar nahi ho sakta.

index:true

Slug search fast hogi.

==============================================================================

📌 description

Food item ka description.

Example:

"Cheesy pizza with paneer toppings"

required:true

Description mandatory hai.

maxlength:500

Maximum 500 characters.

==============================================================================

📌 price

Food ki actual price.

Example:

299

required:true

Price dena mandatory.

min:0

Negative price allow nahi.

index:true

Price based filtering fast hogi.

==============================================================================

📌 image

Cloudinary image URL.

Example:

https://res.cloudinary.com/.../pizza.jpg

default:null

Image optional hai.

==============================================================================

📌 imagePublicId

Cloudinary ka unique image id.

Example:

qr-food-ordering/pizza123

Cloudinary se image delete/update karne me use hota hai.

IMPORTANT:

image URL user ke liye hota hai.

imagePublicId Cloudinary ke liye hota hai.

==============================================================================

📌 category

ObjectId Reference.

Example:

Category Collection

{
   _id:"123",
   name:"Pizza"
}

Menu Item

{
   name:"Paneer Pizza",
   category:"123"
}

==============================================================================

📌 ref:"Category"

Mongoose ko batata hai:

Ye id Category collection ki hai.

==============================================================================

📌 populate()

Baad me use kar sakte ho.

Example:

MenuItem.find()
.populate("category")

Without Populate:

{
   category:"123"
}

With Populate:

{
   category:{
      _id:"123",
      name:"Pizza"
   }
}

==============================================================================

📌 isAvailable

Item currently available hai ya nahi.

true

Customer order kar sakta hai.

false

Hide ya disable kar sakte ho.

Example:

Paneer Pizza Out Of Stock

↓

isAvailable:false

==============================================================================

📌 isVeg

Veg ya Non-Veg identify karta hai.

true

Veg

false

Non-Veg

==============================================================================

📌 preparationTime

Food banne me kitna time lagega.

Default:

15 Minutes

==============================================================================

📌 rating

Customer rating.

Range:

0 → 5

Example:

4.5

==============================================================================

📌 totalReviews

Kitne reviews aaye.

Example:

125 Reviews

==============================================================================

📌 totalOrders

Kitni baar order hua.

Example:

520 Orders

==============================================================================

📌 isFeatured

Special highlighted item.

Example:

🔥 Chef Special

🔥 Best Seller

🔥 Today's Recommendation

Frontend featured section me dikh sakta hai.

==============================================================================

📌 pre("validate")

Validation se pehle run hoga.

==============================================================================

📌 toLowerCase()

"Paneer Pizza"

↓

"paneer pizza"

==============================================================================

📌 trim()

Extra spaces remove.

==============================================================================

📌 replace(/\\s+/g,"-")

Spaces ko dash me convert.

"Paneer Pizza"

↓

"paneer-pizza"

==============================================================================

📌 replace(/[^\\w-]+/g,"")

IMPORTANT

Special characters remove karta hai.

Example:

"Paneer Pizza!!!"

↓

"paneer-pizza"

Example:

"Burger @ Home"

↓

"burger-home"

==============================================================================

📌 category + isAvailable Index

menuItemSchema.index({
   category:1,
   isAvailable:1
})

Compound Index

Fast Query:

MenuItem.find({
   category:id,
   isAvailable:true
})

==============================================================================

📌 isFeatured Index

Fast Query:

MenuItem.find({
   isFeatured:true
})

==============================================================================

📌 totalOrders:-1

Descending Index

Most ordered items quickly fetch karne ke liye.

Example:

Top Selling Foods

==============================================================================

📌 rating:-1

Descending Index

Highest rated foods quickly fetch karne ke liye.

Example:

Best Rated Foods

==============================================================================

📌 virtual("formattedPrice")

Database me save nahi hota.

Runtime pe generate hota hai.

==============================================================================

📌 return `₹${this.price}`

Example:

price:299

↓

formattedPrice

"₹299"

==============================================================================

📌 toJSON

Virtuals API response me include karega.

==============================================================================

📌 toObject

Object conversion me bhi virtuals include karega.

==============================================================================

📌 mongoose.model(
   "MenuItem",
   menuItemSchema
)

Model create karta hai.

MongoDB Collection:

menuitems

==============================================================================

📌 COMPLETE FLOW

Create Food
      ↓

Paneer Pizza

      ↓

Slug Generate

paneer-pizza

      ↓

Validation

      ↓

MongoDB Save

      ↓

Customer Requests API

      ↓

formattedPrice Generate

₹299

==============================================================================

📌 INTERVIEW QUESTION

Q: ref:"Category" ka kya use hai?

Answer:

Collections ke beech relationship create karne ke liye.

==============================================================================

📌 INTERVIEW QUESTION

Q: populate() kya karta hai?

Answer:

Referenced ObjectId ko actual document me convert karta hai.

==============================================================================

📌 INTERVIEW QUESTION

Q: image aur imagePublicId dono kyu store karte hain?

Answer:

image user ko show karne ke liye.

imagePublicId Cloudinary se image update/delete karne ke liye.

==============================================================================

📌 INTERVIEW QUESTION

Q: Virtual field kya hai?

Answer:

Database me save nahi hoti.
Runtime pe dynamically generate hoti hai.

Example:

formattedPrice

==============================================================================
*/