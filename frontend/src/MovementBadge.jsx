function MovementBadge({ movement }) {
  if (movement?.isSignificant) {
    return (
      <div className="movement-alert significant">
        <div className="movement-icon">
          🚨
        </div>

        <div>
          <h3>
            Significant Movement Detected
          </h3>

          <p>
            The stock moved beyond the configured
            investigation threshold of{" "}
            <strong>
              {movement.threshold}%
            </strong>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="movement-alert normal">
      <div className="movement-icon">
        ✓
      </div>

      <div>
        <h3>Normal Movement</h3>

        <p>
          No significant movement detected.
        </p>
      </div>
    </div>
  );
}

export default MovementBadge;