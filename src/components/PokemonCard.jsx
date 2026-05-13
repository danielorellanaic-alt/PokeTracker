export default function PokemonCard({ pokemon, caught, toggle }) {
  return (
    <div
      onClick={() => toggle(pokemon.id)}
      className="flex items-center justify-between bg-white rounded-xl px-3 py-2 shadow-sm active:scale-[0.98] transition"
    >
      {/* IZQUIERDA */}
      <div className="flex items-center gap-3">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-12 h-12 object-contain"
        />

        <span className="font-medium text-gray-800 capitalize">
          {pokemon.name}
        </span>
      </div>

      {/* DERECHA: punto de estado */}
      <div
        className={`w-3 h-3 rounded-full ${
          caught === true ? "bg-green-500" : "bg-gray-300"
        }`}
      />
    </div>
  );
}