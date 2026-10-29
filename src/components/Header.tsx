import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useAppContext } from "../context/AppContext";

type HeaderProps = {
  searchQuery: string;
  onSearch: (value: string) => void;
};

const sunIcon = (
  <>
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </>
);

const moonIcon = (
  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
);

export default function Header({ searchQuery, onSearch }: HeaderProps) {
  const { theme, toggleTheme, favorites } = useAppContext();

  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="header-left">
          <div className="brand-logo">
            <div className="logo-dot"></div>
            <h1 className="logo-text">CINE&middot;GRID</h1>
          </div>
          <nav className="header-nav">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/about">About</NavLink>
          </nav>
        </div>

        <div className="header-search">
          <SearchBar query={searchQuery} onChange={onSearch} />
        </div>

        <div className="header-actions">
          <button className="btn-icon-label">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span>Watchlist</span>
            <span className="count-badge">{favorites.length}</span>
          </button>

          <button
            className="theme-toggle-btn"
            title="Toggle theme"
            aria-label="Toggle theme"
            onClick={toggleTheme}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {theme === "dark" ? sunIcon : moonIcon}
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}