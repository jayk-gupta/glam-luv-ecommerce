
import { createApi } from "@reduxjs/toolkit/query";
import { createBaseQuery } from "../user/baseAPI";

export const cartAPI = createApi({
    reducerPath: "cartApi",
    baseQuery: createBaseQuery("cart"),
    endpoints: (builder) => ({

    })
}
)