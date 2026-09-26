import { useState, useEffect } from "react";
import type { Movie } from "../types.ts";
import { movieService } from "../services/movieService.js";

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadMovies() {
      setIsLoading(true);
      try {
        const data = await movieService.fetchMovies({ signal: controller.signal });
        setMovies(data.results);
        setError(null);
      } catch (err: any) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadMovies();

    return () => controller.abort();
  }, []);

  return { movies, isLoading, error };
}