import { BASE_URL, options } from "./api";

export const fetchData = async (endpoint) => {
    try {
        const res = await fetch(`${BASE_URL}${endpoint}`, options);

        if (!res.ok) {
        throw new Error("Request failed");
        }

        const data = await res.json();
        return data;

    } catch (error) {
        console.error("API ERROR:", error.message);

        return {
        results: [],
        error: true,
        message: error.message,
        };

    } finally {
        console.log("API call completed:", endpoint);
    }
}  