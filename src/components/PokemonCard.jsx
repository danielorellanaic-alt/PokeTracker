import "./PokemonCard.css";

export default function PokemonCard({
  pokemon,
  caught,
  toggle,
}) {

  return (

    <div
      className="pokemon-card"
      onClick={() => toggle(pokemon.id)}
    >

      {/* numero pokedex */}
      <div className="pokemon-number">
        #
        {String(pokemon.id).padStart(3, "0")}
      </div>

      {/* izquierda */}
      <div className="pokemon-left">

        {/* imagen */}
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="pokemon-image"
        />

        {/* nombre */}
        <div className="pokemon-info">

          <h2>
            {pokemon.name}
          </h2>

        </div>

      </div>

      {/* punto capturado */}
      <div
        className={
          caught
            ? "caught active"
            : "caught"
        }
      />

    </div>

  );

}