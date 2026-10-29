import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";
import type { Movie, Theme } from "../types";
import * as storage from "../utils/storage";

type State = {
  theme: Theme;
  favorites: Movie[];
};

type Action =
  | { type: "SET_THEME"; payload: Theme }
  | { type: "TOGGLE_FAVOURITE"; payload: Movie };

type AppContextType = {
  theme: Theme;
  toggleTheme: () => void;
  favorites: Movie[];
  toggleFavorite: (movie: Movie) => void;
  isFavorite: (id: number) => boolean;
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_THEME":
      return { ...state, theme: action.payload };
    case "TOGGLE_FAVOURITE": {
      const exists = state.favorites.some((m) => m.id === action.payload.id);
      return {
        ...state,
        favorites: exists
          ? state.favorites.filter((m) => m.id !== action.payload.id)
          : [action.payload, ...state.favorites],
      };
    }
    default:
      return state;
  }
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, () => ({
    theme: storage.getTheme() as Theme,
    favorites: storage.getFavorites() as Movie[],
  }));

  useEffect(() => {
    storage.setTheme(state.theme); 
  }, [state.theme]);

  useEffect(() => {
    localStorage.setItem("cinegrid_favorites", JSON.stringify(state.favorites));
  }, [state.favorites]);

  const toggleTheme = () =>
    dispatch({
      type: "SET_THEME",
      payload: state.theme === "dark" ? "light" : "dark",
    });

  const toggleFavorite = (movie: Movie) =>
    dispatch({ type: "TOGGLE_FAVOURITE", payload: movie });

  const isFavorite = (id: number) => state.favorites.some((m) => m.id === id);

  return (
    <AppContext.Provider
      value={{
        theme: state.theme,
        toggleTheme,
        favorites: state.favorites,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useAppContext must be used inside <AppProvider>");
  }
  return ctx;
}