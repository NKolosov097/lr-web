import React from "react"
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer } from "react-leaflet"
import { RouteDesigner } from "./components/RouteDesigner"
import { Toolbar } from "./components/Toolbar"
import { ImageLibrary } from "./components/ImageLibrary/ImageLibrary"
import { ImageTags } from "./components/ImageTags/ImageTags"
import { LocationMarker } from "./components/LocationMarker/LocationMarker"
import { Utils } from "./components/Utils/Utils"
import { Helmet } from "react-helmet"

function App() {
    return (
        <MapContainer
            center={[55.7522, 37.6156]}
            zoom={13}
            doubleClickZoom={false}
        >
            <Helmet title="Map App" />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
            <Utils />
            <ImageTags />
            <RouteDesigner />
            <ImageLibrary />
            <Toolbar />
        </MapContainer>
    )
}

export default App
