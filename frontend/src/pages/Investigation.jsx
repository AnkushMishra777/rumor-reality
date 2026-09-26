import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import StockHeader from "../components/StockHeader";
import PriceCard from "../components/PriceCard";
import MovementBadge from "../components/MovementBadge";
import PriceChart from "../components/PriceChart";
import AnalysisLoader from "../components/AnalysisLoader";
import VerdictCard from "../components/VerdictCard";
import ConfidenceScore from "../components/ConfidenceScore";
import HypeScore from "../components/HypeScore";
import AnalysisReasons from "../components/AnalysisReasons";
import ClaimCard from "../components/ClaimCard";
import EvidenceCard from "../components/EvidenceCard";
import Timeline from "../components/Timeline";

import {
  getStock,
  analyzeStock,
} from "../services/api";

function Investigation() {

  const { symbol } = useParams();

  const [stock, setStock] = useState(null);

  const [analysis, setAnalysis] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [analyzing, setAnalyzing] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {

    async function loadStock() {

      try {

        setLoading(true);

        const data =
          await getStock(symbol);

        setStock(data);

      } catch (err) {

        setError(
          "Unable to retrieve stock information."
        );

      } finally {

        setLoading(false);

      }
    }

    loadStock();

  }, [symbol]);


  async function handleAnalyze() {

    try {

      setAnalyzing(true);
      setError("");

      const result =
        await analyzeStock(symbol);

      setAnalysis(result);

    } catch (err) {

      setError(
        "Investigation could not be completed."
      );

    } finally {

      setAnalyzing(false);

    }
  }


  if (loading) {

    return (
      <div className="full-screen-message">
        <div className="loading-spinner"></div>
        <h2>Loading stock...</h2>
      </div>
    );

  }


  if (error && !stock) {

    return (
      <div className="full-screen-message">

        <h2>
          {error}
        </h2>

        <button
          onClick={() =>
            window.location.reload()
          }
          className="retry-button"
        >
          Try Again
        </button>

      </div>
    );

  }


  return (
    <div className="app">

      <main className="investigation-page">

        <StockHeader
          stock={stock}
        />

        <div className="dashboard-grid">

          <PriceCard
            stock={stock}
          />

          <PriceChart
            data={stock.history || []}
          />

          <MovementBadge
            movement={stock.movement}
          />

          {!analysis && !analyzing && (

            <button
              className="analyze-button"
              onClick={handleAnalyze}
            >
              🔍 Investigate Movement
            </button>

          )}

          {analyzing && (
            <AnalysisLoader />
          )}

          {analysis && !analyzing && (

            <section className="analysis-section">

              <VerdictCard
                verdict={analysis.verdict}
              />

              <div className="score-grid">

                <ConfidenceScore
                  score={
                    analysis.verdict.confidence
                  }
                />

                <HypeScore
                  score={
                    analysis.verdict.hypeScore
                  }
                />

              </div>

              <AnalysisReasons
                reasons={analysis.reasons || []}
              />

              <div className="evidence-section">

                <div className="section-heading">

                  <div>
                    <h2>
                      Claim Investigated
                    </h2>

                    <p>
                      What the AI actually checked.
                    </p>
                  </div>

                </div>

                {(analysis.claims || []).map(
                  (claim, index) => (
                    <ClaimCard
                      key={index}
                      claim={claim}
                    />
                  )
                )}

              </div>

              <div className="evidence-section">

                <div className="section-heading">

                  <div>
                    <h2>
                      Evidence Behind The Verdict
                    </h2>

                    <p>
                      Sources used during the investigation.
                    </p>
                  </div>

                </div>

                <div className="evidence-grid">

                  {(analysis.evidence || []).map(
                    (item, index) => (

                      <EvidenceCard
                        key={index}
                        evidence={item}
                      />

                    )
                  )}

                </div>

              </div>

              <Timeline
                events={
                  analysis.timeline || []
                }
              />

            </section>
          )}

        </div>

      </main>

    </div>
  );
}

export default Investigation;