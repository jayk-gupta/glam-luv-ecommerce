import { createApi } from "@reduxjs/toolkit/query";
import { createBaseQuery } from "./baseAPI";

export const chatbotAPI = createApi({
    reducerPath: "chatbotApi",
    baseQuery: createBaseQuery("chatbot"),
    endpoints: (builder) => ({
        chat: builder.mutation<>({
            query: () => ({
                url: "chat",
                method: "POST",
                body:
        })
        }),
        analyzeImage: builder.mutation({
            query: (body) => ({
                url: "analyzeImage",
                method: "POST",
                body
            })
        })
    })
})