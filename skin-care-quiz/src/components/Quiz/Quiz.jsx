import { useState } from 'react';
import quizData from './quizData';
import Question from './Question';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';
import './Quiz.css';

function Quiz() {
    const navigate = useNavigate();
    const [current, setCurrent] = useState(1);
    const [answers, setAnswers] = useState({});

    const handleSelect = (answer) => {
        setAnswers(prev => {
          if (prev[current] === answer) {
            const { [current]: removed, ...rest } = prev;
            return rest;
          }
          return {
            ...prev,
            [current]: answer,
          };
        });
      };

    const handleBack = () => {
        if (current > 1) {
            setCurrent(current - 1);
        } else {
            navigate('/');
        }
    }

    const handleNext = () => {
        if (current <= quizData.length) {
            setCurrent(current + 1);
        }
    };

    if (current > quizData.length) {
        navigate('/results', {state: {answers: answers}})
    }

    const { question, options } = quizData[current - 1];

    return (
        <>
            <div className="quiz-container">
                <Question question={question} options={options} current={current} answers={answers} onSelect={handleSelect} />
                <div className="nav-buttons ">
                    <button className="back" onClick={handleBack} disabled={current === 0}>Back</button>
                    {current < quizData.length ? (
                        <button className="next" onClick={handleNext}>
                            Next question →
                        </button>
                    ) : (
                        <button className="next" onClick={() => setCurrent(current + 1)}>
                            Discover your results
                        </button>
                    )}
                </div>
            </div>

            <div className="progress-bar-container">
                <CircularProgressbar
                    value={(current / quizData.length) * 100}
                    text={`${current}/${quizData.length}`}
                    styles={buildStyles({
                        textSize: '16px',
                        pathColor: '#AADDF3',
                        textColor: '#333',
                        trailColor: '#EEF7FB',
                    })}
                />
            </div>
        </>
    );
}

export default Quiz;
