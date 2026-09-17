import type { Movie } from "../types";

export const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
export const TMDB_BACKDROP_BASE = "https://image.tmdb.org/t/p/w1280";

export const SAMPLE_MOVIES: Movie[] = [
  {
    id: 1, title: "Avatar: The Way of Water", original_title: "Avatar: The Way of Water",
    overview: "Jake Sully and Ney'tiri have formed a family and are doing everything to stay together.",
    poster_path: "/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg", backdrop_path: "/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg",
    genre_ids: [878, 12, 14], release_date: "2022-12-14", vote_average: 7.6, vote_count: 10800,
    popularity: 900, adult: false,
  },
  {
    id: 2, title: "John Wick: Chapter 4", original_title: "John Wick: Chapter 4",
    overview: "John Wick uncovers a path to defeating The High Table.",
    poster_path: "/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg", backdrop_path: "/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
    genre_ids: [28, 53, 80], release_date: "2023-03-22", vote_average: 7.9, vote_count: 7200,
    popularity: 700, adult: false,
  },
  {
    id: 3, title: "Ant-Man and the Wasp: Quantumania", original_title: "Ant-Man and the Wasp: Quantumania",
    overview: "Scott Lang and Hope Van Dyne are dragged into the Quantum Realm.",
    poster_path: "/qnqGbB22YJ7dSs4o6M7exTpNxPz.jpg", backdrop_path: "/qnqGbB22YJ7dSs4o6M7exTpNxPz.jpg",
    genre_ids: [12, 878, 35], release_date: "2023-02-15", vote_average: 6.5, vote_count: 4300,
    popularity: 500, adult: false,
  },
  {
    id: 4, title: "Spider-Man: No Way Home", original_title: "Spider-Man: No Way Home",
    overview: "Peter Parker is unmasked and asks Doctor Strange for help.",
    poster_path: "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg", backdrop_path: "/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg",
    genre_ids: [28, 12, 878], release_date: "2021-12-15", vote_average: 7.9, vote_count: 22600,
    popularity: 640, adult: false,
  },
  {
    id: 5, title: "Toy Story 5", original_title: "Toy Story 5",
    overview: "Buzz, Woody and the gang face a new threat to playtime.",
    poster_path: "/sfQtVlIHljToOwYjhe21KPGzZWK.jpg", backdrop_path: "/8sSKdEmlmqF4kJUd28SqthXC4yZ.jpg",
    genre_ids: [16, 10751, 35], release_date: "2026-06-17", vote_average: 7.4, vote_count: 800,
    popularity: 290, adult: false,
  },
];

export function getPosterUrl(path: string | null, width = 500): string {
  if (!path) return getPlaceholderPoster();
  if (path.startsWith("http")) return path;
  return `https://image.tmdb.org/t/p/w500${path}`;
}

export function getBackdropUrl(path: string | null, width = 1280): string {
  if (!path) return getPlaceholderBackdrop();
  if (path.startsWith('http')) return path;
  return `https://image.tmdb.org/t/p/w1280${path}`;
}

export function getPlaceholderPoster(title = "Movie"): string {
  const t = (title || "").replace(
    /[<>&'"]/g,
    (c) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        "'": "&apos;",
        '"': "&quot;",
      })[c] as string,
  );
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="750" viewBox="0 0 500 750" fill="none"><rect width="500" height="750" fill="#18181b"/><rect x="20" y="20" width="460" height="710" rx="12" stroke="#27272a" stroke-width="2" stroke-dasharray="8 8"/><circle cx="250" cy="320" r="60" fill="#27272a"/><polygon points="235,290 275,320 235,350" fill="#a1a1aa"/><text x="250" y="440" fill="#e4e4e7" font-family="sans-serif" font-size="24" font-weight="bold" text-anchor="middle">${t}</text><text x="250" y="480" fill="#71717a" font-family="sans-serif" font-size="16" text-anchor="middle">Poster Unavailable</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export function getPlaceholderBackdrop(): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720" fill="none"><rect width="1280" height="720" fill="#18181b"/><circle cx="640" cy="360" r="100" fill="#27272a"/><text x="640" y="520" fill="#71717a" font-family="sans-serif" font-size="20" text-anchor="middle">CineGrid Motion Picture</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}