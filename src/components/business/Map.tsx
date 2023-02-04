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
    const [zoom, setZoom] = useState(16);

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
            <div className="text-base text-zinc-600 mt-2">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div ref={mapContainer} className="h-[300px] rounded-lg" />
        </div>
    )
}
// coordinates
export default Map

// npm i google-map-react