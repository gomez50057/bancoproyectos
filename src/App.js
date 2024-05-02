import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import ProjectsTable from './components/ProjectsTable';
import InterestingPages from './components/InterestingPages';
import HowItWorks from './components/HowItWorks';
import InteractiveMap from './components/InteractiveMap';
import Footer from './components/Footer';
import './index.css'; // Importamos los estilos globales

const App = () => {
    return (
        <div>
            <Navbar />
            <Home />
            <About />
            <ProjectsTable />
            <InterestingPages />
            <HowItWorks />
            <InteractiveMap />
            <Footer />
        </div>
    );
}

export default App;
