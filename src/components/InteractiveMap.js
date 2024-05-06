import React from 'react';

const InteractiveMap = () => {
    return (
        <section id='map'  style={{ width: '100%', height: '100vh' }}>
            <iframe 
                title="Interactive Map"
                src="http://sigeh.hidalgo.gob.mx/bdp/public/mapa/" 
                style={{ width: '100%', height: '100%', border: 'none' }} 
                allowFullScreen
            />
        </section>
    );
}

export default InteractiveMap;
