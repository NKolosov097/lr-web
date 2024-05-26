import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { photoActions, photosSelector } from "../../redux/slices/photos"
import MarkerClusterGroup from "react-leaflet-cluster"
import { useMapEvents } from "react-leaflet"
import {
    activePhotoSelector,
    resetActivePhoto,
} from "../../redux/slices/activePhoto"
import { openDrawer } from "../../redux/slices/drawerPhoto."
import { clickType, setClickType } from "../../redux/slices/click"
import { EClickType } from "../../types/types"
import { Marker } from "./Marker/Marker"

export const ImageTags = () => {
    const photos = useAppSelector(photosSelector)
    const id = useAppSelector(activePhotoSelector)
    const click = useAppSelector(clickType)
    const dispatch = useAppDispatch()

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
                    <Marker key={photo?.id} photo={photo} />
                ))}
            </MarkerClusterGroup>
        </>
    )
}
