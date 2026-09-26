function ConfidenceScore({ score }) {

  return (
    <div className="score-card">

      <p className="card-label">
        AI Confidence
      </p>

      <div className="score-number">
        {score}%
      </div>

      <div className="progress-track">

        <div
          className="progress-fill confidence"
          style={{
            width: `${score}%`,
          }}
        />

      </div>

      <p className="score-description">
        Confidence in the evidence assessment.
      </p>

    </div>
  );
}

export default ConfidenceScore;