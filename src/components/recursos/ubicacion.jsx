import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import "bootstrap/dist/css/bootstrap.min.css";

const Ubicacion = () => {
    const [ubicacion, setUbicacion] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (posicion) => {
            setUbicacion({
                lat: posicion.coords.latitude,
                lon: posicion.coords.longitude,
            });
            },
            (error) => {
            console.error('Error al obtener la ubicación:', error);
            }
        );
        }
    }, []);

    if (!ubicacion) {
        return <div>Cargando mapa...</div>;
    }

    return (
        <div className="container mt-0">
        <h2>Ubicación</h2> {/* Título */}
        <div className="row">
            <div className="col-12" style={{ height: '400px' }}>
            <LoadScript googleMapsApiKey="AIzaSyDktv1rMm6g_U6ShynYlKVhENklylQ671k">
                <GoogleMap
                mapContainerStyle={{
                    width: '100%',
                    height: '100%',
                }}
                center={{ lat: ubicacion.lat, lng: ubicacion.lon }}
                zoom={13}
                >
                <Marker position={{ lat: ubicacion.lat, lng: ubicacion.lon }} />
                </GoogleMap>
            </LoadScript>
            </div>
        </div>
        </div>
    );
    };

export default Ubicacion;
