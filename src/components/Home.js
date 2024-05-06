import React from 'react';
import './styles.css'; 
const imgBasePath = "img/";

const Home = () => {
    return (
        <section id='home' className="home-container">
            <div className="background-svg" />
            <div className="content_home">
                <div className="home_img">
                    <img src={`${imgBasePath}homeimg.png`} alt="img_representativa" className="floating-img" />
                </div>
                <div className="home_txt">
                    <img src={`${imgBasePath}hometxt.png`} alt="img_representativa" />
                </div>
            </div>
        </section>
    );
}

export default Home;
