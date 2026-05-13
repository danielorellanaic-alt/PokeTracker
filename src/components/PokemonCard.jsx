export default function PokemonCard({ pokemon, caught, toggle }) {
  return (
    <div
      onClick={() => toggle(pokemon.id)}
      className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 px-4 py-3 flex items-center justify-between active:scale-[0.98] transition"
    >
      {/* IZQUIERDA */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center">
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="w-10 h-10 object-contain"
          />
        </div>

        <div className="flex flex-col">
          <span className="font-medium text-gray-800 capitalize">
            {pokemon.name}
          </span>

          {pokemon.form && pokemon.form !== "normal" && (
            <span className="text-xs text-gray-400 capitalize">
              {pokemon.form}
            </span>
          )}
        </div>
      </div>

      {/* DERECHA */}
      <div
        className={`w-3.5 h-3.5 rounded-full ${
          caught ? "bg-green-500" : "bg-gray-300"
        }`}
      />
    </div>
  );
}