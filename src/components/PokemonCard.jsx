import "./PokemonCard.css";
import { spriteOverrides } from "../data/spriteOverrides";
import { typeIcons } from "../data/typeIcons";
import { typeTranslations } from "../data/typeTranslations";
import Icon from "@mdi/react";
import { mdiPokeball } from "@mdi/js";


function hasSpecialForm(pokemon) {
  const id = pokemon.id;

  return (
    id.endsWith("M1") ||
    id.endsWith("M2") ||
    id.endsWith("GG") ||
    id.endsWith("A") ||
    id.endsWith("G") ||
    id.endsWith("H") ||
    id.endsWith("P1") ||
    id.endsWith("P2") ||
    id.endsWith("P3") ||
    id.endsWith("M")
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
          <Icon path={mdiPokeball} size={0.9} />
        </div>
      )}
    </div>
  );
}