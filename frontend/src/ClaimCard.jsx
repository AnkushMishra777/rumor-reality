function ClaimCard({ claim }) {
  const verified =
    claim.status === "VERIFIED";

  return (
    <div className="claim-card">

      <p className="eyebrow">
        CLAIM DETECTED
      </p>

      <blockquote>
        "{claim.claim}"
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
            {claim.status}
          </strong>
        </div>

        <div>
          <span>Confidence</span>

          <strong>
            {claim.confidence}%
          </strong>
        </div>

      </div>

    </div>
  );
}

export default ClaimCard;