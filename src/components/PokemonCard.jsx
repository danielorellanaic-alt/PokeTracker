import "./PokemonCard.css";
import { spriteOverrides } from "../data/spriteOverrides";

function hasSpecialForm(pokemon) {
  return (
    pokemon.id.endsWith("M") ||
    pokemon.id.endsWith("M1") ||
    pokemon.id.endsWith("M2") ||
    pokemon.id.endsWith("GG") ||
    pokemon.id.endsWith("A") ||
    pokemon.id.endsWith("G") ||
    pokemon.id.endsWith("H") ||
    pokemon.id.endsWith("P1") ||
    pokemon.id.endsWith("P2") ||
    pokemon.id.endsWith("P3")
  );
}

function getPokemonSprite(pokemon) {
  const spriteId = spriteOverrides[pokemon.id] || pokemon.pokedex;

  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${spriteId}.png`;
}

export default function PokemonCard({
  pokemon,
  caught,
  toggle,
}) {

  return (

    <div
      className={
        caught
          ? "pokemon-card caught-card"
          : "pokemon-card"
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
            #
            {String(pokemon.id).padStart(4, "0")}
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