import { useEffect, useState } from "react";
import "./App.css";

import Header from "./components/Header";
import PokemonCard from "./components/PokemonCard";
import ProgressBar from "./components/ProgressBar";

import pokemonData from "./data/pokemon.json";

export default function App() {
  const [activePage, setActivePage] = useState("pokedex");
  const [search, setSearch] = useState("");
  const [caught, setCaught] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("caught");

    if (saved) {
      setCaught(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "caught",
      JSON.stringify(caught)
    );
  }, [caught]);

  const toggleCaught = (id) => {
    setCaught((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  const filteredPokemon = pokemonData.filter((pokemon) => {
    const form =
      pokemon.form && pokemon.form !== "normal"
        ? pokemon.form
        : "";

    const pokemonName = pokemon.name.toLowerCase();
    const formName = form.toLowerCase();

    const fullName = `${form} ${pokemon.name}`
      .toLowerCase()
      .trim();

    const searchText = search.toLowerCase().trim();

    return (
      pokemonName.startsWith(searchText) ||
      formName.startsWith(searchText) ||
      fullName.startsWith(searchText)
    );
  });

  return (
    <div className="app">
      {activePage === "pokedex" && (
        <>
          <Header
            search={search}
            setSearch={setSearch}
          />

          <div className="pokemon-list">
            {filteredPokemon.map((pokemon) => (
              <PokemonCard
                key={`${pokemon.id}-${pokemon.form}-${pokemon.image}`}
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
          <p>
            Aquí después podremos crear colecciones
            personalizadas.
          </p>
        </div>
      )}

      {activePage === "progress" && (
        <div className="page">
          <h1>Progreso</h1>

          <ProgressBar
            caught={caught.length}
            total={pokemonData.length}
          />

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
          Pokédex
        </button>

        <button
          className={activePage === "collections" ? "active" : ""}
          onClick={() => setActivePage("collections")}
        >
          Colecciones
        </button>

        <button
          className={activePage === "progress" ? "active" : ""}
          onClick={() => setActivePage("progress")}
        >
          Progreso
        </button>
      </nav>
    </div>
  );
}