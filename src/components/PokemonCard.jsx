import "./PokemonCard.css";

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
            className="pokemon-image"
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