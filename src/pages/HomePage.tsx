import { useMovies } from "../hooks/useMovies.ts";
import MovieList from '../components/MovieList';

const apiUrl = `${import.meta.env.VITE_TMDB_BASE_URL}/movie/popular?language=en-US&page=1`

export default function HomePage({ searchQuery }: { searchQuery: string }) {
  const { movies, loading, error } = useMovies();

    const filteredMovies = movies.filter((m) =>
    m.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <main className="main-container">
      {loading && <p>Loading...</p>}
      {error && <p>Somethong went wrong: {error}</p>}
      {!loading && !error && <MovieList movies={filteredMovies} />}
    </main>
  )
}