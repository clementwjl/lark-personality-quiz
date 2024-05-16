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
    { question: "Q1/12: It's time for the company's performance review cycle, to lighten the mood, you:", optionA: "Organize a 'Survivor: Office Edition' game, with the prize being an excellent grade.", optionB: "Create personalised survivor kits with snacks and a 'Keep Calm' playlist."},
    { question: "Q2/12: When faced with revamping the office break room, you:", optionA: "Envision a futuristic, tech-savvy lounge complete with interactive screens and a drone-delivery snack service.", optionB: "Opt for a cozy setup with comfortable seating, a coffee bar with local blends, and get colleagues to vote for future upgrades."},
    { question: "Q3/12: Your colleague outrageously claims credit for your idea in a meeting. You:", optionA: "Calmly present documented evidence in the next meeting to subtly prove that the initial idea was yours.", optionB: "Create a support group for idea adopters to sympathize with those whose ideas were stolen." },
    { question: "Q4/12: You've been assigned to plan the office holiday party. Do you:", optionA: "Organize a 'Choose Your Own Adventure' party where with multiple activity options and let attendees choose what they want to do in the moment.", optionB: "Plan a fun, themed event with a detailed agenda, including games, performances, and timed surprises to keep everyone entertained ending off the day with a highlight."},
    { question: "Q5/12: Your colleague working from home forgot to mute himself during the All-Hands and was talking about his recent pantry raids. Your instinct:", optionA: "Start a light-hearted chat thread about favorite pantry snacks to subtly alert your colleague that he's unmuted.", optionB: "Discreetly message your colleague to let him know he's unmuted, hoping he mutes himself quickly." },
    { question: "Q6/12: You've been assigned an urgent high-stakes assignment, do you:", optionA: "Book a meeting room with your team, doodle your thoughts on the whiteboard, and kickstart a brainstorming session.", optionB: "Head back to your desk, gather your thoughts, and dive into detailed research on past case studies before approaching the problem head-on with your team." },
    { question: "Q7/12: You come face to face with a heated debate at a work meeting. You decide to:", optionA: "Take control and moderate the discussion, setting clear rules and time limits to ensure a logical and fair debate.", optionB: "Facilitate a sharing session where everyone feels heard. Encourage participants to reflect on each other's viewpoints, fostering mutual understanding."},
    { question: "Q8/12: Your company suddenly announces that a five-day Return to Office (RTO) arrangement begins next Monday. You:", optionA: "Panic book a last-minute flight to a randomly chosen country and indulge in spontaneous adventures to make the most of your final WFH days.", optionB: "Take a deep breath and start planning an epic weekend adventure — book a cozy cabin in the mountains, pack your schedule with fun activities, don't forget to bring along a book!" },
    { question: "Q9/12: You’ve been spontaneously assigned to lead a team-building activity for the coming townhall, you decide to:", optionA: "Organize a company-wide scavenger hunt, where teams compete to find hidden cash bonuses and extra paid time off.", optionB: "Plan an engaging virtual game of 'Who Wants to Be a Millionaire?' where individuals compete across different categories to earn cash prizes." },
    { question: "Q10/12: You ended off a meeting with your supervisor who left you with a cryptic message: 'Embrace the shadows, for therein lies the light.' Do you:", optionA: "Head to your work bestie's desk and brainstorm for 30 minutes about the deeper meaning behind your supervisor's cryptic message.", optionB: "Write down the quote and brainstorm practical steps with your team to address any potential issues or insights it might hint at." },
    { question: "Q11/12: You see your co-workers visibly upset because they make a major work mistake. You decide to:", optionA: "Draw a flowchart explaining their emotions and potential solutions on how they can prevent such issues from happening again.", optionB: "Organize a spontaneous group hug and follow it with a fun, silly dance to lift everyone's spirits." },
    { question: "Q12/12: You receive an alarming email from your supervisor: the major project you've dedicated the past six months to is in danger of being derailed, putting your job on the line. After a day of pondering, you:", optionA: "Take it as a sign from the universe and consider embarking on your dream career whether it's a zoo-keeper or a full-time TikTok travel influencer.", optionB: "Activate the LinkedIn Premium subscription you've been saving and start a LinkedIn Jobs checklist of potential job opportunities you can pursue." },
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
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    
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
    } else if (currentQuestionIndex == questions.length + 1) {
      const fillerPageUrl = svgUrls["startpage"];
      setBackgroundImage(`url("${fillerPageUrl}")`);
    } else {
      // If it's not the start page or a question page, set the background to the start page
      setBackgroundImage('linear-gradient(180deg, rgba(242, 245, 255, 0.7) 0%, rgba(242, 245, 255, 1) 100%)');
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
