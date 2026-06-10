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
  // ✅ gemini-1.5-flash — correct model name
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const systemContext = `
You are a helpful restaurant assistant for "${restaurantInfo.name}".
You help customers with menu queries, order tracking, and general questions.
Always be friendly, concise, and helpful.
Reply in the same language the customer uses (Hindi or English).

RESTAURANT INFO:
- Name: ${restaurantInfo.name}

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
    ? `CUSTOMER CURRENT ORDER:
- Order ID: ${orderStatus.orderId}
- Status: ${orderStatus.status}
- Items: ${orderStatus.items?.map((i) => `${i.name} x${i.quantity}`).join(", ")}
- Total: ₹${orderStatus.totalAmount}`
    : "Customer has no active order."
}

RULES:
1. Only answer restaurant/food related questions
2. Keep responses short — max 3-4 lines
3. Do not make up items or prices
4. If off-topic, politely redirect to food/order help
  `;

  // ✅ Retry logic — 503 pe 2 baar try karo
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const result = await model.generateContent([
        { text: systemContext },
        { text: `Customer: ${userMessage}` },
      ]);
      return result.response.text();
    } catch (error) {
      lastError = error;
      const is503 = error?.message?.includes("503");
      if (is503 && attempt < 3) {
        // Wait karke retry karo
        await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
        continue;
      }
      break;
    }
  }

  throw lastError;
};