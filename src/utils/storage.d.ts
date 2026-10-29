import type { Movie } from "../types";

export function getFavorites(): Movie[];
export function toggleFavorite(movie: Movie): Movie[];
export function getTheme(): string;
export function setTheme(theme: string): void;
export function setApiKey(key: string): string;
export function getApiKey(): string;