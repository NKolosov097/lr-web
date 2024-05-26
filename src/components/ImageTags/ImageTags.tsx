import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { photosSelector } from "../../redux/slices/photos"
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
import { useChangePhotoInfo } from "../../hooks/photos/useChangePhotoInfo.hook"

export const ImageTags = () => {
    const photos = useAppSelector(photosSelector)
    const id = useAppSelector(activePhotoSelector)
    const click = useAppSelector(clickType)
    const dispatch = useAppDispatch()
    const changePhotoInfo = useChangePhotoInfo()

    useMapEvents({
        click(e) {
            if (id && click === EClickType.changeLocation) {
                const { lat, lng } = e.latlng

                changePhotoInfo({
                    id: id,
                    changes: {
                        latitude: lat,
                        longitude: lng,
                    },
                })
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
