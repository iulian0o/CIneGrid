import { useEffect, useState } from "react";
import type { Movie } from "../types";
import { getPosterUrl, getPlaceholderPoster } from "../data/sampleMovies";
import { getGenreNames } from "../data/genres";
import { useAppContext } from "../context/AppContext";

type MovieModalProps = {
  movie: Movie;
  onClose: () => void;
};

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  const { toggleFavorite, isFavorite } = useAppContext();
  const isFav = isFavorite(movie.id);

  const [active, setActive] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setActive(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const posterSrc = getPosterUrl(movie.poster_path);
  const genres = getGenreNames(movie.genre_ids);
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";
  const releaseFormatted = movie.release_date
    ? new Date(movie.release_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown Release Date";
  const trailerQuery = encodeURIComponent(
    `${movie.title} trailer ${movie.release_date?.substring(0, 4) ?? ""}`,
  );

  return (
    <div
      className={`modal-overlay ${active ? "active" : ""}`}
      onClick={onClose}
    >
      <div
        className="modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-movie-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close-btn"
          aria-label="Close"
          onClick={onClose}
        >
          &times;
        </button>

        <div
          className="modal-backdrop-hero"
          style={{
            backgroundImage: movie.backdrop_path
              ? `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`
              : undefined,
          }}
        ></div>

        <div className="modal-body">
          <img
            src={posterSrc}
            alt={movie.title}
            className="modal-poster"
            onError={(e) => {
              e.currentTarget.src = getPlaceholderPoster(movie.title);
            }}
          />

          <div className="modal-content-details">
            <h2 className="modal-title" id="modal-movie-title">
              {movie.title}
            </h2>

            {movie.original_title && movie.original_title !== movie.title && (
              <div className="modal-original-title">
                Original Title: {movie.original_title}
              </div>
            )}

            <div className="modal-meta-row">
              <span
                className="rating-badge"
                style={{ fontSize: "0.9rem", padding: "6px 12px" }}
              >
                <svg viewBox="0 0 24 24">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                {rating} / 10
              </span>
              {movie.vote_count ? (
                <span className="modal-meta-item">
                  {movie.vote_count.toLocaleString()} Ratings
                </span>
              ) : null}
              <span className="modal-meta-item">&#128197; {releaseFormatted}</span>
              {movie.popularity ? (
                <span className="modal-meta-item">
                  &#128293; Popularity: {Math.round(movie.popularity)}
                </span>
              ) : null}
            </div>

            <div className="movie-genres-tags" style={{ gap: "8px" }}>
              {genres.map((g) => (
                <span
                  className="genre-tag"
                  key={g}
                  style={{
                    fontSize: "0.78rem",
                    padding: "4px 10px",
                    borderRadius: "6px",
                  }}
                >
                  {g}
                </span>
              ))}
            </div>

            <div className="modal-overview">
              <h4 className="modal-overview-heading">Overview</h4>
              <p>{movie.overview || "No plot synopsis available."}</p>
            </div>

            <div className="modal-footer-actions">
              <button
                className="btn-primary"
                onClick={() => toggleFavorite(movie)}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill={isFav ? "#ffffff" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                <span>{isFav ? "In Watchlist" : "Add to Watchlist"}</span>
              </button>

              <a
                href={`https://www.youtube.com/results?search_query=${trailerQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                Watch Trailer
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}