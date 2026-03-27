import { Link } from "react-router"
import {getImageUrl} from "../utils/image"

function Hero({movie}) {
    return (
        <div className="relative h-[60vh] rounded-lg overflow-hidden">
            <img src={getImageUrl(movie.backdrop_path, "w1280")} alt={movie.title} className="w-full h-full object-cover"/>

            <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-6">

                <h1 className="text-3xl font-bold text-white">
                {movie.title}
                </h1>

                <p className="text-gray-300 mt-2">
                ⭐ {movie.vote_average.toFixed(1)}
                </p>

                <Link to={`/movie/${movie.id}`} className="mt-4 bg-yellow-400 text-black px-4 py-2 w-fit rounded"
                > View Details
                </Link>
            </div>
        </div>
    )
}

export default Hero