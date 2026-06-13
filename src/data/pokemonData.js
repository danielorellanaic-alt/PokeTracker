import gen1 from "./pokemon/gen1.json";
import gen2 from "./pokemon/gen2.json";
import gen3 from "./pokemon/gen3.json";
import gen4 from "./pokemon/gen4.json";
import gen5 from "./pokemon/gen5.json";
import gen6 from "./pokemon/gen6.json";
import gen7 from "./pokemon/gen7.json";
import gen8 from "./pokemon/gen8.json";
import gen9 from "./pokemon/gen9.json";

import forms from "./pokemon/forms.json";

const SHOW_SPECIAL_FORMS = false;

const addNationalMetadata = (pokemonList, generation) => {
  return pokemonList.map((pokemon) => ({
    ...pokemon,
    generation,
    section: "national",
    spriteId: pokemon.spriteId || pokemon.pokedex,
  }));
};

const addFormsMetadata = (pokemonList) => {
  return pokemonList.map((pokemon) => ({
    ...pokemon,
    generation: "forms",
    section: pokemon.section,
    spriteId: pokemon.spriteId || pokemon.pokedex,
  }));
};

const nationalPokemon = [
  ...addNationalMetadata(gen1, "gen1"),
  ...addNationalMetadata(gen2, "gen2"),
  ...addNationalMetadata(gen3, "gen3"),
  ...addNationalMetadata(gen4, "gen4"),
  ...addNationalMetadata(gen5, "gen5"),
  ...addNationalMetadata(gen6, "gen6"),
  ...addNationalMetadata(gen7, "gen7"),
  ...addNationalMetadata(gen8, "gen8"),
  ...addNationalMetadata(gen9, "gen9"),
];

const specialForms = SHOW_SPECIAL_FORMS ? addFormsMetadata(forms) : [];

const pokemonData = [...nationalPokemon, ...specialForms];

export default pokemonData;