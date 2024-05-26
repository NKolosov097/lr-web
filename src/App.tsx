import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer } from "react-leaflet"
import { RouteDesigner } from "./components/RouteDesigner"
import { Toolbar } from "./components/Toolbar"
import { ImageLibrary } from "./components/ImageLibrary/ImageLibrary"
import { ImageTags } from "./components/ImageTags/ImageTags"
import { LocationMarker } from "./components/LocationMarker/LocationMarker"
import { Utils } from "./components/Utils/Utils"
import { Helmet } from "react-helmet"
import { ModalChangePhotoInfo } from "./components/ModalChangePhotoInfo/ModalChangePhotoInfo"
import { db } from "./database/db"
import { useEffect } from "react"
import { EStatus, IStatus } from "./types/types"
import { useAppDispatch } from "./redux/hooks"
import { photoActions } from "./redux/slices/photos"

function App() {
    const dispatch = useAppDispatch()
    const initStatuses: IStatus[] = [
        {
            id: "1",
            title: EStatus.failed,
            description: "The status that shows the request failed",
        },
        {
            id: "2",
            title: EStatus.pending,
            description: "The status that shows the request pending",
        },
        {
            id: "3",
            title: EStatus.success,
            description: "The status that shows the request success",
        },
    ]

    useEffect(() => {
        const openDbConnection = async () => {
            await db.open().then((res) => {
                res.table("statuses")
                    .toArray()
                    .then((r) => {
                        if (r?.length === 0) {
                            res.table("statuses").bulkAdd(initStatuses)
                        }
                    })

                res.table("photos")
                    .toArray()
                    .then((r) => {
                        if (r?.length > 0) {
                            dispatch(photoActions.initPhotos(r))
                        }
                    })
            })
        }

        openDbConnection()
    }, [])

    return (
        <>
            <ModalChangePhotoInfo />
            <ImageLibrary />
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
            </MapContainer>
            <Toolbar />
        </>
    )
}

export default App
