import { useEffect, useState } from "react";

import Header from "./components/Header";
import ProgressBar from "./components/ProgressBar";
import PokemonCard from "./components/PokemonCard";

import pokemonData from "./data/pokemon.json";

export default function App() {
  const [search, setSearch] = useState("");
  const [caught, setCaught] = useState([]);

  // cargar progreso
  useEffect(() => {
    const saved = localStorage.getItem("caught");

    if (saved) {
      setCaught(JSON.parse(saved));
    }
  }, []);

  // guardar progreso
  useEffect(() => {
    localStorage.setItem(
      "caught",
      JSON.stringify(caught)
    );
  }, [caught]);

  // capturar pokemon
  const toggleCaught = (id) => {
    setCaught((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  // filtro búsqueda
   const filteredPokemon = pokemonData.filter(
  (pokemon) => {

    const form =
      pokemon.form &&
      pokemon.form !== "normal"
        ? pokemon.form
        : "";

    const pokemonName = pokemon.name
      .toLowerCase();

    const formName = form
      .toLowerCase();

    const fullName =
      `${form} ${pokemon.name}`
        .toLowerCase()
        .trim();

    const searchText = search
      .toLowerCase()
      .trim();

    return (
      pokemonName.startsWith(searchText) ||
      formName.startsWith(searchText) ||
      fullName.startsWith(searchText)
    );
  }
);

  return (
    <div className="app min-h-screen bg-gray-50">

      <Header
        search={search}
        setSearch={setSearch}
      />

      <ProgressBar
        caught={caught.length}
        total={pokemonData.length}
      />

      <div className="pokemon-list w-full max-w-md mx-auto px-3 flex flex-col gap-2 pb-6">
        {filteredPokemon.map((pokemon) => (
          <PokemonCard
            key={`${pokemon.id}-${pokemon.form}-${pokemon.image}`}
            pokemon={pokemon}
            caught={caught.includes(
              pokemon.id
            )}
            toggle={toggleCaught}
          />
        ))}
      </div>

    </div>
  );
}