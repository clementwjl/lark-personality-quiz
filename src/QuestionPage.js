import React from 'react';

const QuestionPage = ({ question, optionA, optionB, displayNextQuestion, currentQuestionIndex, totalQuestions, svgUrls, backgroundImage, fontColorRanges }) => {
  // Function to determine font color based on current question index
  const getFontColor = () => {
    for (let i = 0; i < fontColorRanges.length; i++) {
      const range = fontColorRanges[i];
      if (currentQuestionIndex >= range.start && currentQuestionIndex <= range.end) {
        return range.color; // Return the color for the current range
      }
    }
    return '#ffffff'; // Default font color if no range matches
  };

  // Get font color for the current question index
  const fontColor = getFontColor();

  return (
    <section className="question-page">
      <div className="question-content" style={{ 
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <h2 style={{ color: fontColor }}>{question}</h2>
      </div>
      <div className="options">
        <button onClick={() => displayNextQuestion('A')}><span>{optionA}</span></button>
        <button onClick={() => displayNextQuestion('B')}><span>{optionB}</span></button>
      </div>
    </section>
  );
};

export default QuestionPage;
