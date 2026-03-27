
function GenreFilter({ genres, selectedGenres, setSelectedGenres }) {
  return (
    <div className="flex flex-wrap gap-4 mb-3 mt-6">
        {genres.map((g) => (
            <button key={g.id} onClick={() => setSelectedGenres(selectedGenres === g.id ? null : g.id)} className={`px-3 py-1 rounded-full text-sm font-medium transition ${selectedGenres === g.id ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800" }`}>
                {g.name}
            </button>
        ))}
    </div>
  )
}

export default GenreFilter