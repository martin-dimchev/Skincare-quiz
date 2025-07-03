import React from 'react'
import { useNavigate } from 'react-router-dom';
import './App.css'

function App() {
  const navigate = useNavigate();
  
  return (
    <div className="background">
      <div className='overlay'>
      <div className="main-content">
        <h1>Build a self care routine<br />suitable for you</h1>
        <p>Take out test to get a personalised self care<br />routine based on your needs.</p>
        <button className="quiz-button" onClick={() => navigate('/quiz')}>Start the quiz</button>
      </div>
    </div>
    </div>
  );
}

export default App
