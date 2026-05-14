import "./Header.css";

export default function Header({
  search,
  setSearch,
}) {
  return (
    <div className="header">

      <h1>
        PokeTracker
      </h1>

      <input
        className="search-input"
        type="text"
        placeholder="Search Pokémon..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

    </div>
  );
}