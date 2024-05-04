import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import ProjectsTable from './components/ProjectsTable';
import InterestingPages from './components/InterestingPages';
import HowItWorks from './components/HowItWorks';
import InteractiveMap from './components/InteractiveMap';
import Footer from './components/Footer';

import Login from './components/Login';

const MainContent = () => {
    return (
        <div>
            <Home />
            <About />
            <ProjectsTable />
            <InterestingPages />
            <HowItWorks />
            <InteractiveMap />
        </div>
    );
}

const App = () => {
    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/" element={<MainContent />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;

