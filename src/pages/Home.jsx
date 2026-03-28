    import {BASE_URL, options} from "../api/api"
    import { endpoints } from "../api/endpoints"
    import MovieCard from "../components/MovieCard"
    import Skeleton from "../components/Skeleton"
    import Hero from "../components/Hero"
    import useFetch from "../functions/fetchFunction"
    import useGenres from "../functions/useGenres"
    import { useEffect, useState } from "react"
    import GenreFilter from "../components/GenreFilter"
    import { useSearch } from "../context/SearchContext"

    function Home() {
        const { data, loading, error, refetch } = useFetch(
            `${BASE_URL}${endpoints.trending}`, options
        );

        const {genres} = useGenres();

        const {searchTerm} = useSearch();

        const isSearching = searchTerm.trim().length > 0;

        const [selectedGenres, setSelectedGenres] = useState(null);
        const [searchRes, setSearchRes] = useState([]);
        const [searchLoading, setSearchLoading] = useState(false);

        const movies = data?.results || [];

        useEffect(() => {
            if(!searchTerm.trim) {
                setSearchRes([]);
                return;
            }

            const getSearch = async () => {
                setSearchLoading(true);
                try {
                    const res = await fetch(`${BASE_URL}${endpoints.search}?query=${encodeURIComponent(searchTerm)}&page=1`,options);
                    const data = await res.json()
                    setSearchRes(data.results || []);
                } catch (err) {
                    console.log(err);
                } finally {
                    setSearchLoading(false)
                }
            }

            getSearch();
        }, [searchTerm])

        const displayedMovies = isSearching ? searchRes : selectedGenres ? movies.filter((movie) => movie.genre_ids.includes(selectedGenres)) : movies;

        // const filteredMovies = selectedGenres ? movies.filter((m) => m.genre_ids.includes(selectedGenres)) : movies;

        return (
            <div className="p-4">
                {!loading && !error && !isSearching && movies.length > 0 && (
                    <Hero movie={movies[0]}/>
                )}


                {!isSearching && (
                    <GenreFilter genres={genres} selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} />
                )}
                
            

                {error && (
                    <div className="text-center mt-10">
                        <p className="mb-3">Failed to load movies</p>
                        <button onClick={refetch} className="px-4 py-2 rounded border bg-gray-800 text-white font-bold">Retry</button>
                    </div>
                )}

                <div className="grid gap-5 mt-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    {/* moviecard loading skeleton */}
                    {!isSearching && loading &&
                        Array.from({length: 8}).map((_, i) => (
                            <Skeleton key={i}/>
                        )) 
                    }

                    {/* Search skeleton */}
                    {isSearching && searchLoading &&
                        Array.from({length: 8}).map((_, i) => (
                            <Skeleton key={i}/>
                        )) 
                    }                    

                    {!loading && !error && !searchLoading && displayedMovies.length > 0 &&
                        displayedMovies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))
                    } 

                    {!loading && !searchLoading && isSearching && displayedMovies.length === 0 && (
                        <p>No movies found for "{searchTerm}"</p>
                    )}

                    {!loading && !isSearching && displayedMovies.length === 0 && (
                        <p>No movies found in this genre</p>
                    )}

                    
                </div>
            </div>
        )
    }

    export default Home