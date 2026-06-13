export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  selectedGeneration,
  setSelectedGeneration,
}) {
  const generations = [
    { id: "all", label: "Todos" },
    { id: "gen1", label: "Gen 1 — Kanto" },
    { id: "gen2", label: "Gen 2 — Johto" },
    { id: "gen3", label: "Gen 3 — Hoenn" },
    { id: "gen4", label: "Gen 4 — Sinnoh" },
    { id: "gen5", label: "Gen 5 — Unova" },
    { id: "gen6", label: "Gen 6 — Kalos" },
    { id: "gen7", label: "Gen 7 — Alola" },
    { id: "gen8", label: "Gen 8 — Galar" },
    { id: "gen9", label: "Gen 9 — Paldea" },
  ];

  const specialForms = [
    { id: "mega", label: "Mega Evoluciones" },
    { id: "gigamax", label: "Gigamax" },
    { id: "alola", label: "Formas Alola" },
    { id: "galar", label: "Formas Galar" },
    { id: "hisui", label: "Formas Hisui" },
    { id: "paldea", label: "Formas Paldea" },
    { id: "other", label: "Otras Formas" },
  ];

  return (
    <aside className={`pokedex-sidebar ${sidebarOpen ? "open" : "closed"}`}>
      <button
        className="sidebar-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? "←" : "☰"}
      </button>

      {sidebarOpen && (
        <>
          <h2>PokéTracker</h2>

          <div className="sidebar-section">
            <h3>Generaciones</h3>

            {generations.map((generation) => (
              <button
                key={generation.id}
                className={selectedGeneration === generation.id ? "active" : ""}
                onClick={() => setSelectedGeneration(generation.id)}
              >
                {generation.label}
              </button>
            ))}
          </div>

          <div className="sidebar-section">
            <h3>Formas especiales</h3>

            {specialForms.map((form) => (
              <button
                key={form.id}
                className={selectedGeneration === form.id ? "active" : ""}
                onClick={() => setSelectedGeneration(form.id)}
              >
                {form.label}
              </button>
            ))}
          </div>
        </>
      )}
    </aside>
  );
}