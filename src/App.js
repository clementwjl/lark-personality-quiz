import React, { useState, useEffect } from 'react';
import './App.css';
import StartPage from './StartPage';
import QuestionPage from './QuestionPage';
import ResultPage from './ResultPage';
import FillerPage from './FillerPage';
import svgUrls from './svgurl';

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userSelections, setUserSelections] = useState([]);
  const [mbtiType, setMbtiType] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('url("")');
  const [isQuestionPage, setIsQuestionPage] = useState(false);
  const [showResultsPage, setShowResultsPage] = useState(false);
  const fontColorRanges = [
    { start: 1, end: 3, color: '#ffffff' },
    { start: 4, end: 4, color: '#3835D5' },
    { start: 6, end: 6, color: '#ffffff' },
    { start: 6, end: 8, color: '#ffffff' },
    { start: 9, end: 11, color: '#3835D5' },
    { start: 12, end: 12, color: '#ffffff' },
  ];

  const questions = [
    { question: "Q1/12: It's time for the company's performance review cycle, to lighten the mood, you:", optionA: "Organize a 'Survivor: Office Edition' game, with the prize being getting an excellent grade.", optionB: "Create personalised survivor kits with snacks and a 'Keep Calm' playlist."},
    { question: "Q2/12: When faced with revamping the office break room, you:", optionA: "Sketch out a design for a futuristic, tech-savvy lounge complete with interactive screens and a drone-delivery snack service.", optionB: "Opt for a cozy, rustic vibe with comfy couches, a coffee bar featuring local blends, and a mural wall showcasing employee artwork." },
    { question: "Q3/12: Your colleague outrageously claims credit for your idea in a meeting. You:", optionA: "Dramatically reveal yourself as the true creator in the next meeting.", optionB: "Create a support group for idea adopters to sympathize with those whose ideas were stolen." },
    { question: "Q4/12: You've been assigned to plan the office holiday party. Do you:", optionA: "Throw a 'Choose Your Own Adventure' party where attendees vote on activities throughout the night.", optionB: "Create a stupidly detailed itinerary down to the minute, complete with color-coded schedules and contingency plans." },
    { question: "Q5/12: Your colleague working from home forgot to mute himself during the All-Hands and was talking about his recent pantry raids. Your instinct:", optionA: "Kickstart a top-5 pantry snacks chain message in the meeting chat.", optionB: "Internally pray for a snack-induced distraction at home to steer the meeting back to the agenda." },
    { question: "Q6/12: You've been assigned an urgent high-stakes assignment, do you:", optionA: "Book a meeting room and doodle your thoughts on the whiteboard to unleash your problem-solving and imaginative prowess.", optionB: "Organize your workspace meticulously with colorful sticky notes along with your favorite motivational mug in order to get started." },
    { question: "Q7/12: You come face to face with a heated debate at a work meeting. You decide to:", optionA: "Whip up a whistle and moderate the meeting with timeouts and slow-motion replays of the arguments.", optionB: "Introduce a hug it out rule where every disagreement must end with a hug and a compliment."},
    { question: "Q8/12: Your company suddenly announces that a five-day Return to Office (RTO) arrangement begins next Monday. You:", optionA: "Panic book a midnight flight on Friday to a beach club in Hawaii to enjoy your final WFH days.", optionB: "Panic as this wasn't stated in my contract, but go on to set my daily 8am alarms ahead of time." },
    { question: "Q9/12: You’ve been spontaneously assigned to lead a team-building activity for the coming townhall, you decide to:", optionA: "Organize a company-wide scavenger hunt, where teams compete to find hidden cash bonuses and extra paid time off.", optionB: "Open your HR portal and begin plotting your hospitalization leave to escape the need to plan the activity." },
    { question: "Q10/12: You ended off a meeting with your supervisor who left you with a cryptic message: 'Embrace the shadows, for therein lies the light.' Do you:", optionA: "Head to your work bestie's desk and have a 30 minute back and forth of what your supervisor was insinuating or suggesting. ", optionB: "Jot down the quote on a sticky note and add it to your post-it collection of work-learning reminders at your desk." },
    { question: "Q11/12: You see your co-workers visibly upset because they make a major work mistake. You decide to:", optionA: "Draw a flowchart explaining their emotions and potential solutions.", optionB: "Start an impromptu group hug session complete with motivational dance moves." },
    { question: "Q12/12: You receive an alarming email from your supervisor: the major project you've dedicated the past six months to is in danger of being derailed, putting your job on the line. After a day of pondering, you:", optionA: "Activate the LinkedIn Premium subscription you've been saving and start swiping on LinkedIn Jobs.", optionB: "Take it as a sign from the universe to embark on a full-time career as a TikTok influencer." },
  ];

  const displayNextQuestion = (selectedOption) => {
    setUserSelections(prevSelections => [...prevSelections, selectedOption]);
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    console.log("User Selections: ", userSelections);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserSelections([]);
    setShowResultsPage(false);
    setMbtiType('');
  };

  const calculateMBTI = () => {
    const classificationRules = {
      "E vs I": [1, 5, 9],
      "N vs S": [2, 6, 10],
      "T vs F": [3, 7, 11],
      "P vs J": [4, 8, 12]
    };
  
    const dominantPreferences = {};
  
    Object.entries(classificationRules).forEach(([category, questionIndices]) => {
      const answers = questionIndices.map(index => userSelections[index]);
      const countA = answers.filter(answer => answer === 'A').length;
      const countB = answers.length - countA;
  
      console.log(`For ${category}: A: ${countA}, B: ${countB}`);
  
      dominantPreferences[category] = countA > countB ? 'A' : 'B';
    });
  
    console.log("Dominant Preferences:", dominantPreferences);
  
    // Convert dominant preferences to MBTI type
    const mbtiType = `${dominantPreferences["E vs I"] === 'A' ? 'E' : 'I'}${dominantPreferences["N vs S"] === 'A' ? 'N' : 'S'}${dominantPreferences["T vs F"] === 'A' ? 'T' : 'F'}${dominantPreferences["P vs J"] === 'A' ? 'P' : 'J'}`;
  
    console.log("MBTI:", mbtiType); // Log the calculated MBTI type
    
    return mbtiType;
  };

  const handleQuizCompletion = () => {
    setMbtiType(calculateMBTI());
    setShowResultsPage(true);
  };

  useEffect(() => {
    if (currentQuestionIndex === 0) {
      // Set the background image URL to the start page SVG
      const startPageUrl = svgUrls["startpage"];
      setBackgroundImage(`url("${startPageUrl}")`);
    } else if (currentQuestionIndex > 0 && currentQuestionIndex <= questions.length) {
      // Set the background image URL based on the current question index
      const imageUrl = svgUrls[`illus${currentQuestionIndex}`];
      setBackgroundImage(`url("${imageUrl}")`);
    } else {
      // If it's not the start page or a question page, set the background to the start page
      const startPageUrl = svgUrls["startpage"];
      setBackgroundImage(`url("${startPageUrl}")`);
    }
  }, [currentQuestionIndex, questions.length, svgUrls]);

  useEffect(() => {
    setIsQuestionPage(currentQuestionIndex > 0 && currentQuestionIndex <= questions.length);
  }, [currentQuestionIndex, questions.length]);

  return (
    <div className={`container ${isQuestionPage ? 'question-page-container' : ''}`} style={{backgroundImage}}>
        {currentQuestionIndex === 0 && (
          <StartPage
            displayNextQuestion={displayNextQuestion} 
            svgUrls={svgUrls} 
            backgroundImage={backgroundImage} 
          />
        )}

        {currentQuestionIndex > 0 && currentQuestionIndex <= questions.length && (
          <QuestionPage 
            question={questions[currentQuestionIndex - 1].question} 
            optionA={questions[currentQuestionIndex - 1].optionA} 
            optionB={questions[currentQuestionIndex - 1].optionB} 
            displayNextQuestion={displayNextQuestion} 
            currentQuestionIndex={currentQuestionIndex} 
            totalQuestions={questions.length} 
            svgUrls={svgUrls} 
            backgroundImage={backgroundImage} 
            fontColorRanges={fontColorRanges} 
          />
        )}

        {currentQuestionIndex > questions.length && !mbtiType && (
          <FillerPage 
            displayNextQuestion={handleQuizCompletion} 
            svgUrls={svgUrls} 
            backgroundImage={backgroundImage} 
          />
        )}
  
        {mbtiType && (
          <ResultPage 
            mbtiType={mbtiType} 
            restartQuiz={restartQuiz} 
          />
        )}
    </div>
  );
}  

export default App;
