import fs from "fs/promises";
import { spriteOverrides } from "../src/data/spriteOverrides.js";

const POKEMON_JSON_PATH = "./src/data/pokemon.json";

async function getPokemonTypes(pokemon) {
  const apiId = spriteOverrides[pokemon.id] || pokemon.pokedex;

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${apiId}`);

  if (!response.ok) {
    return [];
  }

  const data = await response.json();

  return data.types.map((entry) => entry.type.name);
}

async function main() {
  const rawData = await fs.readFile(POKEMON_JSON_PATH, "utf8");
  const pokemonList = JSON.parse(rawData);

  const updatedPokemon = [];

  for (const pokemon of pokemonList) {
    const types = await getPokemonTypes(pokemon);

    updatedPokemon.push({
      ...pokemon,
      types,
    });

    console.log(`${pokemon.id} ${pokemon.name} → ${types.join(", ")}`);
  }

  await fs.writeFile(
    POKEMON_JSON_PATH,
    JSON.stringify(updatedPokemon, null, 2),
    "utf8"
  );

  console.log("Tipos agregados correctamente a pokemon.json");
}

main();