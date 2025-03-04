import { useEffect, useRef } from "react";
import "../styles/style.scss"

const MapComponent = ({ coordinates }) => {
    const mapRef = useRef(null);

    useEffect(() => {
        if (!window.google) return;

        const [lat, lng] = coordinates.split(",").map(Number);

        const map = new window.google.maps.Map(mapRef.current, {
            center: { lat, lng },
            zoom: 15,
        });

        new window.google.maps.Marker({
            position: { lat, lng },
            map,
        });
    }, [coordinates]);

    // Формуємо URL для відкриття в Google Maps або Apple Maps
    const openInMaps = () => {
        const [lat, lng] = coordinates.split(",");
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
        const appleMapsUrl = `maps://maps.apple.com/?q=${lat},${lng}`;

        if (navigator.platform.includes("iPhone") || navigator.platform.includes("Mac")) {
            window.open(appleMapsUrl, "_blank");
        } else {
            window.open(googleMapsUrl, "_blank");
        }
    };

    return (
        <div>
            <div ref={mapRef} className="google-map-component-map"/>
            <button className="google-map-component-open-map-button" onClick={openInMaps}>
                Відкрити в картах
            </button>
        </div>
    );
};

export default MapComponent;
