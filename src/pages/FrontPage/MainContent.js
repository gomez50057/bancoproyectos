// Archivo: src/pages/FrontPage/MainContent.js
import React from 'react';
import Home from './Home';
import About from './About';
import ProjectIndicators from './ProjectIndicators';
import InterestingPages from './InterestingPages';
import HowItWorks from './HowItWorks';
import InteractiveMap from './mapa/InteractiveMap';

const MainContent = () => {
    return (
        <div>
            <Home />
            <About />
            <ProjectIndicators />
            <InterestingPages />
            <HowItWorks />
            <InteractiveMap />
        </div>
    );
};

export default MainContent;
