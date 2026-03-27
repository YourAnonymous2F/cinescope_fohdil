import { useState, useEffect } from "react";

const useFetch = (url, options) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchData = async () => {
    try {
        setLoading(true);
        setError(false);

        const res = await fetch(url, options);
        const json = await res.json();

        setData(json);
    } catch (err) {
        setError(true);
    } finally {
        setLoading(false);
    }
    };

    useEffect(() => {
        fetchData();
    }, [url]);

    return { data, loading, error, refetch: fetchData };
}

export default useFetch;