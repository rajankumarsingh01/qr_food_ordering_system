import { baseApi } from "./baseApi";

interface ChatRequest {
  message: string;
  orderId?: string;
}

interface ChatResponse {
  success: boolean;
  data: { reply: string };
}

export const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation<ChatResponse, ChatRequest>({
      query: (data) => ({
        url: "/chat",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSendMessageMutation } = chatApi;