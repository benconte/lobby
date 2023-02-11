import React, { useRef, useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';

// import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
const mapboxgl = require('!mapbox-gl');
mapboxgl.accessToken = 'pk.eyJ1IjoiYmVuY29udGUiLCJhIjoiY2t4a2Y5cnVhMTFrNDJycGVzaWw4emgxayJ9.qiTT02BbIBYRY4pAKWUcCg';

function Map({ coordinates }: { coordinates: any }) {
    const mapContainer = useRef(null);
    const map: any = useRef(null);
    const [lng, setLng] = useState(coordinates.longitude);
    const [lat, setLat] = useState(coordinates.latitude);
    const [zoom, setZoom] = useState(14);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });
    });

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    });
    return (
        <div>
            <h3 className="text-[var(--lightblue)] font-bold text-xl">Business Location</h3>
            <div ref={mapContainer} className="h-[300px] rounded-lg">
                <div className="absolute top-2 left-2 p-1 rounded bg-[rgba(0,0,0,.8)] z-10 text-gray-200 text-sm">
                    Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
                </div>

            </div>
        </div>
    )
}
// coordinates
export default Map

// npm i google-map-react