import MovieCard from './MovieCard';
import type { Movie } from '../types.ts';

interface MovieListProps {
  movies: Movie[];
  onClick?: (movie: Movie) => void;
}

export default function MovieList({ movies, onClick }: MovieListProps) {
  if (movies.length === 0) {
    return <p>No movies found.</p>
  }
  
  return (
    <div className="movies-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onClick={onClick} />
      ))}
    </div>
  );
}