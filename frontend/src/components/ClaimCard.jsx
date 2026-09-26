function ClaimCard({ claim = {} }) {
  const verified = claim.status === "VERIFIED";

  return (
    <div className="claim-card">

      <p className="eyebrow">
        CLAIM DETECTED
      </p>

      <blockquote>
        "{claim.claim || "No claim available"}"
      </blockquote>

      <div className="claim-details">

        <div>
          <span>Status</span>

          <strong
            className={
              verified
                ? "verified"
                : "unverified"
            }
          >
            {verified ? "✓" : "⚠"}{" "}
            {claim.status || "UNKNOWN"}
          </strong>
        </div>

        <div>
          <span>Confidence</span>

          <strong>
            {claim.confidence ?? 0}%
          </strong>
        </div>

      </div>

    </div>
  );
}

export default ClaimCard;