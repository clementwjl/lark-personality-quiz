// StartPage.js

import React from 'react';

const StartPage = ({ displayNextQuestion, svgUrls, backgroundImage }) => {
  return (
    <div className="start-page" style={{ 
      backgroundImage: `url('${backgroundImage}')`,
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      padding: '20px', // Padding around the section
      height: "calc(100vh - 80px)",
      alignContent: "center"
    }}>
      <img src={svgUrls.lark} alt="Lark Logo" style={{ width: '120px', padding:"20px"}} />
      <h1 className='header1'>Welcome to Lark’s Workplace Personality Quiz!</h1>
      <h2 style={{ margin: '20px 0' }}>Embark on a fun journey to discover your unique work style and preferences! Get ready to dive into exciting scenarios and uncover insights that'll help you thrive in the workplace!</h2>     
      <button id="start-btn" style={{ marginBottom: '20px' }} onClick={() => displayNextQuestion(null)}><span style={{ fontWeight: '600' }}>Start Quiz →</span></button>
    </div>
  );
};

export default StartPage;
