import svgUrls from './svgurl'; // Import SVG URLs
import React, { useState } from 'react';

const ResultPage = ({ mbtiType, restartQuiz }) => {
    const [copied, setCopied] = useState(false);

    // Function to share the quiz link
    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
        } catch (error) {
            console.error('Error copying to clipboard:', error);
        }
    };

    // Function to share via Telegram
    const shareViaTelegram = () => {
        const message = encodeURIComponent(`Check out my workplace personality quiz result! ${window.location.href}`);
        const telegramUrl = `https://t.me/share/url?url=${message}`;
        window.open(telegramUrl, '_blank');
    };

    // Function to share via WhatsApp
    const shareViaWhatsApp = () => {
        const message = encodeURIComponent(`Check out my workplace personality quiz result! ${window.location.href}`);
        const whatsappUrl = `https://api.whatsapp.com/send?text=${message}`;
        window.open(whatsappUrl, '_blank');
    };

    // Function to download the image
    const downloadImage = () => {
        // Get the image name based on the provided MBTI type
        const imageName = mbtiImageMapping[mbtiType];
    
        // Construct the image source
        const imageSrc = process.env.PUBLIC_URL + `/results/${imageName}.jpg`;
    
        // Fetch the image
        fetch(imageSrc)
            .then(response => response.blob())
            .then(blob => {
                // Create a temporary link element
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = `${imageName}_result.jpg`;
    
                // Simulate a click on the link to trigger the download
                link.click();
    
                // Clean up
                URL.revokeObjectURL(link.href);
            })
            .catch(error => {
                // Handle any errors
                console.error('Error downloading image:', error);
            });
    };
    

    const mbtiImageMapping = {
        ESTJ: 'SHERIFF',
        ENTJ: 'MASTERMIND',
        ESFJ: 'SOCIALIZER',
        ENFJ: 'TEDTALKER',
        ISTJ: 'CUSTODIAN',
        ISFJ: 'CAREBEAR',
        INTJ: 'TINKERER',
        INFJ: 'ALTRUIST',
        ESTP: 'RENEGADE',
        ESFP: 'ENERGIZER',
        ENTP: 'ADVERSARY',
        ENFP: 'LUMINARY',
        ISTP: 'MAVERICK',
        ISFP: 'FREESPIRIT',
        INTP: 'BRAINIAC',
        INFP: 'SAMARITAN'
      };

      // Get the image file name based on the provided MBTI type
        const imageName = mbtiImageMapping[mbtiType];
        console.log('Image Name:', imageName); // Add this line to log the image name

        // Construct the image source
        const imageSrc = process.env.PUBLIC_URL + `/results/${imageName}.jpg`;
        console.log('Image Src:', imageSrc); // Log the image source


    

    // Render the result content only if mbtiType has a value
    if (!mbtiType) return null; // Don't render anything if mbtiType is empty

    return (
        <section className="results-page">
            <div className="result-content" style={{ display: 'flex', flexDirection: 'column' }}>
            
                {/* Div for the image result */}
                <div className="image-result" style={{ marginBottom: '20px' }}>
                    <img src={imageSrc} alt={mbtiType} className="mbti-image" />
                </div>

                {/* Heading */}
                <h2 style={{ marginBottom: '20px', fontSize:"15px"}}>Share the quiz with your friends and see how you guys hit it off in the workplace!</h2>

                {/* Div for each long button */}
                <div className="long-buttons" style={{ marginBottom: '20px' }}>
                    <button onClick={restartQuiz}><span style={{ fontWeight: '600' }}>Retake The Quiz</span></button>
                    <button>
                    <a href="https://www.larksuite.com/global/register?redirect_uri=https%3A%2F%2Fwww.larksuite.com%2Fgetstarted%3Fdisable_cross_redirect%3Dtrue&registration_process=global_register&app_id=1001&from=quiz" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <span style={{ fontWeight: '600' }}>Discover Lark for the Workplace</span>
                    </a>
                    </button>
                </div>
                
                {/* Div for the 3 circular buttons */}
                <div className="circular-buttons" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center'}}>
                    <div className="circular-icon telegram" style={{ marginRight: '10px' }} onClick={shareViaTelegram}>
                        <img src={svgUrls.telegram} alt="Telegram" />
                    </div>
                    <div className="circular-icon whatsapp" style={{ marginRight: '10px' }} onClick={shareViaWhatsApp}>
                        <img src={svgUrls.whatsapp} alt="WhatsApp" />
                    </div>
                    <div className="circular-icon download" style={{ marginRight: '10px' }} onClick={downloadImage}>
                        <img src={svgUrls.download} alt="Download" />
                    </div>
                    <div className="circular-icon clipboard" onClick={copyToClipboard}>
                        <img src={svgUrls.clipboard} alt="Clipboard" />
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '12px', marginTop: '10px' }}>
                {/* Powered by Lark */}
                <div style={{ marginBottom: '20px' }}>
                    <a href="https://www.larksuite.com?from=quiz" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <img src={svgUrls.lark} alt="Lark Logo" style={{ width: '100px', padding: '0 5px' }} />
                    </a>
                </div>

                {/* Copyright text */}
                <p style={{ margin: '0' }}>© 2024 Lark Technologies Pte. Ltd.</p>
            </div>
            </div>

            </section>
    );
};

export default ResultPage;
