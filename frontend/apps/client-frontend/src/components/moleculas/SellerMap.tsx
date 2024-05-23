import React, { useState, useEffect } from "react";
import {GoogleMap, useLoadScript, Marker, Libraries} from "@react-google-maps/api";

const libraries: Libraries = ["places"];

const SellerMap = ({ seller }:{seller: any}) => {
    const [mapCenter, setMapCenter] = useState(null);
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        libraries: libraries,
    });

    useEffect(() => {
        if (isLoaded && seller) {
            const address = `${seller.addressLine1}, ${seller.city}, ${seller.state}, ${seller.country}`;
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ address }, (results, status) => {
                if (status === "OK" && results && results.length > 0) {
                    const { lat, lng } = results[0].geometry.location;
                    // @ts-ignore
                    setMapCenter({ lat: lat(), lng: lng() });
                } else {
                    console.error("Geocode was not successful for the following reason:", status);
                }
            });
        }
    }, [isLoaded, seller]);

    if (!isLoaded) return <div>Loading....</div>;

    return (
        <div style={{ width: "100%", height: "400px" }}>
            <GoogleMap
                zoom={mapCenter ? 12 : 2}
                center={mapCenter || { lat: 0, lng: 0 }}
                mapContainerStyle={{ width: "100%", height: "100%" }}
            >
                {mapCenter && <Marker position={mapCenter} />}
            </GoogleMap>
        </div>
    );
};

export default SellerMap;
