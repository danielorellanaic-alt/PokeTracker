export default function ProgressBar({
  caught,
  total,
}) {
  const percent =
    total === 0
      ? 0
      : (caught / total) * 100;

  return (
    <div className="progress-container">

      <div className="progress-text">
        <span>Progress</span>

        <span>
          {caught}/{total}
        </span>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${percent}%`,
          }}
        />
      </div>

    </div>
  );
}