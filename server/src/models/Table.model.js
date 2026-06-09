import mongoose from "mongoose";

const tableSchema = new mongoose.Schema(
  {
    tableNumber: {
      type: Number,
      required: [true, "Table number is required"],
      unique: true,
      min: 1,
      index: true,
    },

    qrCodeUrl: {
      type: String,
      default: null,
      trim: true,
    },
    qrValue: {
      type: String,
    },

    qrCodePublicId: {
      type: String,
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// tableSchema.index({
//   tableNumber: 1,
// });

tableSchema.virtual("tableLabel").get(
  function () {
    return `Table ${this.tableNumber}`;
  }
);

tableSchema.set("toJSON", {
  virtuals: true,
});

tableSchema.set("toObject", {
  virtuals: true,
});

const Table = mongoose.model(
  "Table",
  tableSchema
);

export default Table;
























/*
==============================================================================
📌 TABLE MODEL

Restaurant ki tables ko manage karta hai.

Example:

{
   tableNumber: 1,
   qrCodeUrl:"https://cloudinary....",
   isActive:true
}

Har physical table ka ek document hoga.

Example:

Table 1
Table 2
Table 3
Table 4

==============================================================================

📌 tableNumber

Restaurant ka table number.

Example:

1
2
3
4

required:true

Table number dena mandatory hai.

==============================================================================

📌 unique:true

Same table number do baar nahi ban sakta.

Example:

Table 5 ✅

Table 5 ❌

Duplicate allow nahi.

==============================================================================

📌 min:1

Table number 1 se kam nahi ho sakta.

Allowed:

1
2
3

Not Allowed:

0
-1

==============================================================================

📌 index:true

Table number se searching fast hogi.

Example:

Table.findOne({
   tableNumber:5
})

==============================================================================

📌 qrCodeUrl

Customer jo QR scan karega us QR image ka URL.

Example:

https://res.cloudinary.com/abc/table5.png

==============================================================================

📌 default:null

Initially QR generate nahi hua.

To:

null

store hoga.

==============================================================================

📌 trim:true

Extra spaces remove karega.

==============================================================================

📌 qrCodePublicId

Cloudinary ka internal image id.

Example:

qr-food-ordering/table-5

==============================================================================

IMPORTANT

qrCodeUrl

Customer ko image show karne ke liye.

----------------------------------

qrCodePublicId

Cloudinary me image delete/update karne ke liye.

==============================================================================

📌 isActive

Table active hai ya nahi.

true

Table available.

----------------------------------

false

Table disabled.

==============================================================================

Real Example

Restaurant renovation.

Table 8 temporarily closed.

↓

isActive:false

Customer order nahi kar sakta.

==============================================================================

📌 timestamps:true

Automatically add:

createdAt
updatedAt

==============================================================================

📌 index({
   tableNumber:1
})

Table searching fast karega.

NOTE:

Upar field me bhi index:true laga hua hai.

Isliye ye index thoda redundant hai.

Production me normally ek hi index kaafi hota hai.

==============================================================================

📌 virtual("tableLabel")

Database me save nahi hota.

Runtime pe generate hota hai.

==============================================================================

📌 return `Table ${this.tableNumber}`

Example:

tableNumber = 5

↓

tableLabel

"Table 5"

==============================================================================

📌 this.tableNumber

Current table document ka number.

Example:

{
   tableNumber:10
}

↓

this.tableNumber

↓

10

==============================================================================

📌 API Response Example

Database:

{
   tableNumber:10
}

----------------------------------

Response:

{
   tableNumber:10,
   tableLabel:"Table 10"
}

==============================================================================

📌 toJSON

Virtual fields response me include karega.

==============================================================================

📌 toObject

Object conversion me virtual fields include karega.

==============================================================================

📌 mongoose.model(
   "Table",
   tableSchema
)

Model create karta hai.

MongoDB Collection:

tables

==============================================================================

📌 COMPLETE FLOW

Admin Creates Table
        ↓

Table Number = 5

        ↓

QR Generate

        ↓

Cloudinary Upload

        ↓

qrCodeUrl Save

        ↓

Customer Scan QR

        ↓

Menu Open

        ↓

Order Place

==============================================================================

📌 INTERVIEW QUESTION

Q: unique:true kyu lagaya?

Answer:

Duplicate table numbers ko prevent karne ke liye.

==============================================================================

📌 INTERVIEW QUESTION

Q: qrCodeUrl aur qrCodePublicId dono kyu store karte hain?

Answer:

qrCodeUrl:
Customer ko QR image show karne ke liye.

----------------------------------

qrCodePublicId:
Cloudinary se QR image update/delete karne ke liye.

==============================================================================

📌 INTERVIEW QUESTION

Q: Virtual field kya hai?

Answer:

Database me save nahi hoti.

Runtime pe generate hoti hai.

Example:

tableLabel

==============================================================================

📌 INTERVIEW QUESTION

Q: Table model ka purpose kya hai?

Answer:

Restaurant ki physical tables aur unke QR codes ko manage karna.

==============================================================================
*/