import { useNavigate } from "react-router";
import MovieCard from "../components/MovieCard";
import { useWatchlist } from "../context/WatchListCon"


function WatchList() {
    const {watchlist} = useWatchlist();

    const navigate = useNavigate();

    console.log(watchlist)

    return (
        <div>
            <h1 className="text-center m-2 mb-4 font-bold">Your Watchlist</h1>

            <button className="absolute top-14 left-2 font-bold text-xl" onClick={() => navigate("/")}>←</button>

            {watchlist.length === 0 ? (<div>
                <p className="flex text-center justify-center items-center h-[50vh]">No movies added yet, click on the heart icon in each movie card to add or remove movies from watchlist</p>
                </div>) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
                    {watchlist.map((m) => (
                        <MovieCard key={m.id} movie={m} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default WatchList