import { fetchBaseQuery } from "@reduxjs/toolkit/query"

export const createBaseQuery = (path: string) => {
    return fetchBaseQuery({
      baseUrl: `http://localhost:3000/api/${path}`,
      credentials: "include",
    });
}