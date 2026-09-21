import { useState } from "react";
import type { Movie } from "./types.ts";
import { SAMPLE_MOVIES } from "./data/sampleMovies.ts";
import SearchBar from "./components/SearchBar.tsx";
import MovieList from "./components/MovieList.tsx";

function App() {
  const [movies] = useState<Movie[]>(SAMPLE_MOVIES);
  const [query, setQuery] = useState("");
  const [minRating, setMinRating] = useState(0);

  const filteredMovies = movies.filter((m) =>
    m.title.toLowerCase().includes(query.toLowerCase()),
  );

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

export default App;
