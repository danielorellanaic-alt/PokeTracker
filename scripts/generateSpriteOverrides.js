import fs from "fs/promises";

const POKEMON_JSON_PATH = "./src/data/pokemon.json";
const OUTPUT_PATH = "./src/data/spriteOverrides.js";

function cleanName(name) {
  return name
    .replaceAll("'", "")
    .replaceAll('"', "")
    .trim()
    .toLowerCase();
}

function getApiName(pokemon) {
  const name = cleanName(pokemon.name);

  if (pokemon.id.endsWith("GG")) {
    return name
      .replace("gigamax ", "")
      .replaceAll(" ", "-") + "-gmax";
  }

  if (pokemon.id.endsWith("M1")) {
    return name
      .replace("mega ", "")
      .replaceAll(" ", "-")
      .replace("-x", "-mega-x");
  }

  if (pokemon.id.endsWith("M2")) {
    return name
      .replace("mega ", "")
      .replaceAll(" ", "-")
      .replace("-y", "-mega-y");
  }

  if (pokemon.id.endsWith("M")) {
    return name
      .replace("mega ", "")
      .replaceAll(" ", "-") + "-mega";
  }

  if (pokemon.id.endsWith("A")) {
    return name
      .replace(" alolan", "")
      .replaceAll(" ", "-") + "-alola";
  }

  if (pokemon.id.endsWith("G")) {
    return name
      .replace(" galarian", "")
      .replaceAll(" ", "-") + "-galar";
  }

  if (pokemon.id.endsWith("H")) {
    return name
      .replace(" hisuian", "")
      .replaceAll(" ", "-") + "-hisui";
  }

  if (pokemon.id.endsWith("P1")) {
    return "tauros-paldea-aqua-breed";
  }

  if (pokemon.id.endsWith("P2")) {
    return "tauros-paldea-blaze-breed";
  }

  if (pokemon.id.endsWith("P3")) {
    return "tauros-paldea-combat-breed";
  }

  return null;
}

async function getPokeApiId(apiName) {
  const url = `https://pokeapi.co/api/v2/pokemon/${apiName}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`No encontrado: ${apiName}`);
  }

  const data = await response.json();

  return data.id;
}

async function main() {
  const rawData = await fs.readFile(POKEMON_JSON_PATH, "utf8");
  const pokemonList = JSON.parse(rawData);

  const overrides = {};
  const failed = [];

  for (const pokemon of pokemonList) {
    const apiName = getApiName(pokemon);

    if (!apiName) continue;

    try {
      const apiId = await getPokeApiId(apiName);
      overrides[pokemon.id] = apiId;

      console.log(`✅ ${pokemon.id} → ${apiName} → ${apiId}`);
    } catch (error) {
      failed.push({
        id: pokemon.id,
        name: pokemon.name,
        apiName,
      });

      console.log(`❌ ${pokemon.id} → ${apiName}`);
    }
  }

  const fileContent = `export const spriteOverrides = ${JSON.stringify(
    overrides,
    null,
    2
  )};
`;

  await fs.writeFile(OUTPUT_PATH, fileContent, "utf8");

  console.log("");
  console.log("Sprite overrides generados correctamente.");
  console.log(`Archivo creado: ${OUTPUT_PATH}`);

  if (failed.length > 0) {
    console.log("");
    console.log("No encontrados:");
    console.table(failed);
  }
}

main();