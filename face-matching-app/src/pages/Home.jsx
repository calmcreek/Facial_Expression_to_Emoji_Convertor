import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';  // Importing the Home CSS file

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to the Face Matching App</h1>
        <p>Match your face with famous personalities and have fun!</p>
      </header>

      <main className="home-main">
        <section className="features">
          <h2>Main Features:</h2>
          <ul>
            <div><strong>Face Matching:</strong> Match your face with celebrities.</div>
            <div><strong>Emoji Detection:</strong> See which emoji represents your mood.</div>
            <div><strong>Cartoon Generation:</strong> Turn your face into a cartoon and create a personalized story!</div>
            <div><strong>Social Sharing:</strong> Share your results with friends.</div>
          </ul>
        </section>

        <section className="cta">
          <p>To learn more about these features, visit the <Link to="/about">About Page</Link>.</p>
        </section>
      </main>
    </div>
  );
}

export default Home;
