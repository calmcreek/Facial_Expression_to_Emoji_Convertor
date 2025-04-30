import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";

const EmojiDetector = () => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [emoji, setEmoji] = useState(null);
  const [status, setStatus] = useState(""); // for debug/status messages

  const loadModels = async () => {
    const MODEL_URL = '/models';
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
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
  
    setStatus("🔵 Loading image from base64 string...");
    let img;
    try {
      img = await faceapi.fetchImage(imageSrc);
      setStatus("✅ Image loaded successfully.");
    } catch (err) {
      setStatus("❌ Failed to load image.");
      console.error(err);
      return;
    }
  
    setStatus("⏳ Starting face detection with expressions...");
  
    const start = Date.now();
    // try {
    //   setStatus("⏳ Calling detectSingleFace...");
    //   const detection = await faceapi
    //     .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
    //     .withFaceExpressions();
    //   const duration = ((Date.now() - start) / 1000).toFixed(2);
  
    //   if (detection) {
    //     setStatus(`✅ Detection complete in ${duration}s`);
    //     console.log("Detection result:", detection);
  
    //     const expressions = detection.expressions;
    //     const sorted = Object.entries(expressions).sort((a, b) => b[1] - a[1]);
    //     const topExpression = sorted[0][0];
  
    //     setStatus(`✅ Top expression: ${topExpression}`);
  
    //     const expressionToEmoji = {
    //       happy: "😄",
    //       sad: "😢",
    //       angry: "😠",
    //       surprised: "😲",
    //       neutral: "😐",
    //       disgusted: "🤢",
    //       fearful: "😨",
    //     };
  
    //     setEmoji(expressionToEmoji[topExpression] || "🙂");
    //   }
    // 
  //    else {
  //       setStatus("⚠️ No face detected.");
  //       setEmoji("❌");
  //     }
  //   } catch (err) {
  //     setStatus("❌ Error during detection.");
  //     console.error("Detection error:", err);
  //   }
  // };
  try {
    console.time("FaceDetection+Expressions");
    detection = await faceapi
      .detectSingleFace(img, options)
      .withFaceExpressions();
    console.timeEnd("FaceDetection+Expressions");
    setStatus("✅ Face and expressions detected");
  } catch (err) {
    setStatus("❌ Error during face detection");
    console.error("Detection error:", err);
    return;
  }

  if (!detection) {
    setStatus("❌ No face detected");
    return;
  }

  const expressions = detection.expressions;
  const sorted = Object.entries(expressions).sort((a, b) => b[1] - a[1]);
  const topExpression = sorted[0][0];

  const expressionToEmoji = {
    happy: "😄",
    sad: "😢",
    angry: "😠",
    surprised: "😲",
    neutral: "😐",
    disgusted: "🤢",
    fearful: "😨",
  };

  setEmoji(expressionToEmoji[topExpression] || "🙂");
  setStatus(`🎉 Detected expression: ${topExpression}`);
};
  


  return (
    <div className="text-center mt-8">
      <h2 className="text-2xl font-bold mb-4">Check Your Emoji</h2>

      {!imageSrc ? (
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={350}
          height={300}
          className="rounded"
        />
      ) : (
        <img src={imageSrc} alt="Captured" className="mx-auto rounded w-[350px] h-[300px]" />
      )}

      <div className="mt-4 space-x-4">
        {!imageSrc && (
          <button
            onClick={capturePhoto}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Capture
          </button>
        )}
        {imageSrc && (
          <button
            onClick={detectEmoji}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Show Emoji
          </button>
        )}
      </div>

      {status && <p className="mt-4 text-gray-700 italic">{status}</p>}
      {emoji && <div className="text-6xl mt-4">{emoji}</div>}
    </div>
  );
};

export default EmojiDetector;
