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
    <nav className="static flex items-center justify-between px-4 py-3 text-white bg-gray-800 ">
        <Link to="/" className="text-[20px] font-bold">
            Cine<span className="text-yellow-500">Scope</span>
        </Link>

        <input type="text" placeholder="Search movies..." value={search} onChange={(e) => setSearch(e.target.value)} className="px-2 py-1 rounded-lg bg-black text-white outline-none border border-gray-500"/>

        <Link to="/watchlist" className="flex gap-1">
            <p>Watchlist: </p>
            <p>{watchlist.length}</p>
        </Link>

    </nav>
  )
}

export default Navbar