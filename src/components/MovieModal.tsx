import type { Movie } from '../types.ts';

type MovieModalProps = {
  movie: Movie;
  onClose: () => void;
};

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          ×
        </button>
        <div
          className="modal-backdrop-hero"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
          }}
        ></div>
        <div className="modal-body">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            className="modal-poster"
          />
          <div>
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
}