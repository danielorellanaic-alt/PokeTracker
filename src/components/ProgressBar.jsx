import "./ProgressBar.css";

export default function ProgressBar({
  caught,
  total,
}) {

  const percent =
    total === 0
      ? 0
      : Math.floor((caught / total) * 100);

  const missing = total - caught;

  return (

    <div className="progress-card">

      {/* titulo */}
      <div className="progress-header">

        <div>

          <h2>
            Master Pokédex
          </h2>

          <p>
            Track your Pokémon journey
          </p>

        </div>

      </div>

      {/* contenido */}
      <div className="progress-content">

        {/* circulo */}
        <div 
          className="progress-circle"
          style={{
            "--percent": percent,
          }}
        > 

          <div className="circle-inner">

            <h3>
              {caught}
            </h3>

            <span>
              / {total}
            </span>

            <p>
              {percent}%
            </p>

          </div>

        </div>

        {/* stats */}
        <div className="progress-stats">

          <div className="stat caught">

            <span>
              {caught}
            </span>

            <p>
              Caught
            </p>

          </div>

          <div className="stat missing">

            <span>
              {missing}
            </span>

            <p>
              Missing
            </p>

          </div>

          <div className="stat total">

            <span>
              {total}
            </span>

            <p>
              Total
            </p>

          </div>

        </div>

      </div>

    </div>

  );

}