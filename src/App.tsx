import React from "react"
import "leaflet/dist/leaflet.css"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import { Icon } from "leaflet"
import MarkerClusterGroup from "react-leaflet-cluster"

function App() {
    // markers
    const markers = [
        {
            geocode: [55.86, 37.3522],
            popup: "marker 1",
        },
        {
            geocode: [55.85, 37.3522],
            popup: "marker 2",
        },
        {
            geocode: [55.865, 37.24],
            popup: "marker 3",
        },
    ]

    const customIcon = new Icon({
        iconUrl: require("./assets/icons/marker-icon.png"),
        iconSize: [38, 38],
        shadowUrl:
            "https://mykaleidoscope.ru/x/uploads/posts/2022-09/1663417330_8-mykaleidoscope-ru-p-zamki-belgii-krasivo-8.jpg",
        shadowSize: [12, 12],
    })

    return (
        <MapContainer center={[55, 37]} zoom={13}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MarkerClusterGroup>
                {markers?.map((marker) => (
                    <Marker
                        key={marker?.popup}
                        position={{
                            lat: marker.geocode[0],
                            lng: marker.geocode[1],
                        }}
                        icon={customIcon}
                        title={marker.popup}
                    >
                        <Popup>{marker.popup}</Popup>
                    </Marker>
                ))}
            </MarkerClusterGroup>
        </MapContainer>
    )
}

export default App
