import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import "../styles/EmojiDetector.css";

const EmojiDetector = () => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [emoji, setEmoji] = useState(null);
  const [status, setStatus] = useState("");

  const loadModels = async () => {
    setStatus("⏳ Loading models...");
    const MODEL_URL = '/models';
    try {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]);
      setStatus("✅ Models loaded");
    } catch (err) {
      setStatus("❌ Failed to load models");
      console.error(err);
    }
  };

  useEffect(() => {
    loadModels();
  }, []);

  const capturePhoto = () => {
    const image = webcamRef.current.getScreenshot();
    setImageSrc(image);
    setEmoji(null);
    setStatus("");
  };

  const detectEmoji = async () => {
    setStatus("🔵 detectEmoji() started...");

    if (!imageSrc) {
      setStatus("❌ No image to analyze. Please capture a photo first.");
      return;
    }

    if (
      !faceapi.nets.tinyFaceDetector.isLoaded ||
      !faceapi.nets.faceExpressionNet.isLoaded
    ) {
      setStatus("❌ Models not loaded yet. Please wait...");
      return;
    }

    let img;
    try {
      img = await faceapi.fetchImage(imageSrc);
    } catch (err) {
      setStatus("❌ Failed to load image.");
      console.error(err);
      return;
    }

    setStatus("⏳ Detecting face and expressions...");
    const options = new faceapi.TinyFaceDetectorOptions({
      inputSize: 224, // Increased for better accuracy
      scoreThreshold: 0.5,
    });

    let detection;
    try {
      detection = await faceapi
        .detectSingleFace(img, options)
        .withFaceExpressions();
    } catch (err) {
      setStatus("❌ Error during face detection");
      console.error("Detection error:", err);
      return;
    }

    if (!detection) {
      setStatus("❌ No face detected");
      setEmoji("❌");
      return;
    }

    const expressions = detection.expressions;
    const sorted = Object.entries(expressions).sort((a, b) => b[1] - a[1]);
    const [topExpression, topScore] = sorted[0];

    const expressionToEmoji = {
      happy: "😄",
      sad: "😢",
      angry: "😠",
      surprised: "😲",
      neutral: "😐",
      disgusted: "🤢",
      fearful: "😨",
    };

    if (topScore < 0.6) {
      const likelyExpressions = sorted.filter(([_, score]) => score > 0.2);
      const emojis = likelyExpressions
        .map(([expr]) => expressionToEmoji[expr] || "🙂")
        .join(" ");
      const names = likelyExpressions
        .map(([expr]) => expr)
        .join(", ");
      setEmoji(emojis);
      setStatus(`😐 Mixed expressions: ${names}`);
    } else {
      setEmoji(expressionToEmoji[topExpression] || "🙂");
      setStatus(`🎉 Detected expression: ${topExpression}`);
    }
  };

  const downloadResult = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      ctx.font = "60px Arial";
      ctx.fillStyle = "red";
      ctx.fillText(emoji, 30, 60);
      const link = document.createElement('a');
      link.href = canvas.toDataURL();
      link.download = 'emoji-result.png';
      link.click();
    };
  };

  return (
    <div className="emoji-detector-container">
      <h2 className="emoji-detector-title">Check Your Emoji</h2>

      <div className="flex justify-between">
        {/* Camera Section */}
        <div className="webcam-container">
          {!imageSrc ? (
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="emoji-preview"
            />
          ) : (
            <img src={imageSrc} alt="Captured" className="emoji-preview" />
          )}
        </div>

        {/* Result Section */}
        <div className="result-container">
          {emoji && (
            <div className="emoji-display bubble">
              <p className="emoji-text">{emoji}</p>
            </div>
          )}
        </div>
      </div>

      <div className="button-group">
        {!imageSrc && (
          <button onClick={capturePhoto} className="button-capture">
            Capture
          </button>
        )}
        {imageSrc && (
          <>
            <button onClick={detectEmoji} className="button-detect">
              Show Emoji
            </button>
            <button
              onClick={() => {
                setImageSrc(null);
                setEmoji(null);
                setStatus("");
              }}
              className="button-retake"
            >
              Retake
            </button>
            <button onClick={downloadResult} className="button-download">
              Download Result
            </button>
          </>
        )}
      </div>

      {status && <p className="status-message">{status}</p>}
    </div>
  );
};

export default EmojiDetector;
