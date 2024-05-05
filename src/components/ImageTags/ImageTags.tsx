import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { photoActions, photosSelector } from "../../redux/slices/photos"
import { useFiles } from "../../context/FileContext"
import MarkerClusterGroup from "react-leaflet-cluster"
import { Marker, Popup, useMapEvents } from "react-leaflet"
import { Mark } from "../Mark/Mark"
import {
    activePhotoSelector,
    resetActivePhoto,
} from "../../redux/slices/activePhoto"
import { openDrawer } from "../../redux/slices/drawerPhoto."
import { clickType, setClickType } from "../../redux/slices/click"
import { EClickType } from "../../types/types"
import Title from "antd/es/typography/Title"
import styles from "./ImageTags.module.css"
import Paragraph from "antd/es/typography/Paragraph"

export const ImageTags = () => {
    const photos = useAppSelector(photosSelector)
    const id = useAppSelector(activePhotoSelector)
    const click = useAppSelector(clickType)
    const dispatch = useAppDispatch()
    const { images } = useFiles()

    useMapEvents({
        click(e) {
            if (id && click === EClickType.changeLocation) {
                const { lat, lng } = e.latlng

                dispatch(
                    photoActions.changePhotoInfo({
                        id: id,
                        changes: {
                            latitude: lat,
                            longitude: lng,
                        },
                    })
                )
                dispatch(openDrawer())
                dispatch(resetActivePhoto())
                dispatch(setClickType(EClickType.null))
            }
        },
    })

    return (
        <>
            <MarkerClusterGroup>
                {photos?.map((photo) => (
                    <Marker
                        key={photo?.id}
                        position={{
                            lat: photo.latitude,
                            lng: photo.longitude,
                        }}
                        icon={Mark()}
                        shadowPane={images[0]}
                        interactive
                    >
                        <Popup>
                            <Title
                                level={5}
                                ellipsis={{
                                    rows: 2,
                                    expandable: "collapsible",
                                    symbol: (expanded) =>
                                        expanded ? "скрыть" : "ещё",
                                }}
                                className={styles.popupTitle}
                            >
                                {photo.title || "Маркер"}
                            </Title>
                            <Paragraph
                                ellipsis={{
                                    rows: 2,
                                    expandable: "collapsible",
                                    symbol: (expanded) =>
                                        expanded ? "скрыть" : "ещё",
                                }}
                                className={styles.popupDesc}
                            >
                                {photo.description && photo.description}
                            </Paragraph>
                        </Popup>
                    </Marker>
                ))}
            </MarkerClusterGroup>
        </>
    )
}
