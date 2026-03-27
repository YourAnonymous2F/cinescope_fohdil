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
        <div>
            <Link to={`/movie/${movie.id}`}>
                <img src={getImageUrl(movie.poster_path, "w300")} alt={movie.title} className="w-full h-[300px] object-cover"/>
            </Link>

            <div>
                <h2>{movie.title}</h2>
                <p>{movie.release_date?.split("-")[0]}</p>
                <p>⭐ {movie.vote_average?.toFixed(1)}</p>
                <button onClick={handleToggle}>{inWatchlist ? "❤️" : "🤍" }</button>
            </div>
        </div>
    )
}

export default MovieCard