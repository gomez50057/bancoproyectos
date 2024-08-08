import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './InteractiveMap.css';
import { municipios_proyectos } from './municipios'; // Asegúrate de que esta ruta es correcta

const InteractiveMap = () => {
    useEffect(() => {
        // Inicializa el mapa
        const map = L.map('map', {
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
        }).addTo(map);

        map.attributionControl.setPrefix(''); // Elimina cualquier texto de atribución

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
        }).addTo(map);

        // Funciones para resaltar y ajustar municipios seleccionados
        function resetMunicipiosStyle() {
            geojson.eachLayer(function (layer) {
                geojson.resetStyle(layer);
            });
        }

        function highlightMunicipio(selectedMunicipio) {
            var foundLayer = null;
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
                map.fitBounds(foundLayer.getBounds());
            }
        }

        document.getElementById('selectorMunicipio').addEventListener('change', function () {
            var selectedMunicipio = this.value;
            resetMunicipiosStyle();
            highlightMunicipio(selectedMunicipio);
        });

        // Rellenar selector de municipios con opciones
        var selectorMunicipio = document.getElementById('selectorMunicipio');

        // Ordenar municipios alfabéticamente y añadir al selector
        municipios_proyectos.features
            .map(function (municipio) {
                return municipio.properties.NOMGEO;
            })
            .sort()
            .forEach(function (municipio) {
                var option = document.createElement('option');
                option.value = municipio;
                option.textContent = municipio;
                selectorMunicipio.appendChild(option);
            });

        // Función para manejar la barra lateral
        document.getElementById('toggleSidebar').addEventListener('click', function () {
            var sidebar = document.getElementById('sidebar');
            var mapElement = document.getElementById('map');
            var isOpen = sidebar.style.left === '0px';

            if (isOpen) {
                sidebar.style.left = '-300px'; // Esconde la barra lateral
                mapElement.style.left = '0'; // Extiende el mapa
                this.textContent = 'Abrir panel de información'; // Cambia el texto del botón
                this.style.left = '10px'; // Mueve el botón hacia la izquierda
            } else {
                sidebar.style.left = '0px'; // Muestra la barra lateral
                mapElement.style.left = '300px'; // Restablece el mapa
                this.textContent = 'Cerrar'; // Cambia el texto del botón
                this.style.left = '310px'; // Mueve el botón junto con la barra lateral
            }

            // Ajusta el tamaño del mapa después de la transición
            setTimeout(function () {
                map.invalidateSize();
            }, 300);
        });

        // Inicializa el estado del sidebar y botón
        const sidebar = document.getElementById('sidebar');
        const mapElement = document.getElementById('map');
        const toggleButton = document.getElementById('toggleSidebar');

        sidebar.style.left = '0'; // Barra lateral visible
        mapElement.style.left = '0'; // Espacio para la barra lateral
        toggleButton.style.left = '310px'; // Botón se mueve con la barra lateral

        return () => {
            map.remove();
        };
    }, []);

    return (
        <section id='map'>
            <button id="toggleSidebar">Cerrar</button>
            <div id="sidebar" >
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
