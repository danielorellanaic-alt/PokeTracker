import "./PokemonCard.css";
import { spriteOverrides } from "../data/spriteOverrides";

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

  return (

    <div
      className={
        caught
          ? `pokemon-card caught-card type-${mainType}`
          : `pokemon-card type-${mainType}`
      }
      onClick={() => toggle(pokemon.id)}
    >

      {/* izquierda */}
      <div className="pokemon-left">

        {/* imagen */}
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

        {/* info */}
        <div className="pokemon-info">

          {/* numero */}
          <span className="pokemon-number">
            #{pokemon.pokedex}
          </span>

          {/* nombre */}
          <h2>
            {pokemon.name}
          </h2>

        </div>

      </div>

      {/* badge capturado */}
      {caught && (
        <div className="caught-badge">
          Capturado
        </div>
      )}

    </div>

  );

}