import { fetchBaseQuery } from "@reduxjs/toolkit/query"

export const createBaseQuery = (path: string) => {
    return fetchBaseQuery({
      baseUrl: `${import.meta.env.VITE_API_BASE_URL}${path}`,
      credentials: "include",
    });
}