import { createContext, useContext, useEffect, useState } from "react";

const WatchlistCon = createContext();

export function WatchlistProvider({ children }) {
    const [watchlist, setWatchlist] = useState(() => {
        const saved = localStorage.getItem("watchlist");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
    }, [watchlist]);

    const addToWatchlist = (movie) => {
        setWatchlist((prev) => {
        if (prev.find((m) => m.id === movie.id)) return prev;
        return [...prev, movie];
        });
    };

    const removeFromWatchlist = (id) => {
        setWatchlist((prev) => prev.filter((m) => m.id !== id));
    };

    const isInWatchlist = (id) => {
        return watchlist.some((m) => m.id === id);
    };

    return (
        <WatchlistCon.Provider
        value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}
        >
        {children}
        </WatchlistCon.Provider>
    );
}

export const useWatchlist = () => useContext(WatchlistCon);