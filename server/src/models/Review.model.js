import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      unique: true,
      index: true,
    },

    tableNumber: {
      type: Number,
      required: true,
      index: true,
    },
       restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      index: true,
    },

    comment: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },

    customerName: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "Anonymous",
    },

    isVisible: {
      type: Boolean,
      default: true,
      index: true,
    },

    isApproved: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

reviewSchema.index({
  rating: 1,
  createdAt: -1,
});

reviewSchema.index({
  isVisible: 1,
  isApproved: 1,
});

reviewSchema.index({
  tableNumber: 1,
});

reviewSchema.virtual("ratingLabel").get(
  function () {
    const labels = {
      1: "Poor",
      2: "Fair",
      3: "Good",
      4: "Very Good",
      5: "Excellent",
    };

    return labels[this.rating];
  }
);

reviewSchema.set("toJSON", {
  virtuals: true,
});

reviewSchema.set("toObject", {
  virtuals: true,
});

const Review = mongoose.model(
  "Review",
  reviewSchema
);

export default Review;






















/*
==============================================================================
📌 REVIEW MODEL

Customer ke feedback aur ratings ko store karta hai.

Example:

{
   orderId:"123",
   tableNumber:5,
   rating:5,
   comment:"Food was amazing",
   customerName:"Rajan"
}

==============================================================================

📌 orderId

Review kis order ke liye diya gaya hai.

Example:

Order:

{
   _id:"123"
}

Review:

{
   orderId:"123"
}

==============================================================================

📌 ref:"Order"

Review ko Order collection se connect karta hai.

Later:

Review.find()
.populate("orderId")

==============================================================================

📌 unique:true

IMPORTANT

Ek order sirf ek hi review de sakta hai.

Example:

Order #123

Review #1 ✅

Review #2 ❌

Duplicate review allow nahi.

==============================================================================

📌 index:true

Order id se review search fast hogi.

==============================================================================

📌 tableNumber

Review kis table se aaya.

Example:

Table 5

Table 10

==============================================================================

📌 rating

Customer rating.

Range:

1 → 5

==============================================================================

📌 min:1

0 rating allow nahi.

==============================================================================

📌 max:5

5 se jyada rating allow nahi.

==============================================================================

📌 Example Ratings

1 = Poor 😡

2 = Fair 😕

3 = Good 🙂

4 = Very Good 😊

5 = Excellent 🤩

==============================================================================

📌 comment

Customer feedback.

Example:

"Food was delicious"

"Service was slow"

trim:true

Extra spaces remove karega.

maxlength:1000

Maximum 1000 characters.

==============================================================================

📌 customerName

Review dene wale customer ka naam.

Example:

Rajan

Amit

Priya

==============================================================================

📌 default:"Anonymous"

Agar naam na de to:

Anonymous

store hoga.

==============================================================================

📌 isVisible

Frontend pe review dikhana hai ya nahi.

true

Review visible.

false

Review hidden.

==============================================================================

Example:

Customer ne abusive comment likh diya.

Admin:

isVisible = false

Frontend se gayab.

==============================================================================

📌 isApproved

Admin moderation ke liye.

true

Approved.

false

Pending/Rejected.

==============================================================================

Example:

New Review
     ↓
Admin Check
     ↓
Approved
     ↓
Show On Website

==============================================================================

📌 timestamps:true

Automatically add:

createdAt
updatedAt

==============================================================================

📌 index({
   rating:1,
   createdAt:-1
})

Fast Query:

Latest 5-star reviews

Latest 4-star reviews

==============================================================================

📌 rating:1

Ascending order.

1 → 5

==============================================================================

📌 createdAt:-1

Newest reviews first.

==============================================================================

📌 index({
   isVisible:1,
   isApproved:1
})

Fast Query:

Review.find({
   isVisible:true,
   isApproved:true
})

Frontend pe sirf approved reviews.

==============================================================================

📌 index({
   tableNumber:1
})

Fast Query:

Table wise reviews.

Example:

Table 5 Reviews

==============================================================================

📌 virtual("ratingLabel")

Database me save nahi hota.

Runtime pe generate hota hai.

==============================================================================

📌 labels Object

{
   1:"Poor",
   2:"Fair",
   3:"Good",
   4:"Very Good",
   5:"Excellent"
}

Ye ek mapping object hai.

==============================================================================

📌 return labels[this.rating]

Example:

rating = 5

↓

labels[5]

↓

"Excellent"

==============================================================================

Example:

Review:

{
   rating:4
}

API Response:

{
   rating:4,
   ratingLabel:"Very Good"
}

==============================================================================

📌 this.rating

Current review document ki rating.

Example:

{
   rating:5
}

↓

this.rating

↓

5

==============================================================================

📌 toJSON

API response me virtuals include karega.

==============================================================================

📌 toObject

Object conversion me bhi virtuals include karega.

==============================================================================

📌 mongoose.model(
   "Review",
   reviewSchema
)

MongoDB Collection:

reviews

==============================================================================

📌 COMPLETE FLOW

Customer Order Complete
        ↓
Customer Feedback Form Open
        ↓
Rating Select

5 Star

        ↓

Comment

"Food was amazing"

        ↓

Review Save

        ↓

Admin Approval

        ↓

Website/App Me Show

==============================================================================

📌 INTERVIEW QUESTION

Q: orderId unique kyu rakha?

Answer:

Ek order se multiple reviews aane se rokne ke liye.

==============================================================================

📌 INTERVIEW QUESTION

Q: isVisible aur isApproved me difference?

Answer:

isApproved:
Admin ne review approve kiya ya nahi.

----------------------------------

isVisible:
Approved review ko show karna hai ya hide karna hai.

==============================================================================

📌 INTERVIEW QUESTION

Q: Virtual field kya hai?

Answer:

Database me save nahi hoti.

Runtime pe generate hoti hai.

Example:

ratingLabel

==============================================================================

📌 INTERVIEW QUESTION

Q: ratingLabel database me save hota hai?

Answer:

Nahi.

Ye virtual field hai.

Review:

{
   rating:5
}

Runtime pe:

{
   rating:5,
   ratingLabel:"Excellent"
}

generate hota hai.

==============================================================================
*/






































