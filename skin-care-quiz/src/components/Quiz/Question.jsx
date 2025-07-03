import './Quiz.css'

function Question({ question, options, current, answers, onSelect }) {
    return (
        <>
            <div className='quiz-item'>
                <h2 className="question">{question}</h2>

                <div className="options">
                    {options.map((opt, idx) => (
                        <button className={opt == answers[current] ? "selected" : ""} key={idx} onClick={() => onSelect(opt)}>
                            {opt}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Question;
