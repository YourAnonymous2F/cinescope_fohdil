import { Routes, Route } from "react-router"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import WatchList from "./pages/WatchList"
import { SearchProvider } from "./context/SearchContext"
import MovieDetails from "./pages/MovieDetails"

function App() {
  return (
    <SearchProvider>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/watchlist" element={<WatchList />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </SearchProvider>
  )
}

export default App
