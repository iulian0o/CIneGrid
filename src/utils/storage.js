export function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem("cinegrid_favorites")) ?? [];
  } catch (error) {
    return [];
  }
}

export function toggleFavorite(movie) {
  const favs = getFavorites();
  const index = favs.findIndex((m) => Number(m.id) === Number(movie.id));

  const updated =
    index >= 0
      ? favs.filter((m) => Number(m.id) !== Number(movie.id))
      : [movie, ...favs];

  try {
    localStorage.setItem("cinegrid_favorites", JSON.stringify(updated));
  } catch (error) {
    // pass
  }

  return updated;
}

export function getTheme() {
  return localStorage.getItem("cinegrid_theme") || "dark";
}

export function setTheme(theme) {
  localStorage.setItem("cinegrid_theme", theme);
  document.documentElement.setAttribute("data-theme", theme);
}

export function setApiKey(key) {
  const trimmed = (key || "").trim();
  localStorage.setItem("cinegrid_api_key", trimmed);
  return trimmed;
}

export function getApiKey() {
  return localStorage.getItem("cinegrid_api_key") || "";
}