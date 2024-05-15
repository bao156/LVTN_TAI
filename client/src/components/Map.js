import React, { useEffect, useState } from 'react'
import { apiMapGeo } from '../services'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'


const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
const Map = (address = '', zoom = 12) => {
    const [center, setCenter] = useState([])
    useEffect(() => {
        const fecthCenter = async () => {
            const response = await apiMapGeo(address)
            if (response.status === 200 && response.data.features?.length > 0)
                setCenter([
                    response.data.features[0]?.geometry?.coodinates[1],
                    response.data.features[0]?.geometry?.coodinates[0],

                ])
            else {
                window.navigator.geolocation.getCurrentPosition((position) => {
                    setCenter([position.coords.latitude, position.coords.longitude])
                })
            }
        }
        fecthCenter()
    }, [address])
    console.log(center)

    return (
        <div className='w-full h-[300px]'>
            {center && center.length > 0(
                <MapContainer
                    center={center}
                    zoom={zoom}
                    className='w-full h-full'
                >
                    <TileLayer url={url} attribution={attribution}>
                        <Marker position={center}>
                            <Popup>{address}</Popup>
                        </Marker>
                    </TileLayer>
                </MapContainer>
            )}
        </div>
    )
}

export default Map