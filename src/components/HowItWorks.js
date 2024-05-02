import React from 'react';
import './styles.css';
const imgBasePath = "img/";


const HowItWorks = () => {
    return (
        <div id='how' className="how-it-works">
            <div className="image-container">
                <img src={`${imgBasePath}animation.gif`} alt="img_representativa" className="centered-image" />
            </div>
        </div>
    );
}

export default HowItWorks;

