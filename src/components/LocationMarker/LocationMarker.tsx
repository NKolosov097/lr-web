import { useState } from "react"
import { Marker, Popup, useMapEvents } from "react-leaflet"
import { Mark } from "../Mark/Mark"
import { notification } from "antd/lib"

export const LocationMarker = () => {
    const [position, setPosition] = useState<{
        lat: number
        lng: number
    } | null>(null)
    const map = useMapEvents({
        keydown(e) {
            if (e.originalEvent.key === "Home") {
                map.locate()
            }
        },
        locationfound(e) {
            const { lat, lng } = e.latlng

            setPosition({ lat, lng })
            map.flyTo(e.latlng, map.getZoom())
        },
        locationerror() {
            notification.warning({
                message: "Не удалось обнаружить местоположение",
            })
        },
    })

    return position === null ? null : (
        <Marker position={position} icon={Mark()}>
            <Popup>Вы находитесь здесь</Popup>
        </Marker>
    )
}
