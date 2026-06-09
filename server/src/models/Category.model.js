import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      unique: true,
      maxlength: 50,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      
    },

    displayOrder: {
      type: Number,
      default: 0,
      min: 0,
      index: true,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    description: {
      type: String,
      default: "",
      maxlength: 200,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

categorySchema.pre("validate", function () {
  if (this.name) {
    this.slug = this.name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-");
  }
});


categorySchema.index({
  isActive: 1,
  displayOrder: 1,
});

categorySchema.index({
  slug: 1,
});

categorySchema.virtual("menuUrl").get(
  function () {
    return `/menu/category/${this.slug}`;
  }
);

categorySchema.set("toJSON", {
  virtuals: true,
});

categorySchema.set("toObject", {
  virtuals: true,
});

const Category = mongoose.model(
  "Category",
  categorySchema
);

export default Category;
















/*
==============================================================================
📌 CATEGORY MODEL

Ye MongoDB me Category collection ka blueprint hai.

Example Category:

{
   name: "South Indian",
   slug: "south-indian",
   displayOrder: 1,
   isActive: true,
   description: "South Indian Foods"
}

==============================================================================

📌 name

Category ka actual naam.

Example:

"South Indian"
"Pizza"
"Burger"

required:
Category name dena mandatory hai.

trim:true
Start aur end ke extra spaces remove karega.

Example:

"  Pizza  "

↓

"Pizza"

unique:true

Database me same category do baar nahi banegi.

Example:

Pizza ✅

Pizza ❌

maxlength:50

Maximum 50 characters allowed.

==============================================================================

📌 slug

URL friendly version of category name.

Example:

Name:
"South Indian"

Slug:
"south-indian"

required:true

Slug mandatory hai.

unique:true

Duplicate slug allow nahi hoga.

lowercase:true

Automatically lowercase store hoga.

Example:

"SOUTH-INDIAN"

↓

"south-indian"

trim:true

Extra spaces remove karega.

index:true

Slug se searching fast ho jayegi.

Example:

Category.findOne({
   slug:"pizza"
})

==============================================================================

📌 displayOrder

Frontend me category kis order me dikhegi.

Example:

Pizza        → 1

Burger       → 2

Drinks       → 3

default:0

Value na do to 0 store hoga.

min:0

Negative value allow nahi.

index:true

Sorting fast hogi.

==============================================================================

📌 isActive

Category visible hai ya nahi.

true  = show category

false = hide category

Example:

Pizza     → true

Old Menu  → false

index:true

Filtering fast hogi.

==============================================================================

📌 description

Category description.

Example:

"All South Indian dishes"

default:""

Agar description na mile to empty string.

maxlength:200

Maximum 200 characters.

trim:true

Extra spaces remove karega.

==============================================================================

📌 timestamps:true

Automatically add karta hai:

createdAt
updatedAt

Example:

{
 createdAt:"2026-06-07",
 updatedAt:"2026-06-07"
}

==============================================================================

📌 pre("validate")

Mongoose middleware.

Validation hone se pehle chalega.

Flow:

Category Create
      ↓
pre("validate")
      ↓
Validation
      ↓
Save

==============================================================================

📌 if(this.name)

Check karta hai ki name exist karta hai ya nahi.

==============================================================================

📌 this.name.toLowerCase()

Sab lowercase bana deta hai.

Example:

"South Indian"

↓

"south indian"

==============================================================================

📌 trim()

Extra spaces remove karta hai.

Example:

"  Pizza  "

↓

"Pizza"

==============================================================================

📌 replace(/\\s+/g,"-")

Spaces ko dash (-) me convert karta hai.

Example:

"South Indian Food"

↓

"south-indian-food"

==============================================================================

📌 next()

Middleware complete hua.

Ab next step chalao.

==============================================================================

📌 categorySchema.index({
   isActive:1,
   displayOrder:1
})

Compound Index

Dono fields par ek saath index.

Use Case:

Category.find({
   isActive:true
}).sort({
   displayOrder:1
})

Fast execution.

==============================================================================

📌 categorySchema.index({
   slug:1
})

Slug searching fast karega.

Example:

Category.findOne({
   slug:"pizza"
})

==============================================================================

📌 virtual("menuUrl")

Database me save nahi hota.

Runtime pe generate hota hai.

Example:

slug = "pizza"

↓

menuUrl

"/menu/category/pizza"

==============================================================================

📌 get(function(){})

Virtual value generate karta hai.

Example Output:

{
  slug:"pizza",
  menuUrl:"/menu/category/pizza"
}

==============================================================================

📌 this.slug

Current document ka slug.

Example:

this.slug

↓

"pizza"

==============================================================================

📌 toJSON

JSON response me virtual fields include karega.

Without:

{
   slug:"pizza"
}

With:

{
   slug:"pizza",
   menuUrl:"/menu/category/pizza"
}

==============================================================================

📌 toObject

Object conversion me bhi virtual fields include karega.

==============================================================================

📌 mongoose.model(
   "Category",
   categorySchema
)

Model create karta hai.

MongoDB Collection:

categories

==============================================================================

📌 export default Category

Dusri files me use karne ke liye export.

Example:

import Category from "./models/category.model.js";

==============================================================================

📌 COMPLETE FLOW

Create Category
      ↓
Name Enter

"South Indian Food"

      ↓
pre("validate")

Slug Generate

"south-indian-food"

      ↓
Validation

      ↓
MongoDB Save

      ↓
Virtual Generate

"/menu/category/south-indian-food"

==============================================================================

📌 INTERVIEW QUESTION

Q: Virtual field kya hoti hai?

Answer:

Virtual field database me save nahi hoti.
Runtime pe dynamically generate hoti hai.

==============================================================================

📌 INTERVIEW QUESTION

Q: Index kyu use karte hain?

Answer:

Database searching aur sorting ko fast banane ke liye.

==============================================================================

📌 INTERVIEW QUESTION

Q: Compound Index kya hai?

Answer:

Ek se jyada fields par index banana.

Example:

isActive + displayOrder

==============================================================================
*/