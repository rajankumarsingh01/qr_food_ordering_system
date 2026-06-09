import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    menuItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuItem",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    image: {
      type: String,
      default: null,
    },

    specialNote: {
      type: String,
      default: "",
      maxlength: 300,
    },
    estimatedReadyTime: {
      type: Date,
      default: null,
    },
  },
  {
    _id: false,
  }
);

const orderSchema = new mongoose.Schema(
  {
    tableId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Table",
      required: true,
      index: true,
    },

    tableNumber: {
      type: Number,
      required: true,
      
    },

    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: function (items) {
          return items.length > 0;
        },
        message:
          "Order must contain at least one item",
      },
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: [
        "received",
        "preparing",
        "ready",
        "served",
        "cancelled",
      ],
      default: "received",
      index: true,
    },

    paymentStatus: {
      type: String,
      enum: [
        "pending",
        "paid",
        "failed",
        "refunded",
        "cancelled",
      ],
      default: "pending",
    
    },

    paymentMethod: {
      type: String,
      enum: [
        "online",
        "cash",
      ],
      default: "cash",
    },

    customerSocketId: {
      type: String,
      default: null,
    },

    notes: {
      type: String,
      default: "",
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.index({
  status: 1,
  createdAt: -1,
});

orderSchema.index({
  paymentStatus: 1,
});

orderSchema.index({
  tableNumber: 1,
});

orderSchema.index({
  createdAt: -1,
});

orderSchema.virtual("totalItems").get(
  function () {
    return this.items.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );
  }
);

orderSchema.virtual("orderNumber").get(
  function () {
    return `ORD-${this._id
      .toString()
      .slice(-6)
      .toUpperCase()}`;
  }
);

orderSchema.set("toJSON", {
  virtuals: true,
});

orderSchema.set("toObject", {
  virtuals: true,
});

const Order = mongoose.model(
  "Order",
  orderSchema
);

export default Order;































/*
==============================================================================
ORDER MODEL SUMMARY

1. orderItemSchema order ke individual items ko store karta hai.

2. name aur price snapshot ke roop me save hote hain taaki
future me menu change hone par purane orders affect na ho.

3. _id:false items ke andar unnecessary Mongo ids banne se rokta hai.

4. tableId Table collection se relation create karta hai.

5. items validator ensure karta hai ki order empty na ho.

6. status order lifecycle manage karta hai:

received
preparing
ready
served
cancelled

7. paymentStatus payment tracking ke liye hai:

pending
paid
failed

8. customerSocketId realtime notifications ke liye use hota hai.

9. totalItems virtual order ki total quantity calculate karta hai.

10. orderNumber virtual customer friendly order id generate karta hai.

11. Indexes admin dashboard queries ko fast banate hain.

FLOW:

Customer
   ↓
Place Order
   ↓
received
   ↓
preparing
   ↓
ready
   ↓
served

==============================================================================
*/