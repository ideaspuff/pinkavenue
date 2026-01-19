import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default Leaflet icons in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom Icons
const createColorIcon = (colorUrl: string) => new L.Icon({
    iconUrl: colorUrl,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const pinkIcon = createColorIcon('https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png'); // Closest to pink
const blueIcon = createColorIcon('https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png');
const grayIcon = createColorIcon('https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png');

const LOCATIONS = [
    {
        name: "PINK AVENUE JOYERÍA",
        coords: [16.863647, -99.885787] as [number, number],
        type: "main",
        address: "Av del Tanque esq. Montecarlo",
        icon: pinkIcon
    },
    {
        name: "The Home Depot",
        coords: [16.863532, -99.887000] as [number, number],
        type: "ref",
        address: "Referencia",
        icon: grayIcon
    },
    {
        name: "Diamante Leasing",
        coords: [16.8628, -99.8845] as [number, number], // Adjusted SE based on "Blue X" visual relative to Pink
        type: "ref",
        address: "Referencia",
        icon: blueIcon
    }
];



// Component to handle map resize
const MapResizer = () => {
    const map = useMap();
    useEffect(() => {
        map.invalidateSize();
    }, [map]);
    return null;
};

const CustomMap: React.FC = () => {
    return (
        <div className="h-full w-full relative z-0">
            <MapContainer
                center={[16.863647, -99.885787]}
                zoom={17}
                scrollWheelZoom={false}
                className="h-full w-full"
                style={{ height: '100%', width: '100%', background: '#ffffff' }}
            >
                <MapResizer />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />

                {LOCATIONS.map((loc, idx) => (
                    <Marker
                        key={idx}
                        position={loc.coords}
                        icon={loc.icon}
                    >
                        <Popup className="font-sans">
                            <div className="text-center">
                                <strong className={`block mb-1 ${loc.type === 'main' ? 'text-brand-main font-bold' : 'text-gray-600'}`}>
                                    {loc.name}
                                </strong>
                                <span className="text-xs text-gray-500">{loc.address}</span>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default CustomMap;
