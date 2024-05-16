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
        const message = encodeURIComponent(`Try out Lark's Workplace Personality Quiz and uncover your unique workstyle quirks! ${window.location.href}`);
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

      // Lark Product Mapping
    const larkProductMapping = {
            SHERIFF: [
                { name: 'Approval', url: 'https://www.larksuite.com/en_us/product/approval' },
                { name: 'Base', url: 'https://www.larksuite.com/product/base' }
            ],
            MASTERMIND: [
                { name: 'Docs', url: 'https://www.larksuite.com/en_us/product/creation' },
                { name: 'OKR', url: 'https://www.larksuite.com/en_us/product/okr' }
            ],
            SOCIALIZER: [
                { name: 'Rooms', url: 'https://www.larksuite.com/product/rooms/product-overview' },
                { name: 'Messenger', url: 'https://www.larksuite.com/en_us/product/messenger' }
            ],
            TEDTALKER: [
                { name: 'Meetings', url: 'https://www.larksuite.com/meetings' },
                { name: 'Messenger', url: 'https://www.larksuite.com/en_us/product/messenger' }
            ],
            CUSTODIAN: [
                { name: 'Approval', url: 'https://www.larksuite.com/en_us/product/approval' },
                { name: 'Base', url: 'https://www.larksuite.com/product/base' }
            ],
            CAREBEAR: [
                { name: 'Webinar', url: 'https://www.larksuite.com/en_us/product/webinar' },
                { name: 'Minutes', url: 'https://www.larksuite.com/en_us/product/minutes' }
            ],
            TINKERER: [
                { name: 'Meego', url: 'https://www.meegle.com/' },
                { name: 'AnyCross', url: 'https://www.larksuite.com/en_us/product/anycross' }
            ],
            ALTRUIST: [
                { name: 'Meego', url: 'https://www.meegle.com/' },
                { name: 'Base', url: 'https://www.larksuite.com/product/base' }
            ],
            RENEGADE: [
                { name: 'Messenger', url: 'https://www.larksuite.com/en_us/product/messenger' },
                { name: 'Calendar', url: 'https://www.larksuite.com/en_us/product/calendar' }
            ],
            ENERGIZER: [
                { name: 'Meetings', url: 'https://www.larksuite.com/en_us/product/video' },
                { name: 'Messenger', url: 'https://www.larksuite.com/en_us/product/messenger' }
            ],
            ADVERSARY: [
                { name: 'OpenPlatform', url: 'https://open.larkoffice.com/' },
                { name: 'Forms', url: 'https://www.larksuite.com/en_us/product/forms' }
            ],
            LUMINARY: [
                { name: 'Wiki', url: 'https://www.larksuite.com/en_us/product/wiki' },
                { name: 'Rooms', url: 'https://www.larksuite.com/product/rooms/product-overview' }
            ],
            MAVERICK: [
                { name: 'Anycross', url: 'https://www.larksuite.com/en_us/product/anycross' },
                { name: 'Docs', url: 'https://www.larksuite.com/en_us/product/creation' }
            ],
            FREESPIRIT: [
                { name: 'Messenger', url: 'https://www.larksuite.com/en_us/product/messenger' },
                { name: 'Meetings', url: 'https://www.larksuite.com/en_us/product/video' }
            ],
            BRAINIAC: [
                { name: 'Anycross', url: 'https://www.larksuite.com/en_us/product/anycross' },
                { name: 'Meego', url: 'https://www.meegle.com/' }
            ],
            SAMARITAN: [
                { name: 'Minutes', url: 'https://www.larksuite.com/en_us/product/minutes' },
                { name: 'Email', url: 'https://www.larksuite.com/en_us/product/email' }
            ]
        };

    // Map mbtiType to personality name
    const personalityName = mbtiImageMapping[mbtiType];

    // Get the product mapping for the current personality name
    const mbtiProductMapping = larkProductMapping[personalityName];



    // Function to render the SVG image for each product button
    const renderProductLogo = (productName) => {
        const svgUrl = svgUrls[productName];
        if (!svgUrl) return null;
        return (
            <img src={svgUrl} alt={productName} />
        );
    };
    
    // Render buttons for each product
    // Function to render buttons for each product
    const renderProductButtons = () => {
        if (!mbtiProductMapping) {
            console.log("No product mapping found.");
            return null;
        }

        console.log("Rendering product buttons...");
        console.log(renderProductLogo)

        
        return mbtiProductMapping.map((product, index) => {
            const productUrl = product.url + '?from=personality-test-2024';
            const productName = product.name.toLowerCase()
            console.log(productUrl)
            console.log(productName)
            return (
                <div className="square-icon">
                <a key={index} href={productUrl} target="_blank" rel="noopener noreferrer" className="product-button" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                    <img src={svgUrls[productName]} alt={productName}/>
                </a>
                </div>
            );
        });
    }

    // Rest of your code...

    // Get the image file name based on the provided MBTI type
    const imageName = mbtiImageMapping[mbtiType];
    console.log('Image Name:', imageName); // Add this line to log the image name

    // Construct the image source
    const imageSrc = process.env.PUBLIC_URL + `/results/${imageName}.jpg`;
    console.log('Image Src:', imageSrc); // Log the image source

    // Render the result content only if mbtiType has a value
    if (!mbtiType) return null; // Don't render anything if mbtiType is empty

    // Render the result page content

    return (
        <section className="results-page">
            <div className="result-content" style={{ display: 'flex', flexDirection: 'column' }}>
            
                {/* Div for the image result */}
                <div className="image-result" style={{ marginBottom: '20px' }}>
                    <img src={imageSrc} alt={mbtiType} className="mbti-image" />
                </div>

                {/* Heading */}
                <h2 style={{ marginBottom: '20px', fontSize:"18px", color:"#1F2329", fontWeight:"500"}}>Unlock the complete report to gain insights into all of Lark's workplace personality types.</h2>

                {/* Div for each long button */}
                <div className="long-buttons" style={{ marginBottom: '20px' }}>
                    <button className="button-dark">
                        <a href="https://www.larksuite.com/global/register?redirect_uri=https%3A%2F%2Flarkieenterprise.larksuite.com%2Ffile%2FGnIibfgSgoAsEWx4mtkuse1CsLf&disable_cross_redirect=true&registration_process=global_register&app_id=1001&from=personality-test-2024" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <span style={{ fontWeight: '600' }}>Access the Full Report</span>
                        </a>
                    </button>
                    <button className="button-light" onClick={restartQuiz}>
                        <span style={{ fontWeight: '600' }}>Retake The Quiz</span>
                    </button>
                    {/* <button className="button-dark">
                        <a href="https://www.larksuite.com/global/register?redirect_uri=https%3A%2F%2Fwww.larksuite.com%2Fgetstarted%3Fdisable_cross_redirect%3Dtrue&registration_process=global_register&app_id=1001&from=quiz" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <span style={{ fontWeight: '600' }}>Discover Lark for the Workplace</span>
                        </a>
                    </button> */}
                </div>

                <div className="card">
                <h1 style={{ color: '#1F2329', fontSize: '24px'}}>Productivity Superapp for All Business Needs</h1>
                <h2 style={{ color: '#1F2329', fontWeight: '500', fontSize: '18px'}}>Optimize your work processes to get more done 
                together and faster, and stay ahead of competition.</h2>
                <div className="button-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {renderProductButtons()}
                </div>
                <h2 style={{ color: '#1F2329', fontWeight: '500', fontSize: '18px', fontStyle:'italic'}}>Click me!</h2>
                </div>

                
                <div>
                <h2 style={{ textAlign: 'center', marginBottom: '10px', color:'#000000', fontWeight: '500' }}>Share the Quiz</h2>
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
            </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '12px', marginTop: '10px' }}>
                {/* Powered by Lark */}
                <div style={{ marginBottom: '20px' }}>
                    <a href="https://www.larksuite.com?from=personality-test-2024" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <img src={svgUrls.larkdark} alt="Lark Logo" style={{ width: '100px', padding: '0 5px' }} />
                    </a>
                </div>

                {/* Copyright text */}
                <p style={{ margin: '0', color: "#000000", fontSize:"15px"}}>© 2024 Lark Technologies Pte. Ltd.</p>
            </div>
            </div>

            </section>
    );
};

export default ResultPage;
