import React, { useState } from "react";
import "./ObesityPredict.css";
import { useNavigate } from "react-router-dom";
import {
  ERROR_MESSAGES,
  validatePositiveNumber,
  validatePositiveFloat,
} from "../../utils/validationRules";
import FieldError from "../../components/FieldError";
import { toast } from "react-toastify";

export default function ObesityPredict() {
  console.log("ObesityPredict component loaded, validatePositiveFloat:", typeof validatePositiveFloat);
  const [formData, setFormData] = useState({});
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();

  // Grouped Questions
  const questionGroups = {
    personal: [
      {
        label: "Gender",
        name: "gender",
        type: "select",
        options: [
          ["1", "Male"],
          ["2", "Female"],
        ],
      },
      { label: "Age (years)", name: "age", type: "number" },
      { label: "Height(m)", name: "height", type: "number" },
      { label: "Weight (kg)", name: "weight", type: "number" },
    ],
    food: [
      { label: "Calorie intake (per day)", name: "calories", type: "number" },
      {
        label: "Vegetable consumption (0-3)",
        name: "vegetables",
        type: "number",
      },
      { label: "Main meals per day", name: "meals", type: "number" },
      { label: "Snacks between meals (0–3)", name: "snacks", type: "number" },
      { label: "Water intake (liters)", name: "water", type: "number" },
      {
        label: "Monitor calorie intake?",
        name: "monitor",
        type: "select",
        options: [
          ["yes", "Yes"],
          ["no", "No"],
        ],
      },
    ],
    lifestyle: [
      {
        label: "Do you smoke?",
        name: "smoke",
        type: "select",
        options: [
          ["0", "No"],
          ["1", "Yes"],
        ],
      },
      {
        label: "Alcohol consumption",
        name: "alcohol",
        type: "select",
        options: [
          ["0", "Never"],
          ["1", "Sometimes"],
          ["2", "Frequently"],
        ],
      },
      {
        label: "Physical activity (hours/day)",
        name: "activity",
        type: "number",
      },
      { label: "Screen time (hours/day)", name: "screen_time", type: "number" },
      {
        label: "Family history of overweight",
        name: "family_history",
        type: "select",
        options: [
          ["yes", "Yes"],
          ["no", "No"],
        ],
      },
      {
        label: "Mode of transportation",
        name: "transport",
        type: "select",
        options: [
          ["Automobile", "Automobile"],
          ["Bike", "Bike"],
          ["Motorbike", "Motorbike"],
          ["Public_Transportation", "Public Transportation"],
          ["Walking", "Walking"],
        ],
      },
    ],
  };

  const allQuestions = Object.values(questionGroups).flat();
  const totalQuestions = allQuestions.length;

  const handleChange = (e) => {
    const { name, value } = e.target;
    const floatFields = ['height', 'weight', 'water', 'activity', 'screen_time', 'vegetables', 'meals', 'snacks', 'calories', 'age'];
    const selectNumericFields = ['gender', 'smoke', 'alcohol'];

    let parsedValue = value;
    if (floatFields.includes(name)) {
      parsedValue = value === '' ? '' : Number(value);
    } else if (selectNumericFields.includes(name)) {
      parsedValue = value === '' ? '' : Number(value);
    }

    setFormData((prev) => {
      const updated = { ...prev, [name]: parsedValue };
      const filled = Object.keys(updated).filter(
        (key) => updated[key] !== "",
      ).length;
      setProgress(Math.round((filled / totalQuestions) * 100));
      return updated;
    });

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const errs = {};
    const floatFields = ['height', 'weight', 'water', 'activity', 'screen_time', 'vegetables', 'meals', 'snacks', 'calories'];
    allQuestions.forEach((q) => {
      const val = formData[q.name];
      if (val === undefined || val === "") {
        errs[q.name] = ERROR_MESSAGES.REQUIRED;
      } else if (q.type === "number") {
        const numErr = floatFields.includes(q.name)
          ? validatePositiveFloat(val)
          : validatePositiveNumber(val);
        if (numErr) errs[q.name] = numErr;
      }
    });

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setTouched(
        allQuestions.reduce((acc, q) => ({ ...acc, [q.name]: true }), {}),
      );
      toast.error("Please fill in all fields correctly.");
      return;
    }

    try {
      // TODO: confirm final enum/value mapping for FAVC, CAEC, and CALC with AI/FE.
      // map formData to backend format
      const payload = {
        Gender: formData.gender,
        Age: formData.age,
        Height: formData.height, // height in meters as per label
        Weight: formData.weight,
        family_history_with_overweight: formData.family_history,
        FAVC: formData.calories,
        FCVC: formData.vegetables,
        NCP: formData.meals,
        CAEC: formData.snacks,
        SMOKE: formData.smoke,
        CH2O: formData.water,
        SCC: formData.monitor,
        FAF: formData.activity,
        TUE: formData.screen_time,
        CALC: formData.alcohol,
        MTRANS: formData.transport,
      };

      const response = await fetch(
        "http://localhost:8080/api/medical-report/retrieve",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) throw new Error("API request failed");

      const result = await response.json();
      localStorage.setItem("ObesityResult", JSON.stringify(result));
      localStorage.setItem("ObesitySurveyData", JSON.stringify(payload));
      toast.success("Survey submitted successfully!");
      navigate("/survey/result");
    } catch (err) {
      console.error(err);
      toast.error("Prediction failed. Please try again later.");
    }
  };

  return (
    <div className="obesity-card">
      <div className="heading_survey">Personal Medical Survey</div>

      <div className="prog">
        <span className="progress-label">{progress}% completed</span>
      </div>

      <div className="main_foorm">
        <form className="obesity-form" onSubmit={handleSubmit}>
          {Object.entries(questionGroups).map(([groupName, questions]) => (
            <div key={groupName} className="question-group">
              <h3 className="group-heading">
                {groupName === "personal" && "👤 Personal Information"}
                {groupName === "food" && "🍎 Food & Diet"}
                {groupName === "lifestyle" && "🏃 Lifestyle & Habits"}
              </h3>

              <div className="questions-grid">
                {questions.map((q) => (
                  <div key={q.name} className="question-card">
                    <label>{q.label}</label>
                    {q.type === "select" ? (
                      <select
                        name={q.name}
                        onChange={handleChange}
                        onBlur={() =>
                          setTouched((prev) => ({ ...prev, [q.name]: true }))
                        }
                        className={
                          errors[q.name] && touched[q.name]
                            ? "error-border"
                            : ""
                        }
                        value={formData[q.name] ?? ""}
                      >
                        <option value="">-- Select --</option>
                        {q.options.map(([val, text]) => (
                          <option
                            key={val}
                            value={q.type === "number" ? Number(val) : val}
                          >
                            {text}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={q.type}
                        name={q.name}
                        onChange={handleChange}
                        onBlur={() =>
                          setTouched((prev) => ({ ...prev, [q.name]: true }))
                        }
                        className={
                          errors[q.name] && touched[q.name]
                            ? "error-border"
                            : ""
                        }
                        value={formData[q.name] || ""}
                      />
                    )}
                    <FieldError
                      error={errors[q.name]}
                      touched={touched[q.name]}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="predict">
            <button type="submit" className="predict-btn">
              Predict
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
