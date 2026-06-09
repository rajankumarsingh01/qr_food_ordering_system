import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      // ✅ index: true hata diya - neeche schema.index() hai
    },

    razorpayOrderId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    razorpayPaymentId: {
      type: String,
      default: null,
      // ✅ index: true hata diya - neeche schema.index() hai
      trim: true,
    },

    razorpaySignature: {
      type: String,
      default: null,
      select: false,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    currency: {
      type: String,
      default: "INR",
      uppercase: true,
    },

    status: {
      type: String,
      enum: ["created", "paid", "failed", "refunded"],
      default: "created",
    },

    paymentMethod: {
      type: String,
      enum: ["online", "cash"],
      default: "online",
    },

    paidAt: {
      type: Date,
      default: null,
    },

    failureReason: {
      type: String,
      default: "",
    },

    // ✅ refundId ADD kiya
    refundId: {
      type: String,
      default: null,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

paymentSchema.index({ status: 1, createdAt: -1 });
paymentSchema.index({ orderId: 1 });
paymentSchema.index({ razorpayPaymentId: 1 });

paymentSchema.virtual("formattedAmount").get(function () {
  return `₹${this.amount}`;
});

paymentSchema.virtual("isSuccessful").get(function () {
  return this.status === "paid";
});

paymentSchema.set("toJSON", { virtuals: true });
paymentSchema.set("toObject", { virtuals: true });

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;

















/*
==============================================================================
📌 PAYMENT MODEL

Payment related sari information store karta hai.

Example:

{
  orderId:"abc123",
  razorpayOrderId:"order_xyz",
  razorpayPaymentId:"pay_123",
  amount:499,
  status:"paid"
}

==============================================================================

📌 orderId

Order collection ke document ko reference karta hai.

Example:

Order:

{
   _id:"123",
   totalAmount:499
}

Payment:

{
   orderId:"123"
}

==============================================================================

📌 ref:"Order"

Mongoose ko batata hai ki ye id Order collection ki hai.

Later:

Payment.find()
.populate("orderId")

==============================================================================

📌 razorpayOrderId

Razorpay dwara generate kiya gaya order id.

Example:

order_QwErTy123

Ye Razorpay aur hamare system ke beech connection banata hai.

required:true

Mandatory hai.

unique:true

Same Razorpay Order ID do baar nahi ho sakti.

index:true

Fast searching.

trim:true

Extra spaces remove.

==============================================================================

📌 razorpayPaymentId

Customer payment complete karega tab Razorpay payment id dega.

Example:

pay_AbCdEf123

Initially:

null

Payment hone ke baad update hota hai.

==============================================================================

📌 razorpaySignature

Razorpay verification signature.

Example:

a8s7d6a8sd7a6sd...

Iska use payment verify karne me hota hai.

==============================================================================

📌 select:false

IMPORTANT

Normal queries me signature return nahi hoga.

Security reason.

Example:

Payment.find()

Signature response me nahi aayega.

==============================================================================

📌 amount

Payment amount.

Example:

499

required:true

Mandatory.

min:0

Negative amount allow nahi.

==============================================================================

📌 currency

Payment currency.

Default:

INR

uppercase:true

Automatically uppercase.

Example:

"inr"

↓

"INR"

==============================================================================

📌 status

Payment ki current state.

Allowed Values:

created
paid
failed
refunded

Enum use hua hai.

==============================================================================

📌 created

Payment create hua hai.

Customer ne abhi payment complete nahi ki.

==============================================================================

📌 paid

Payment successful.

==============================================================================

📌 failed

Payment fail ho gaya.

Example:

UPI timeout
Bank issue
Insufficient balance

==============================================================================

📌 refunded

Payment customer ko wapas kar diya gaya.

==============================================================================

📌 paymentMethod

Payment kis method se hua.

online

cash

Default:

online

==============================================================================

📌 paidAt

Payment kab successful hua.

Example:

2026-06-07T12:30:00

Initially:

null

==============================================================================

📌 failureReason

Agar payment fail ho jaye.

Example:

"UPI timeout"

"Bank server unavailable"

Default:

""

==============================================================================

📌 timestamps:true

Automatically add:

createdAt
updatedAt

==============================================================================

📌 index({
 status:1,
 createdAt:-1
})

Fast query:

Latest paid payments

Latest failed payments

==============================================================================

📌 index({
 orderId:1
})

Fast query:

Order ka payment dhundhne ke liye.

Example:

Payment.findOne({
  orderId:id
})

==============================================================================

📌 index({
 razorpayPaymentId:1
})

Fast query:

Razorpay payment id se search.

==============================================================================

📌 virtual("formattedAmount")

Database me save nahi hota.

Runtime pe generate hota hai.

==============================================================================

📌 return `₹${this.amount}`

Example:

amount = 499

↓

formattedAmount

"₹499"

==============================================================================

📌 virtual("isSuccessful")

Database me save nahi hota.

==============================================================================

📌 return this.status === "paid"

Check karta hai payment successful hai ya nahi.

==============================================================================

Example:

status:"paid"

↓

true

------------------------------------------------------------------------------

status:"failed"

↓

false

==============================================================================

📌 toJSON

API response me virtual fields include karega.

==============================================================================

📌 toObject

Object conversion me virtual fields include karega.

==============================================================================

📌 mongoose.model(
   "Payment",
   paymentSchema
)

MongoDB collection:

payments

==============================================================================

📌 COMPLETE PAYMENT FLOW

Customer Order Place
        ↓
Order Created
        ↓
Razorpay Order Created
        ↓
Payment Document Created

status = created

        ↓

Customer Pays

        ↓

Razorpay Returns

razorpayPaymentId
razorpaySignature

        ↓

Verify Signature

        ↓

Success

status = paid
paidAt = current date

        ↓

Order paymentStatus = paid

==============================================================================

📌 INTERVIEW QUESTION

Q: razorpayOrderId aur razorpayPaymentId me difference?

Answer:

razorpayOrderId:
Payment start hone par generate hota hai.

Example:
order_xxxxx

----------------------------------

razorpayPaymentId:
Payment successful hone ke baad generate hota hai.

Example:
pay_xxxxx

==============================================================================

📌 INTERVIEW QUESTION

Q: razorpaySignature kyu store karte hain?

Answer:

Payment genuinely Razorpay se hi aaya hai ya nahi
verify karne ke liye.

==============================================================================

📌 INTERVIEW QUESTION

Q: select:false kyu lagaya?

Answer:

Sensitive data ko API response me accidentally
bhejne se bachane ke liye.

==============================================================================

📌 INTERVIEW QUESTION

Q: Virtual field kya hai?

Answer:

Database me save nahi hoti.

Runtime pe generate hoti hai.

Example:

formattedAmount
isSuccessful

==============================================================================
*/