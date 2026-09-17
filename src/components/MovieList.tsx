import MovieCard from "./MovieCard";
import type { Movie } from "../types";

interface MovieListProps {
  movies: Movie[];
  onMovieClick?: (movie: Movie) => void;
}

export default function MovieList({ movies, onMovieClick }: MovieListProps) {
  if (movies.length === 0) {
    return <p>No movies found.</p>;
  }

  return (
    <div className="movies-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={onMovieClick ? () => onMovieClick(movie) : undefined}
        />
      ))}
    </div>
  );
}