import { useState, useEffect } from "react";
import { BASE_URL, options } from "../api/api";
import { endpoints } from "../api/endpoints";

export default function useGenres() {
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchGenres = async () => {
            setLoading(true);
            setError(false);
            try {
                const res = await fetch(`${BASE_URL}${endpoints.genres}`, options);
                const data = await res.json();
                setGenres(data.genres || []);
            } catch (err) {
                console.log(err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchGenres();
    }, []);

    return { genres, loading, error }
}