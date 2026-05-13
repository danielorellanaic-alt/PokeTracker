export default function PokemonCard({
  pokemon,
  caught,
  toggle,
}) {
  return (
    <div
      className={`pokemon-card ${
        caught ? "caught" : ""
      }`}
      onClick={() =>
        toggle(pokemon.id)
      }
    >

      <img
        src={`/${pokemon.image}`}
        alt={pokemon.name}
      />

      <h3>{pokemon.name}</h3>

      <p>{pokemon.form}</p>

    </div>
  );
}