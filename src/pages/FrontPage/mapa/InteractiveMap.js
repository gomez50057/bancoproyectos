import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './InteractiveMap.css';
import { municipios_proyectos } from './municipios'; // Asegúrate de que esta ruta es correcta

const InteractiveMap = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const mapRef = useRef(null);

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
                        color: 'yellow',
                        fillColor: 'yellow',
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

        return () => {
            mapRef.current.remove();
        };
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
        setTimeout(() => mapRef.current.invalidateSize(), 300);
    };

    return (
        <section id='map'>
            <button id="toggleSidebar" onClick={toggleSidebar}>
                {isSidebarOpen ? 'Cerrar' : 'Abrir panel de información'}
            </button>
            <div id="sidebar" className={isSidebarOpen ? 'open' : ''}>
                <h1 className="sidebar-title">Proyectos</h1>
                <label htmlFor="selectorMunicipio">Selecciona por municipio:</label>
                <select id="selectorMunicipio">
                    <option value="">-- Selecciona por municipio --</option>
                </select>
            </div>
        </section>
    );
}

export default InteractiveMap;
