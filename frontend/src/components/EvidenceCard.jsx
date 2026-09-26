function EvidenceCard({ evidence = {} }) {
  const isSupporting =
    evidence.status === "SUPPORTING";

  return (
    <div className="evidence-card">

      <div className="evidence-header">

        <span className="evidence-type">
          📰 {evidence.type || "NEWS"}
        </span>

        <span
          className={
            isSupporting
              ? "evidence-status supporting"
              : "evidence-status"
          }
        >
          {isSupporting
            ? "✓ Supporting"
            : "Context"}
        </span>

      </div>

      <h3>
        {evidence.title || "Untitled evidence"}
      </h3>

      <div className="evidence-meta">

        <span>
          Source: {evidence.source || "Unknown"}
        </span>

        <span>
          Published:{" "}
          {evidence.publishedAt
            ? new Date(
                evidence.publishedAt
              ).toLocaleString()
            : "Unknown"}
        </span>

      </div>

      {evidence.url && (
        <a
          href={evidence.url}
          target="_blank"
          rel="noreferrer"
          className="source-link"
        >
          Read Source ↗
        </a>
      )}

    </div>
  );
}

export default EvidenceCard;