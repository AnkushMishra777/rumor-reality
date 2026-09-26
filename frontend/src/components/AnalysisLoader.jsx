import { useEffect, useState } from "react";

function AnalysisLoader() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((current) => Math.min(current + 1, 3));
    }, 750);

    return () => clearInterval(timer);
  }, []);

  const steps = [
    "Collecting market information",
    "Analyzing news",
    "Verifying claims",
    "Generating AI assessment",
  ];

  return (
    <div className="analysis-loader">

      <div className="loader-icon">
        🔎
      </div>

      <h2>Investigating</h2>

      <p>
        Connecting the market move with available evidence...
      </p>

      <div className="loader-steps">

        {steps.map((item, index) => (
          <div
            className={
              index <= step
                ? "loader-step completed"
                : "loader-step"
            }
            key={item}
          >
            <span>
              {index <= step ? "✓" : "○"}
            </span>

            {item}
          </div>
        ))}

      </div>

    </div>
  );
}

export default AnalysisLoader;