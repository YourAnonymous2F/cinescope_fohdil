import { Link } from "react-router"
import { getImageUrl } from "../utils/image"
import { useWatchlist } from "../context/WatchListCon"




function MovieCard({movie}) {
    const {addToWatchlist, removeFromWatchlist, isInWatchlist} = useWatchlist();

    const inWatchlist = isInWatchlist(movie.id);

    const handleToggle = () => {
        if(inWatchlist) {
            removeFromWatchlist(movie.id);
        } else {
            addToWatchlist(movie);
        }
    }

    return (
        <div className="shadow-[0px_3px_8px_rgba(0,0,0,0.24)]">
            <Link to={`/movie/${movie.id}`}>
                <img src={getImageUrl(movie.poster_path, "w300")} alt={movie.title} className="w-full h-[300px] object-cover"/>
            </Link>

            <div className="px-2 py-2">
                <h2 className="font-semibold">{movie.title}</h2>
                <div className="flex items-center justify-between">
                    <div className="flex gap-3 mt-1" >
                        <p className="text-xs border px-2 py-1 rounded-full">{movie.release_date?.split("-")[0]}</p>
                        <p className="text-xs border px-2 py-1 rounded-full">⭐ {movie.vote_average?.toFixed(1)}</p>
                    </div>
                    <button onClick={handleToggle} className=" text-xs">{inWatchlist ? "❤️" : "🤍" }</button>
                </div>
            </div>
        </div>
    )
}

export default MovieCard