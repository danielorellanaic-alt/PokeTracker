import fs from "fs";

const formSections = {
  mega: "mega",
  gigantamax: "gigamax",
  gmax: "gigamax",
  alola: "alola",
  galar: "galar",
  hisui: "hisui",
  paldea: "paldea",
};

const getSection = (formName) => {
  const lower = formName.toLowerCase();

  for (const key in formSections) {
    if (lower.includes(key)) return formSections[key];
  }

  return "other";
};

const getFormLabel = (formName, baseName) => {
  return formName
    .replace(`${baseName}-`, "")
    .replaceAll("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const main = async () => {
  const forms = [];

  for (let id = 1; id <= 1025; id++) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    const species = await response.json();

    const varieties = species.varieties.filter(
      (variety) => variety.pokemon.name !== species.name
    );

    for (const variety of varieties) {
      const pokemonResponse = await fetch(variety.pokemon.url);
      const pokemon = await pokemonResponse.json();

      const section = getSection(pokemon.name);

      forms.push({
        id: `${String(id).padStart(4, "0")}-${pokemon.name.replace(`${species.name}-`, "")}`,
        pokedex: id,
        name: species.name
          .replaceAll("-", " ")
          .replace(/\b\w/g, (letter) => letter.toUpperCase()),
        form: getFormLabel(pokemon.name, species.name),
        section,
        spriteId: pokemon.id,
      });
    }
  }

  fs.writeFileSync(
    "./src/data/pokemon/forms.json",
    JSON.stringify(forms, null, 2)
  );

  console.log(`forms.json generado con ${forms.length} formas especiales.`);
};

main();