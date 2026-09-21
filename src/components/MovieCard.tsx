import { useState } from "react";
import type { Movie } from "../types.ts";
import { getPosterUrl, getPlaceholderPoster } from "../data/sampleMovies.ts";
import { getGenreNames } from "../data/genres.ts";

interface MovieCardProps {
  movie: Movie;
  onClick?: (movie: Movie) => void;
}

export default function MovieCard({ movie, onClick }: MovieCardProps) {
  const [isFav, setIsFav] = useState(false);

  const posterSrc = getPosterUrl(movie.poster_path);
  const year = movie.release_date ? movie.release_date.substring(0, 4) : "TBA";
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";
  const genres = getGenreNames(movie.genre_ids).slice(0, 2);

  return (
    <article
      className="movie-card"
      tabIndex={0}
      onClick={() => onClick?.(movie)}
    >
      <div className="poster-wrapper">
        <img
          src={posterSrc}
          alt={movie.title}
          className="poster-img"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = getPlaceholderPoster(movie.title);
          }}
        />
        <div className="poster-overlay">
          <div className="card-top-badges">
            <span className="rating-badge">
              <svg viewBox="0 0 24 24">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              {rating}
            </span>
            <button
              className={`favorite-btn ${isFav ? "is-favorite" : ""}`}
              aria-label={
                isFav ? "Remove from favourites" : "Add to favourites"
              }
              onClick={(e) => {
                e.stopPropagation();
                setIsFav((prev) => !prev);
              }}
            ></button>
          </div>
          <span className="quick-view-hint">View Details</span>
        </div>
      </div>
      <div className="movie-card-info">
        <h2 className="movie-card-title">{movie.title}</h2>
        <div className="movie-card-meta">
          <span>{year}</span>
          <span>
            {movie.vote_count
              ? `${movie.vote_count.toLocaleString()} votes`
              : "Upcoming"}
          </span>
        </div>
        <div className="movie-genres-tags">
          {genres.map((g) => (
            <span className="genre-tag" key={g}>
              {g}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
