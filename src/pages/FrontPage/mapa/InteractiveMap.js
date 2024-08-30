import React, { useEffect, useState, useRef, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster';
import axios from 'axios';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import './InteractiveMap.css';
import { municipios_proyectos } from './municipios';

// URL base para los íconos
const iconBaseUrl = "https://bibliotecadigitaluplaph.hidalgo.gob.mx/img_banco/mapa_ico/";

const sectorIcons = {
    Agua: `${iconBaseUrl}Agua.png`,
    "Comunicaciones y Transportes": `${iconBaseUrl}Comunicaciones y Transportes.png`,
    Cultura: `${iconBaseUrl}Cultura.png`,
    Deportes: `${iconBaseUrl}Deportes.png`,
    Educación: `${iconBaseUrl}Educación.png`,
    "Urbanización y Vivienda": `${iconBaseUrl}Urbanización y Vivienda.png`,
};

const InteractiveMap = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedSector, setSelectedSector] = useState('');
    const mapRef = useRef(null);
    const markersRef = useRef(L.markerClusterGroup());
    const [projects, setProjects] = useState([]);
    const [isFullScreen, setIsFullScreen] = useState(false);

    useEffect(() => {
        // Inicializa el mapa
        mapRef.current = L.map('map', {
            center: [20.5791, -98.9621],
            zoom: 9,
            zoomControl: false,
            minZoom: 8,
            maxZoom: 18
        });

        // Añade la capa base al mapa
        L.tileLayer('http://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        }).addTo(mapRef.current);

        mapRef.current.attributionControl.setPrefix('');

        // Añadir las áreas geográficas al mapa
        const geojson = L.geoJson(municipios_proyectos, {
            style: {
                fillColor: 'rgba(0, 0, 0, 0.4)',
                weight: 1,
                opacity: 0.7,
                color: '#fff',
                fillOpacity: 0.6
            },
        }).addTo(mapRef.current);

        document.getElementById('selectorMunicipio').addEventListener('change', function () {
            const selectedMunicipio = this.value;
            geojson.eachLayer(function (layer) {
                geojson.resetStyle(layer);
                if (layer.feature.properties.NOMGEO === selectedMunicipio) {
                    layer.setStyle({
                        color: '#691B32',
                        fillColor: '#691B32',
                        fillOpacity: 0.2,
                        weight: 5
                    });
                    mapRef.current.fitBounds(layer.getBounds());
                }
            });
        });

        // Rellenar selector de municipios con opciones
        const selectorMunicipio = document.getElementById('selectorMunicipio');
        municipios_proyectos.features
            .map(municipio => municipio.properties.NOMGEO)
            .sort()
            .forEach(municipio => {
                const option = document.createElement('option');
                option.value = municipio;
                option.textContent = municipio;
                selectorMunicipio.appendChild(option);
            });

        // Ajusta el tamaño del mapa después de la transición
        setTimeout(() => mapRef.current.invalidateSize(), 300);

        // Obtener los datos de los proyectos
        const fetchData = async () => {
            try {
                const response = await axios.get('/proyecto/');
                const filteredProjects = response.data.filter(project => project.estatus === 'Atendido');
                setProjects(filteredProjects);
                if (filteredProjects.length === 0) {
                    alert('No se encontraron proyectos con estatus "Atendido".');
                }
            } catch (error) {
                console.error('Error fetching project data:', error);
            }
        };

        fetchData();

        return () => {
            mapRef.current.remove();
        };
    }, []);

    const addMarkers = useCallback(() => {
        markersRef.current.clearLayers();
        projects
            .filter(project => !selectedSector || project.sector === selectedSector)
            .forEach(project => {
                if (project.latitud && project.longitud) {
                    const iconUrl = sectorIcons[project.sector] || `${iconBaseUrl}default.png`;

                    const customIcon = L.icon({
                        iconUrl: iconUrl,
                        iconSize: [60, 60],
                        iconAnchor: [40, 40],
                        popupAnchor: [0, -32]
                    });

                    const popupContent = `
                    <div class="popup-content">
                        <strong class="popup-project-name">${project.project_name}</strong><br>
                        <span class="popup-label">Tipo de Proyecto:</span> ${project.tipo_proyecto}<br>
                        <span class="popup-label">Sector:</span> ${project.sector}<br>
                        <span class="popup-label">Municipio:</span> ${project.municipioEnd}<br>
                        <span class="popup-label">Descripción:</span> ${project.descripcion}<br>
                        <span class="popup-label">Beneficiarios:</span> ${project.beneficiarios}<br>                       
                    </div>
                    `;

                    const marker = L.marker([project.latitud, project.longitud], { icon: customIcon })
                        .bindPopup(popupContent)
                        .on('click', function () {
                            mapRef.current.setView([project.latitud, project.longitud], mapRef.current.getZoom(), {
                                animate: true
                            });
                            this.openPopup();
                        });

                    markersRef.current.addLayer(marker);
                }
            });
        mapRef.current.addLayer(markersRef.current);
    }, [projects, selectedSector]);

    useEffect(() => {
        if (projects.length > 0) {
            addMarkers();
        }
    }, [projects, selectedSector, addMarkers]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
        setTimeout(() => mapRef.current.invalidateSize(), 300);
    };

    const toggleFullScreen = () => {
        if (!isFullScreen) {
            if (mapRef.current) {
                mapRef.current.getContainer().requestFullscreen();
            }
        } else {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            }
        }
        setIsFullScreen(!isFullScreen);
    };

    useEffect(() => {
        const handleFullScreenChange = () => {
            if (!document.fullscreenElement) {
                setIsFullScreen(false);
            }
        };

        document.addEventListener('fullscreenchange', handleFullScreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', handleFullScreenChange);
        };
    }, []);

    return (
        <section className="mapaConte">
            <div id='map'>
                <button
                    id="toggleSidebar"
                    onClick={toggleSidebar}
                    className={isSidebarOpen ? 'open' : ''}
                >
                    {isSidebarOpen ? 'Cerrar' : 'Abrir panel de información'}
                </button>

                {/* Icono de Pantalla Completa */}
                <div id="fullscreenButton" onClick={toggleFullScreen}>
                    {isFullScreen ? (
                        <FullscreenExitIcon />
                    ) : (
                        <FullscreenIcon />
                    )}
                </div>

                <div id="sidebar" className={isSidebarOpen ? 'open' : ''}>
                    <p className="sidebar-title">Proyectos</p>
                    <label htmlFor="selectorMunicipio">Selecciona por municipio:</label>
                    <select id="selectorMunicipio">
                        <option value="">-- Selecciona por municipio --</option>
                    </select>
                    <label htmlFor="sectorFilter">Filtrar por sector:</label>
                    <select
                        id="sectorFilter"
                        value={selectedSector}
                        onChange={(e) => setSelectedSector(e.target.value)}
                    >
                        <option value="">Todos los Sectores</option>
                        {Object.keys(sectorIcons).map(sector => (
                            <option key={sector} value={sector}>{sector}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="mapaTxt">
                <h2><span>Explora</span> Nuestros <span>Proyectos</span> en el <span>Mapa</span> Interactivo</h2>
                <p>Descubre nuestros proyectos más destacados alrededor de Hidalgo. Navega por el mapa y conoce cómo estamos transformando comunidades con soluciones innovadoras y sostenibles. ¡Haz clic en los marcadores para obtener más detalles sobre cada iniciativa!</p>
            </div>
        </section>
    );
}

export default InteractiveMap;
