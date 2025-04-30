import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import EmojiDetector from './pages/EmojiDetector';

import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <div>
              <Link to="/">Home</Link>
            </div>
            <div>
              <Link to="/about">About</Link>
            </div>
            <div>
                <Link to="/emoji">Emoji Detection</Link>
            </div>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/emoji" element={<EmojiDetector />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
