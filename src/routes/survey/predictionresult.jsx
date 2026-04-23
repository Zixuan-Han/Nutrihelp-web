import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import "./predictionresult.css";

export default function ObesityResult() {
  const [result, setResult] = useState(null);
  const resultRef = useRef(null);
  const [fitnessChoice, setFitnessChoice] = useState(null);
  const [targetWeight, setTargetWeight] = useState("");
  const [daysPerWeek, setDaysPerWeek] = useState("");
  const [workoutPlace, setWorkoutPlace] = useState("Home");
  const [isSubmittingPlan, setIsSubmittingPlan] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Read result from localStorage
    const stored = localStorage.getItem("ObesityResult");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setResult(parsed.medical_report || parsed);
      } catch (e) {
        console.error("Error parsing stored result:", e);
      }
    }
  }, []);

  const handleDownloadPDF = () => {
    if (!resultRef.current) return;
    html2pdf().from(resultRef.current).save("Obesity_Report.pdf");
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert("🔗 Link copied to clipboard!");
    });
  };

  const handleStartJourney = async () => {
    if (targetWeight === "" || daysPerWeek === "" || workoutPlace === "") {
      alert("Please complete all follow-up fields.");
      return;
    }

    const daysValue = Number(daysPerWeek);
    if (Number.isNaN(daysValue) || daysValue < 0 || daysValue > 7) {
      alert("days_per_week is required and must be between 0 and 7.");
      return;
    }

    const storedSurveyData = localStorage.getItem("ObesitySurveyData");
    if (!storedSurveyData) {
      alert("Survey data is missing. Please complete the survey again.");
      return;
    }

    try {
      const parsedSurveyData = JSON.parse(storedSurveyData);

      const payload = {
        medical_report: result,
        survey_data: {
          Gender: parsedSurveyData.Gender,
          Age: parsedSurveyData.Age,
          Height: parsedSurveyData.Height,
          Weight: parsedSurveyData.Weight,
          days_per_week: daysValue,
          target_weight: Number(targetWeight),
          workout_place: workoutPlace.toLowerCase(),
        },
      };

      setIsSubmittingPlan(true);

      const response = await fetch(
        "http://localhost:8080/api/medical-report/plan",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Plan generation failed");
      }

      const planResult = await response.json();
      localStorage.setItem("FitnessPlan", JSON.stringify(planResult));
      navigate("/roadmap");
    } catch (error) {
      console.error(error);
      alert("Failed to generate fitness plan. Please try again later.");
    } finally {
      setIsSubmittingPlan(false);
    }
  };

  return (
    <div className="full" ref={resultRef}>
      <div className="prediction-heading">🎯 Your Health Report</div>
      {result ? (
        <div className="result-info-container">
          <div className="result-card-simple">
            <div className="result-row">
              <span className="result-label">⚖️ Obesity Level:</span>
              <span className="result-value">
                {result.obesity_prediction?.obesity_level || "N/A"}
                {result.obesity_prediction?.confidence &&
                  ` (${(result.obesity_prediction.confidence * 100).toFixed(1)}% confidence)`}
              </span>
            </div>

            <div className="result-row">
              <span className="result-label">🩺 Diabetes Risk:</span>
              <span className="result-value">
                {result.diabetes_prediction?.diabetes !== undefined
                  ? result.diabetes_prediction.diabetes
                    ? "Positive"
                    : "Negative"
                  : "N/A"}
                {result.diabetes_prediction?.confidence &&
                  ` (${(result.diabetes_prediction.confidence * 100).toFixed(1)}% confidence)`}
              </span>
            </div>
          </div>
          <div className="result-buttons">
            <button className="save-btton" onClick={handleDownloadPDF}>
              📄 Save as PDF
            </button>
            <button className="copy-btn" onClick={handleCopyLink}>
              🔗 Copy Share Link
            </button>
            <Link to="/survey">
              <button className="back-btn">← Back to Questionnaire</button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="no-result">
          <p>No result data available.</p>
          <Link to="/survey">
            <button className="back-btn">Take the Survey</button>
          </Link>
        </div>
      )}

      <div className="fitness-question">
        {fitnessChoice === null && (
          <>
            💪 Do you want to start your fitness journey?
            <div className="choice-buttons">
              <button onClick={() => setFitnessChoice("yes")}>✅ Yes</button>
              <button onClick={() => setFitnessChoice("no")}>❌ No</button>
            </div>
          </>
        )}

        {fitnessChoice === "yes" && (
          <div className="followup-questions">
            <p>Great! Let’s get started 🚀</p>
            <label>
              1️⃣ What is your target weight?
              <input
                type="number"
                placeholder="(kg)"
                value={targetWeight}
                onChange={(e) => setTargetWeight(e.target.value)}
              />
            </label>
            <label>
              2️⃣ How many days a week can you exercise?
              <input
                type="number"
                min="0"
                max="7"
                placeholder="e.g., 4"
                value={daysPerWeek}
                onChange={(e) => setDaysPerWeek(e.target.value)}
              />
            </label>
            <label>
              3️⃣ Do you prefer home workouts or gym?
              <select
                value={workoutPlace}
                onChange={(e) => setWorkoutPlace(e.target.value)}
              >
                <option value="Home">Home</option>
                <option value="Gym">Gym</option>
                <option value="Both">Both</option>
              </select>
            </label>
            <button
              className="start-btn"
              onClick={handleStartJourney}
              disabled={isSubmittingPlan}
            >
              {isSubmittingPlan ? "Generating Plan..." : "🚀 Start Journey"}
            </button>
          </div>
        )}

        {fitnessChoice === "no" && (
          <div className="no-journey">
            <p>That’s okay 👍 You can always start later.</p>
            <button onClick={() => navigate("/home")}>🏠 Go to Home</button>
          </div>
        )}
      </div>
    </div>
  );
}
