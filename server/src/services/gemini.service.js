import { GoogleGenerativeAI } from "@google/generative-ai";
import env from "../config/env.js";

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

export const getChatResponse = async ({
  userMessage,
  menuItems,
  categories,
  orderStatus,
  restaurantInfo,
}) => {
  const model = genAI.getGenerativeModel({
    // model: "gemini-1.5-flash",
    model: "gemini-3.5-flash",

  });

  const systemContext = `
You are a helpful restaurant assistant for "${restaurantInfo.name}".
You help customers with menu queries, order tracking, and general questions.
Always be friendly, concise, and helpful.
Reply in the same language the customer uses (Hindi or English).

RESTAURANT INFO:
- Name: ${restaurantInfo.name}
- Address: ${restaurantInfo.address ?? "Our restaurant"}

MENU CATEGORIES:
${categories.map((c) => `- ${c.name}`).join("\n")}

AVAILABLE MENU ITEMS:
${menuItems
  .filter((item) => item.isAvailable)
  .map(
    (item) =>
      `- ${item.name} | ₹${item.price} | ${item.isVeg ? "Veg 🟢" : "Non-Veg 🔴"} | Category: ${item.category?.name ?? "General"}`
  )
  .join("\n")}

${
  orderStatus
    ? `CUSTOMER'S CURRENT ORDER STATUS:
- Order ID: ${orderStatus.orderId}
- Status: ${orderStatus.status}
- Items: ${orderStatus.items?.map((i) => `${i.name} x${i.quantity}`).join(", ")}
- Total: ₹${orderStatus.totalAmount}`
    : "Customer has no active order."
}

RULES:
1. Only answer restaurant/food related questions
2. If asked about unavailable items, say they are currently unavailable
3. For order status, use the data provided above
4. Do not make up prices or items not in the menu
5. Keep responses short and friendly (max 3-4 lines)
6. If off-topic question, politely redirect to food/order help
  `;

  const result = await model.generateContent([
    { text: systemContext },
    { text: `Customer: ${userMessage}` },
  ]);

  return result.response.text();
};