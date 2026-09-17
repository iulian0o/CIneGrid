import { useState } from "react"
import type { Movie } from "../types.ts"
import { getPosterUrl } from './../data/sampleMovies';

interface MovieCardProps {
  movie: Movie;
  onClick?: () => void;
}

export default function MovieCard({ movie, onClick }: MovieCardProps) {
  const [isFavourite, setIsFavourite] = useState(false);
  
  const handleFavouriteClick = (event: React.MouseEvent) => {
    event.stopPropagation();

    if (isFavourite) {
      setIsFavourite(false);
    } else {
      setIsFavourite(true);
    }
  }

  let favButtonText = "Add to favourites";
  
  if (isFavourite) {
    favButtonText = "Remove from favourites";
  }

  let rating = "N/A";
  if (movie.vote_average !== undefined) {
    rating = movie.vote_average.toFixed(1);
  }

  const posterUrl = getPosterUrl(movie.poster_path);

  return (
    <article className="movie-card">
      <div className="poster-wrapper">
        <img src={posterUrl} alt={movie.title} className="poster-img" />

        <button className="favorite-btn" onClick={handleFavouriteClick}>
          {favButtonText}
        </button>
      </div>

      <div className="movie-card-info">
        <h2 className="movie-card title">{movie.title}</h2>
        <span className="rating-badge">{rating}</span>
      </div>
    </article>
  )
}