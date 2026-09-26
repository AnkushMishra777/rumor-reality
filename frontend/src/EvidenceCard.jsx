function EvidenceCard({ evidence }) {
  return (
    <div className="evidence-card">

      <div className="evidence-header">

        <span className="evidence-type">
          {evidence.type}
        </span>

        <span
          className={
            evidence.status === "SUPPORTING"
              ? "evidence-status supporting"
              : "evidence-status"
          }
        >
          {evidence.status === "SUPPORTING"
            ? "✓ Supporting"
            : "Context"}
        </span>

      </div>

      <h3>
        {evidence.title}
      </h3>

      <div className="evidence-meta">

        <span>
          Source: {evidence.source}
        </span>

        <span>
          Published:{" "}
          {new Date(
            evidence.publishedAt
          ).toLocaleString()}
        </span>

      </div>

      <a
        href={evidence.url}
        target="_blank"
        rel="noreferrer"
        className="source-link"
      >
        Read Source ↗
      </a>

    </div>
  );
}

export default EvidenceCard;