import { useEffect, useState } from "react";
import "./App.css";

import { List, Layers3, PieChart } from "lucide-react";

import Header from "./components/Header";
import PokemonCard from "./components/PokemonCard";
import ProgressBar from "./components/ProgressBar";

import pokemonData from "./data/pokemon.json";

export default function App() {
  const [activePage, setActivePage] = useState("pokedex");
  const [search, setSearch] = useState("");
  const [caught, setCaught] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const saved = localStorage.getItem("caught");

    if (saved) {
      setCaught(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("caught", JSON.stringify(caught));
  }, [caught]);

  const toggleCaught = (id) => {
    setCaught((prev) =>
      prev.includes(id)
        ? prev.filter((pokemonId) => pokemonId !== id)
        : [...prev, id]
    );
  };

  const filteredPokemon = pokemonData.filter((pokemon) => {
    const matchesSearch = pokemon.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const isCaught = caught.includes(pokemon.id);

    if (filter === "caught") {
      return matchesSearch && isCaught;
    }

    if (filter === "uncaught") {
      return matchesSearch && !isCaught;
    }

    return matchesSearch;
  });

  return (
    <div className="app">
      {activePage === "pokedex" && (
        <>
          <Header search={search} setSearch={setSearch} />

          <div className="filter-buttons">
            <button
              className={filter === "all" ? "active" : ""}
              onClick={() => setFilter("all")}
            >
              Todos
            </button>

            <button
              className={filter === "caught" ? "active" : ""}
              onClick={() => setFilter("caught")}
            >
              Capturados
            </button>

            <button
              className={filter === "uncaught" ? "active" : ""}
              onClick={() => setFilter("uncaught")}
            >
              Sin capturar
            </button>
          </div>

          <div className="pokemon-list">
            {filteredPokemon.map((pokemon) => (
              <PokemonCard
                key={`${pokemon.id}`}
                pokemon={pokemon}
                caught={caught.includes(pokemon.id)}
                toggle={toggleCaught}
              />
            ))}
          </div>
        </>
      )}

      {activePage === "collections" && (
        <div className="page">
          <h1>Colecciones</h1>
          <p>Aquí después podremos crear colecciones personalizadas.</p>
        </div>
      )}

      {activePage === "progress" && (
        <div className="page">
          <h1>Progreso</h1>

          <ProgressBar caught={caught.length} total={pokemonData.length} />

          <p>
            Capturados: {caught.length} / {pokemonData.length}
          </p>
        </div>
      )}

      <nav className="bottom-nav">
        <button
          className={activePage === "pokedex" ? "active" : ""}
          onClick={() => setActivePage("pokedex")}
        >
          <List size={26} />
          <span>Pokédex</span>
        </button>

        <button
          className={activePage === "collections" ? "active" : ""}
          onClick={() => setActivePage("collections")}
        >
          <Layers3 size={26} />
          <span>Colecciones</span>
        </button>

        <button
          className={activePage === "progress" ? "active" : ""}
          onClick={() => setActivePage("progress")}
        >
          <PieChart size={26} />
          <span>Progreso</span>
        </button>
      </nav>
    </div>
  );
}