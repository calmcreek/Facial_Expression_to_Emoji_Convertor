import React, { useState } from "react";
import "../styles/PersonalityQuiz.css";

const questions = [
  {
    id: "vacation",
    question: "What’s your ideal vacation?",
    options: ["Beach", "Mountains", "City", "Countryside"],
  },
  {
    id: "superpower",
    question: "If you had a superpower, what would it be?",
    options: ["Invisibility", "Time Travel", "Flying", "Telepathy"],
  },
  {
    id: "timeOfDay",
    question: "Do you prefer mornings or nights?",
    options: ["Morning", "Night"],
  },
  {
    id: "animal",
    question: "What’s your favorite animal?",
    options: ["Dog", "Cat", "Owl", "Tiger"],
  },
];

const PersonalityQuiz = ({ onComplete }) => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < questions.length) {
      alert("Please answer all questions.");
      return;
    }
    setSubmitted(true);
    if (onComplete) onComplete(answers); // send to parent component
  };

  return (
    <div className="quiz-container">
      <h3 className="quiz-title">Tell us a bit about yourself...</h3>
      {questions.map((q) => (
        <div key={q.id} className="quiz-question">
          <p>{q.question}</p>
          <div className="quiz-options">
            {q.options.map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  name={q.id}
                  value={option}
                  checked={answers[q.id] === option}
                  onChange={() => handleChange(q.id, option)}
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      ))}
      <button
        className="button-detect"
        onClick={handleSubmit}
        disabled={submitted}
      >
        {submitted ? "Generating Story..." : "Generate My Story"}
      </button>
    </div>
  );
};

export default PersonalityQuiz;
