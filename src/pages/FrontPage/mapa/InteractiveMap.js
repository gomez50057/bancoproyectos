import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster';
import axios from 'axios';
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
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [selectedSector, setSelectedSector] = useState(''); // Estado para el sector seleccionado
    const mapRef = useRef(null);
    const markersRef = useRef(L.markerClusterGroup()); // Referencia para los marcadores

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

        mapRef.current.attributionControl.setPrefix(''); // Elimina cualquier texto de atribución

        // Estilo para las áreas geográficas del mapa
        function style(feature) {
            return {
                fillColor: 'rgba(0, 0, 0, 0.4)',
                weight: 1,
                opacity: 0.7,
                color: '#fff',
                fillOpacity: 0.6
            };
        }

        // Añadiendo las áreas geográficas al mapa
        const geojson = L.geoJson(municipios_proyectos, {
            style: style,
        }).addTo(mapRef.current);

        // Funciones para resaltar y ajustar municipios seleccionados
        function resetMunicipiosStyle() {
            geojson.eachLayer(function (layer) {
                geojson.resetStyle(layer);
            });
        }

        function highlightMunicipio(selectedMunicipio) {
            let foundLayer = null;
            geojson.eachLayer(function (layer) {
                if (layer.feature.properties.NOMGEO === selectedMunicipio) {
                    foundLayer = layer;
                    layer.setStyle({
                        color: '#691B32',
                        fillColor: '#691B32',
                        fillOpacity: 0.2,
                        weight: 5
                    });
                }
            });

            if (foundLayer) {
                mapRef.current.fitBounds(foundLayer.getBounds());
            } else {
                console.warn(`Municipio ${selectedMunicipio} no encontrado.`);
            }
        }

        document.getElementById('selectorMunicipio').addEventListener('change', function () {
            const selectedMunicipio = this.value;
            resetMunicipiosStyle();
            highlightMunicipio(selectedMunicipio);
        });

        // Rellenar selector de municipios con opciones
        const selectorMunicipio = document.getElementById('selectorMunicipio');

        // Ordenar municipios alfabéticamente y añadir al selector
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

        // Obtener los datos de los proyectos y agregar los marcadores con íconos personalizados
        const fetchData = async () => {
            try {
                const response = await axios.get('/proyecto/');
                const projects = response.data.filter(project => project.estatus === 'Atendido');

                if (projects.length === 0) {
                    alert('No se encontraron proyectos con estatus "Atendido".');
                }

                markersRef.current.clearLayers(); // Limpiar los marcadores actuales

                projects.forEach(project => {
                    if (project.latitud && project.longitud) {
                        // Determinar el ícono basado en el sector del proyecto, o usar un ícono por defecto
                        const iconUrl = sectorIcons[project.sector] || `${iconBaseUrl}default.png`;

                        const customIcon = L.icon({
                            iconUrl: iconUrl,
                            iconSize: [60, 60], // Tamaño del icono
                            iconAnchor: [40, 40], // Punto donde el ícono se ancla en las coordenadas
                            popupAnchor: [0, -32] // Punto desde donde el popup se abre
                        });

                        const popupContent = `
                            <strong>${project.project_name}</strong><br>
                            Tipo de Proyecto: ${project.tipo_proyecto}<br>
                            Sector: ${project.sector}<br>
                            Municipio: ${project.municipioEnd}<br>
                            Inversión Estimada: ${project.inversion_estimada}<br>
                            Descripción: ${project.descripcion}<br>
                            Objetivos: ${project.objetivos}<br>
                            Metas: ${project.metas}<br>
                            Beneficiarios: ${project.beneficiarios}<br>
                            Región: ${project.region}<br>
                            Localidad: ${project.localidad}<br>
                            Barrio/Colonia/Ejido: ${project.barrio_colonia_ejido}<br>
                            Estatus: ${project.estatus}
                        `;

                        const marker = L.marker([project.latitud, project.longitud], { icon: customIcon })
                            .bindPopup(popupContent);

                        markersRef.current.addLayer(marker);
                    }
                });

                mapRef.current.addLayer(markersRef.current);
            } catch (error) {
                console.error('Error fetching project data:', error);
            }
        };

        fetchData();

        return () => {
            mapRef.current.remove();
        };
    }, []);

    // Filtrar marcadores por sector
    useEffect(() => {
        if (markersRef.current) {
            markersRef.current.clearLayers(); // Limpiar los marcadores actuales

            axios.get('/proyecto/').then(response => {
                const projects = response.data.filter(project => 
                    project.estatus === 'Atendido' && 
                    (selectedSector === '' || project.sector === selectedSector)
                );

                projects.forEach(project => {
                    if (project.latitud && project.longitud) {
                        const iconUrl = sectorIcons[project.sector] || `${iconBaseUrl}default.png`;

                        const customIcon = L.icon({
                            iconUrl: iconUrl,
                            iconSize: [60, 60],
                            iconAnchor: [40, 40],
                            popupAnchor: [0, -32]
                        });

                        const popupContent = `
                            <strong>${project.project_name}</strong><br>
                            Tipo de Proyecto: ${project.tipo_proyecto}<br>
                            Sector: ${project.sector}<br>
                            Municipio: ${project.municipioEnd}<br>
                            Inversión Estimada: ${project.inversion_estimada}<br>
                            Descripción: ${project.descripcion}<br>
                            Objetivos: ${project.objetivos}<br>
                            Metas: ${project.metas}<br>
                            Beneficiarios: ${project.beneficiarios}<br>
                            Región: ${project.region}<br>
                            Localidad: ${project.localidad}<br>
                            Barrio/Colonia/Ejido: ${project.barrio_colonia_ejido}<br>
                            Estatus: ${project.estatus}
                        `;

                        const marker = L.marker([project.latitud, project.longitud], { icon: customIcon })
                            .bindPopup(popupContent);

                        markersRef.current.addLayer(marker);
                    }
                });

                mapRef.current.addLayer(markersRef.current);
            }).catch(error => {
                console.error('Error fetching filtered project data:', error);
            });
        }
    }, [selectedSector]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
        setTimeout(() => mapRef.current.invalidateSize(), 300);
    };

    return (
        <section id='map'>
            <button
                id="toggleSidebar"
                onClick={toggleSidebar}
                className={isSidebarOpen ? 'open' : ''}
            >
                {isSidebarOpen ? 'Cerrar' : 'Abrir panel de información'}
            </button>
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
        </section>
    );
}

export default InteractiveMap;
