export default function PokemonCard({
  pokemon,
  caught,
  toggle,
}) {

  return (
    <div
      onClick={() => toggle(pokemon.id)}
      className="
        relative
        overflow-hidden
        w-full
        h-28
        rounded-3xl
        px-5
        flex
        items-center
        justify-between
        shadow-md
        transition-all
        active:scale-[0.98]
        bg-gradient-to-r
        from-green-200
        to-purple-200
      "
    >

      {/* numero grande fondo */}
      <span
        className="
          absolute
          right-4
          bottom-0
          text-6xl
          font-black
          text-white/40
          select-none
        "
      >
        #
        {String(pokemon.id).padStart(3, "0")}
      </span>

      {/* lado izquierdo */}
      <div className="flex items-center gap-4 z-10">

        {/* imagen */}
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="
            w-24
            h-24
            object-contain
            drop-shadow-md
          "
        />

        {/* nombre */}
        <div className="flex flex-col">

          <span
            className="
              text-3xl
              font-bold
              text-white
              capitalize
            "
          >
            {pokemon.name}
          </span>

          {/* estado capturado */}
          <div className="mt-2">
            <div
              className={`
                w-4
                h-4
                rounded-full
                ${
                  caught
                    ? "bg-green-500"
                    : "bg-white/50"
                }
              `}
            />
          </div>

        </div>

      </div>

    </div>
  );
}