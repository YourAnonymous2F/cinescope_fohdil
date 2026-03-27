import MovieCard from "../components/MovieCard";
import { useWatchlist } from "../context/WatchListCon"


function WatchList() {
    const {watchlist} = useWatchlist();

    console.log(watchlist)

    return (
        <div>
            <h1 className="text-center m-2 font-bold">Your Watchlist</h1>

            {watchlist.length === 0 ? (<p>No movies added yet</p>) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-2">
                    {watchlist.map((m) => (
                        <MovieCard key={m.id} movie={m} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default WatchList