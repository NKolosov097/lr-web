import { IPhoto } from "../../../types/types"
import Title from "antd/es/typography/Title"
import styles from "../ImageTags.module.css"
import Paragraph from "antd/es/typography/Paragraph"
import { Mark } from "../../Mark/Mark"
import { useFiles } from "../../../context/FileContext"
import { Popup, Marker as MarkerLeaflet } from "react-leaflet"
import { useMemo, useRef } from "react"
import { useAppDispatch } from "../../../redux/hooks"
import { photoActions } from "../../../redux/slices/photos"

interface IMarkerProps {
    photo: IPhoto
}

export const Marker = ({ photo }: IMarkerProps) => {
    const { images } = useFiles()
    const markerRef = useRef(null)
    const dispatch = useAppDispatch()

    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    const { lat, lng } = marker.getLatLng()

                    dispatch(
                        photoActions.changePhotoInfo({
                            id: photo?.id,
                            changes: {
                                latitude: lat,
                                longitude: lng,
                            },
                        })
                    )
                }
            },
        }),
        []
    )

    return (
        <MarkerLeaflet
            key={photo?.id}
            position={{
                lat: photo.latitude,
                lng: photo.longitude,
            }}
            icon={Mark()}
            shadowPane={images[0]}
            interactive
            draggable
            eventHandlers={eventHandlers}
            ref={markerRef}
        >
            <Popup>
                <Title
                    level={5}
                    ellipsis={{
                        rows: 2,
                        expandable: "collapsible",
                        symbol: (expanded) => (expanded ? "скрыть" : "ещё"),
                    }}
                    className={styles.popupTitle}
                >
                    {photo.title || "Маркер"}
                </Title>
                <Paragraph
                    ellipsis={{
                        rows: 2,
                        expandable: "collapsible",
                        symbol: (expanded) => (expanded ? "скрыть" : "ещё"),
                    }}
                    className={styles.popupDesc}
                >
                    {photo.description && photo.description}
                </Paragraph>
            </Popup>
        </MarkerLeaflet>
    )
}
