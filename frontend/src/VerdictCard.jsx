const verdictConfig = {

  REAL_EVENT: {
    icon: "🟢",
    label: "Real Event",
    className: "real",
  },

  PARTIALLY_VERIFIED: {
    icon: "🟡",
    label: "Partially Verified",
    className: "partial",
  },

  UNVERIFIED_RUMOR: {
    icon: "🟠",
    label: "Unverified Rumor",
    className: "rumor",
  },

  CONTRADICTED: {
    icon: "🔴",
    label: "Contradicted",
    className: "contradicted",
  },

};

function VerdictCard({ verdict }) {

  const config =
    verdictConfig[verdict.status] ||
    verdictConfig.UNVERIFIED_RUMOR;

  return (
    <div
      className={`verdict-card ${config.className}`}
    >

      <div className="verdict-top">

        <div>

          <p className="eyebrow">
            AI INVESTIGATION RESULT
          </p>

          <div className="verdict-title">

            <span>
              {config.icon}
            </span>

            <h2>
              {config.label}
            </h2>

          </div>

        </div>

        <div className="verdict-confidence">

          <span>
            Confidence
          </span>

          <strong>
            {verdict.confidence}%
          </strong>

        </div>

      </div>

      <div className="verdict-description">

        The available evidence was analyzed
        against the timing and magnitude of
        the stock movement.

      </div>

    </div>
  );
}

export default VerdictCard;