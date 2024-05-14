// FillerPage.js
import React from 'react';

function FillerPage({ displayNextQuestion, svgUrls, backgroundImage }) {
  return (
    <section className="start-page" style={{ 
      backgroundImage: `url('${backgroundImage}')`,
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      padding: '20px', // Padding around the section
      height: "calc(100vh - 40px)",
      alignContent: "center"
    }}>
        <img src={svgUrls.lark} alt="Lark Logo" style={{ width: '120px', padding:"20px"}} />
        <h2> Congratulations! You’ve completed our workplace personality quiz.</h2>
        <button onClick={displayNextQuestion}><span style={{ fontWeight: '600' }} >Check out my workplace personality →</span></button>
    </section>
  );
}

export default FillerPage;
