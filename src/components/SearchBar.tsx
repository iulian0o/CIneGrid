interface SearchBarProps {
  query: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ query, onChange }: SearchBarProps) {
  return (
    <div className="search-input-wrapper">
      <input
        type="text"
        className="search-input"
        placeholder="Search movies, plot keywords, titles..."
        value={query}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}