import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import EmojiDetector from './pages/EmojiDetector';
import PersonalityQuiz from './pages/PersonalityQuiz';


import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
              <Link to="/">Home__</Link>
              <Link to="/about">__About__</Link>
              <Link to="/emoji">__Emoji-Detection__</Link>
              <Link to="/personalityquiz">__Personality-Quiz</Link>

          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/emoji" element={<EmojiDetector />} />
          <Route path="/personalityquiz" element={<PersonalityQuiz />} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;
