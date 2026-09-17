import { useState } from "react";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import { SAMPLE_MOVIES } from "./data/sampleMovies";

export default function App() {
  const [movies] = useState(SAMPLE_MOVIES);
  const [query, setQuery] = useState("");
  const [minRating, setMinRating] = useState(0);

  const filteredMovies = movies.filter((movie) => {
    const matchesQuery = movie.title.toLowerCase().includes(query.toLowerCase());
    const matchesRating = (movie.vote_average ?? 0) >= minRating;
    return matchesQuery && matchesRating;
  });

  return (
    <div className="app-layout">
      <header className="site-header">
        <h1>CineGrid</h1>
        <SearchBar query={query} onChange={setQuery} />
      </header>
      <main className="main-container">
        <MovieList movies={filteredMovies} />
      </main>
    </div>
  );
}