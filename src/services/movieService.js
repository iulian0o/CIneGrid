import { SAMPLE_MOVIES } from "../data/sampleMovies.ts";
import { getFavorites } from "../utils/storage.js";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const movieService = {
  async fetchMovies({
    search = "",
    genre = "all",
    sort = "popularity",
    onlyFavorites = false,
    page = 1,
    signal,
  } = {}) {
    if (API_KEY) {
      const endpoint = search.trim()
        ? `${BASE_URL}/search/movie?query=${encodeURIComponent(search.trim())}&page=${page}`
        : `${BASE_URL}/movie/popular?page=${page}`;

      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          accept: "application/json",
        },
        signal,
      });

      if (!response.ok) {
        throw new Error(`TMDB request failed: ${response.status}`);
      }

      const data = await response.json();

      return {
        results: data.results ?? [],
        total_pages: data.total_pages ?? 1,
        total_results: data.total_results ?? (data.results?.length || 0),
        isLiveApi: true,
      };
    }

    let pool = onlyFavorites ? getFavorites() : [...SAMPLE_MOVIES];

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      pool = pool.filter(
        (m) =>
          (m.title && m.title.toLowerCase().includes(q)) ||
          (m.overview && m.overview.toLowerCase().includes(q)) ||
          (m.original_title && m.original_title.toLowerCase().includes(q)),
      );
    }

    if (genre !== "all") {
      const gId = Number(genre);
      pool = pool.filter(
        (m) => Array.isArray(m.genre_ids) && m.genre_ids.includes(gId),
      );
    }

    pool = this.sortMovies(pool, sort);

    const pageSize = 12;
    const total_results = pool.length;
    const total_pages = Math.max(1, Math.ceil(total_results / pageSize));
    const currentPage = Math.min(Math.max(1, page), total_pages);
    const results = pool.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize,
    );

    return { results, total_pages, total_results, isLiveApi: false };
  },

  sortMovies(movies, sortType) {
    const arr = [...movies];
    switch (sortType) {
      case "popularity":
        return arr.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
      case "rating":
        return arr.sort(
          (a, b) => (b.vote_average || 0) - (a.vote_average || 0),
        );
      case "release_date":
        return arr.sort(
          (a, b) =>
            new Date(b.release_date || 0) - new Date(a.release_date || 0),
        );
      case "title":
        return arr.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
      default:
        return arr;
    }
  },
};
