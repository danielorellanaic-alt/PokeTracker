import "./PokemonCard.css";
import { spriteOverrides } from "../data/spriteOverrides";
import { typeIcons } from "../data/typeIcons";
import { typeTranslations } from "../data/typeTranslations";

function hasSpecialForm(pokemon) {
  const id = pokemon.id;
  const name = pokemon.name.toLowerCase();

  return (
    id.endsWith("M1") ||
    id.endsWith("M2") ||
    id.endsWith("GG") ||
    id.endsWith("PB") ||
    id.endsWith("SB") ||
    id.endsWith("TB") ||
    id.endsWith("SN") ||
    id.endsWith("P1") ||
    id.endsWith("P2") ||
    id.endsWith("P3") ||
    id.endsWith("AT") ||
    id.endsWith("DF") ||
    id.endsWith("SP") ||
    id.endsWith("PW") ||
    id.endsWith("SW") ||
    id.endsWith("TW") ||
    id.endsWith("OC") ||
    id.endsWith("SS") ||
    id.endsWith("M") ||
    id.endsWith("Z") ||
    id.endsWith("S") ||
    id.endsWith("R") ||
    id.endsWith("A") ||
    id.endsWith("G") ||
    id.endsWith("H") ||

    name.includes("incarnate") ||
    name.includes("galarian") ||
    name.includes("therian") ||
    name.includes("gigamax") ||
    name.includes("hisuian") ||
    name.includes("paldean") ||
    name.includes("defense") ||
    name.includes("altered") ||
    name.includes("alolan") ||
    name.includes("attack") ||
    name.includes("origin") ||
    name.includes("primal") ||
    name.includes("speed") ||
    name.includes("sunny") ||
    name.includes("rainy") ||
    name.includes("snowy") ||
    name.includes("mega") ||
    name.includes("land") ||
    name.includes("sky") ||
    name.includes("east") ||
    name.includes("west") ||
    name.includes("overgrown") ||
    name.includes("ice") ||
    name.includes("shadow") ||
    name.includes("dusk") ||
    name.includes("dawn") ||
    name.includes("school") ||
    name.includes("solo") ||
    name.includes("baile") ||
    name.includes("pom-pom") ||
    name.includes("pa'u") ||
    name.includes("sensu") ||
    name.includes("crowned") ||
    name.includes("eternal") ||
    name.includes("dada") ||
    name.includes("disguised") ||
    name.includes("gmax") ||
    name.includes("alola") ||
    name.includes("galar") ||
    name.includes("hisui") ||
    name.includes("aqua breed") ||
    name.includes("blaze breed") ||
    name.includes("combat breed") ||
    name.includes("paldea") ||
    name.includes("tauros") ||
    name.includes("castform") ||
    name.includes("deoxys") ||
    name.includes("mimikyu") ||
    name.includes("lycanroc") ||
    name.includes("wishiwashi") ||
    name.includes("minior") ||
    name.includes("necrozma") ||
    name.includes("oricorio") ||
    name.includes("eiscue") ||
    name.includes("indeedee") ||
    name.includes("morpeko") ||
    name.includes("urshifu") ||
    name.includes("zarude") ||
    name.includes("calyrex") ||
    name.includes("enamorus") ||
    name.includes("flabébé") ||
    name.includes("floette") ||
    name.includes("florges") ||
    name.includes("meowstic") ||
    name.includes("aegislash") ||
    name.includes("pumpkaboo") ||
    name.includes("gourgeist") ||
    name.includes("xurkitree") ||
    name.includes("celesteela") ||
    name.includes("kartana") ||
    name.includes("guzzlord") ||
    name.includes("necrozma") ||
    name.includes("magearna") ||
    name.includes("marshadow") ||
    name.includes("zeraora") ||
    name.includes("meltan") ||
    name.includes("melmetal") ||
    name.includes("grookey") ||
    name.includes("scorbunny") ||
    name.includes("sobble") ||
    name.includes("rillaboom") ||
    name.includes("cinderace") ||
    name.includes("raichu")
  );
}

function getPokemonSprite(pokemon) {
  const spriteId =
    spriteOverrides[pokemon.id] || pokemon.pokedex;

  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${spriteId}.png`;
}

export default function PokemonCard({
  pokemon,
  caught,
  toggle,
}) {
  const mainType = pokemon.types?.[0] || "normal";
  const pokemonTypes = pokemon.types || [];

  return (
    <div
      className={
        caught
          ? `pokemon-card caught-card type-${mainType}`
          : `pokemon-card type-${mainType}`
      }
      onClick={() => toggle(pokemon.id)}
    >
      <div className="pokemon-left">
        <div className="pokemon-image-container">
          <img
            src={getPokemonSprite(pokemon)}
            alt={pokemon.name}
            className={
              hasSpecialForm(pokemon) && !spriteOverrides[pokemon.id]
                ? "pokemon-image missing-special-sprite"
                : "pokemon-image"
            }
          />
        </div>

        <div className="pokemon-info">
          <span className="pokemon-number">
            #{pokemon.pokedex}
          </span>

          <h2>
            {pokemon.name}
          </h2>

          <div className="pokemon-types">
            {pokemonTypes.map((type) => (
              <div
                key={type}
                className={`type-badge type-badge-${type}`}
              >
                <img
                  src={typeIcons[type]}
                  alt={type}
                  className="type-icon"
                />

                <span>
                  {typeTranslations[type]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {caught && (
        <div className="caught-icon-badge">
          ✓
        </div>
      )}
    </div>
  );
}