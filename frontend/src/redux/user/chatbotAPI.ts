import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./baseAPI";

// Define types
interface ChatRequest {
  message: string;
}

interface ChatResponse {
  response: string;
}


interface AnalyzeImageResponse {
  response: string;
}

export const chatbotAPI = createApi({
  reducerPath: "chatbotApi",
  baseQuery: createBaseQuery("chatbot"),
  endpoints: (builder) => ({
    // --- Text Chat Endpoint ---
    chat: builder.mutation<ChatResponse, ChatRequest>({
      query: (body) => ({
        url: "chat",
        method: "POST",
        body,
      }),
    }),

    // --- Image + Prompt Upload ---
    analyzeImage: builder.mutation<AnalyzeImageResponse, FormData>({
      query: (formData) => {
        return {
          url: "analyzeImage",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

export const { useChatMutation, useAnalyzeImageMutation } = chatbotAPI;
