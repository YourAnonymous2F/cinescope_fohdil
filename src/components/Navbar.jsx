import { Link } from "react-router"
import { useSearch } from "../context/SearchContext"
import { useEffect, useState } from "react";
import { useWatchlist } from "../context/WatchListCon";

function Navbar() {
    const {watchlist} = useWatchlist();

    const {setSearchTerm} = useSearch();
    const [search, setSearch] = useState("");

    useEffect(() => {
        const handler = setTimeout(() => {
            setSearchTerm(search);
        }, 400)
        return () => clearTimeout(handler);
    }, [search, setSearchTerm]);

  return (
    <nav className="sticky top-0 flex items-center justify-between px-4 py-3 text-white bg-gray-800 ">
        <Link to="/" className="text-[20px] font-bold">
            Cine<span className="text-yellow-500">Scope</span>
        </Link>

        <input type="text" placeholder="Search movies..." value={search} onChange={(e) => setSearch(e.target.value)} className="px-2 py-1 rounded-lg bg-black text-white outline-none border border-gray-500"/>

        <Link to="/watchlist" className="flex gap-1 border px-1 relative rounded">
            <p className="text-[14px] text-yellow-500 px-2">Watchlist</p>
            <p className="absolute -top-2 -right-[9px] bg-red-700 rounded-full px-[2px] text-[10px]">{watchlist.length}</p>
        </Link>

    </nav>
  )
}

export default Navbar