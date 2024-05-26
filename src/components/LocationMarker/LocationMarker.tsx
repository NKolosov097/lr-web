import { useMemo, useRef, useState } from "react"
import { Marker, Popup, useMapEvents } from "react-leaflet"
import { Mark } from "../Mark/Mark"
import { notification } from "antd/lib"

export const LocationMarker = () => {
    const [position, setPosition] = useState<{
        lat: number
        lng: number
    } | null>(null)

    const markerRef = useRef(null)

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

    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    const { lat, lng } = marker.getLatLng()

                    setPosition({ lat, lng })
                }
            },
        }),
        []
    )

    return position === null ? null : (
        <Marker
            position={position}
            icon={Mark()}
            draggable
            eventHandlers={eventHandlers}
            ref={markerRef}
        >
            <Popup>Вы находитесь здесь</Popup>
        </Marker>
    )
}
