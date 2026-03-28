import { useNavigate, useParams } from "react-router"
import { useWatchlist } from "../context/WatchListCon";
import { useEffect, useState } from "react";
import { BASE_URL, options } from "../api/api";
import { endpoints } from "../api/endpoints";
import Skeleton from "../components/Skeleton";
import { getImageUrl } from "../utils/image";
import MovieCard from "../components/MovieCard";


function MovieDetails() {
    const {id} = useParams();

    const navigate = useNavigate();
    const {addToWatchlist, removeFromWatchlist, isInWatchlist} = useWatchlist();

    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [similar, setSimilar] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);   

    useEffect(() => {
        const fetchMovieDetails = async () => {
            setLoading(true);
            setError(false);
            try {
                const resMovie = await fetch (`${BASE_URL}${endpoints.movieDetails(id)}`, options);
                const dataMovie = await resMovie.json();
                setMovie(dataMovie);

                const resCredits = await fetch (`${BASE_URL}${endpoints.credits(id)}`, options)
                const dataCredits = await resCredits.json();
                setCast(dataCredits.cast || []);

                const resSimilar = await fetch (`${BASE_URL}${endpoints.similar(id)}`, options)
                const dataSimilar = await resSimilar.json();
                setSimilar(dataSimilar.results || []);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }

        fetchMovieDetails();
    }, [id])

    if (loading) return <Skeleton />

    if (error) return (
        <div>
            <p>Failed to load movie details</p>
            <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
    )

    if (!movie) return <p>Loading Movie...</p>

    const inWatchlist = isInWatchlist(movie.id);

    const handleToggleWatchlist = () => {
        if (inWatchlist) removeFromWatchlist(movie.id);
        else addToWatchlist(movie);
    }

    return (
        <div>
            <div className="w-full h-[400px] bg-cover bg-center" style={{ backgroundImage: `url(${getImageUrl(movie.backdrop_path, "w780")})`}}>
                <button onClick={() => navigate(-1)} className="bg-blue-500 text-white text-[14px] font-bold px-1 m-2 rounded-full">←</button>
            </div>

            <div className="py-3">
                <h1 className="font-bold text-2xl"> {movie.title}</h1>
                <p className="font-semibold">Tagline: {movie.tagline}</p>
                <p className="font-normal text-xs mt-2 mb-2">{movie.overview}</p>
                <p className="font-semibold">Genres: {movie.genres?.map((g) => g.name).join(", ")}</p>
                <div className="flex items-center gap-3 py-2">
                    <p className="border px-2 py-1 text-xs rounded-full bg-black text-white">{movie.release_date?.split("-")[0]}</p>
                    <p className="border px-2 py-1 text-xs rounded-full bg-black text-white">{movie.runtime} min</p>
                    <p className="border px-2 py-1 text-xs rounded-full bg-black text-white">⭐ {movie.vote_average?.toFixed(1)} ({movie.vote_count} votes)</p>
                    <button onClick={handleToggleWatchlist}>{inWatchlist ? "❤️" : "🤍"}</button>
                </div>
            </div>

            <div className="mt-6 px-2">
                <h2 className="font-bold mb-4">Cast</h2>
                <div className="flex overflow-x-auto gap-4 pb-2">
                    {cast.map((c) => (
                        <div key={c.cast_id} className="flex-shrink-0 w-[120px] text-center border p-2 shadow-[0px_3px_8px_rgba(0,0,0,0.24)]">
                            <img src={getImageUrl(c.profile_path, "w300")} alt={c.name} className="w-[100px] h-[100px] object-cover rounded-full mx-auto border" />
                            <p className="text-xs font-medium mt-2">{c.name}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6 px-2">
                <h2 className="mb-2 font-bold">Similar Movies</h2>
                <div className="flex overflow-x-auto gap-4 pb-2">
                    {similar.map((s) => (
                        <div key={s.id} className="min-w-[160px] flex-shrink-0">
                            <MovieCard key={s.id} movie={s} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MovieDetails