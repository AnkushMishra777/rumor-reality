function AnalysisReasons({ reasons = [] }) {
  return (
    <div className="dashboard-card">

      <div className="section-heading">
        <div>
          <h2>Why Did The Stock Move?</h2>

          <p>
            Key factors identified by the investigation.
          </p>
        </div>
      </div>

      <div className="reasons-list">

        {reasons.length === 0 ? (
          <div className="reason-item">
            <div className="reason-icon">
              •
            </div>

            <span>
              No analysis reasons available yet.
            </span>
          </div>
        ) : (
          reasons.map((reason, index) => {

            const social =
              reason
                .toLowerCase()
                .includes("social");

            return (
              <div
                className="reason-item"
                key={index}
              >

                <div
                  className={
                    social
                      ? "reason-icon warning"
                      : "reason-icon"
                  }
                >
                  {social ? "⚠" : "✓"}
                </div>

                <span>{reason}</span>

              </div>
            );
          })
        )}

      </div>
    </div>
  );
}

export default AnalysisReasons;