import React from 'react';
import '../styles/about.css';  // Importing the About CSS file

const About = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>About Face Matching App</h1>
        <p>Learn more about the features of the app!</p>
      </header>

      <main className="about-main">
        <h2>Features Breakdown:</h2>
        <ul>
          <li>
            <strong>Face Matching with Famous Personalities:</strong> Uses facial recognition technology to match your face with a famous personality.
          </li>
          <li>
            <strong>Emoji Based on Facial Expression:</strong> Detects your facial expression and suggests an emoji that fits your mood.
          </li>
          <li>
            <strong>Cartoon Generation with Storytelling:</strong> Transforms your face into a cartoon and creates a personalized story based on your personality.
          </li>
          <li>
            <strong>Social Media Sharing:</strong> Easily share your results on social media platforms.
          </li>
        </ul>
      </main>
    </div>
  );
}

export default About;
