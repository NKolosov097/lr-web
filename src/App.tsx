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
    // Вызываем функцию из Redux-toolkit, которая возвращает функцию
    // для работы со state manager (Redux-toolkit)
    const dispatch = useAppDispatch()

    // Начальное состояние для таблицы статусов
    // в Redux-toolkit и в indexDB
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

    // При инициализации приложения добавляем словарь статусов
    // в Redux-toolkit и в indexDB
    useEffect(() => {
        // Функция, позволяющая открыть соединение с базой данных MapAppDb
        const openDbConnection = async () => {
            await db.open().then((res) => {
                // Обращаемся к таблице статусов
                res.table("statuses")
                    .toArray()
                    .then((r) => {
                        // Если в indexDB нет словаря статусов,
                        // тогда записываем его
                        if (r?.length === 0) {
                            res.table("statuses").bulkAdd(initStatuses)
                        }
                    })

                // Обращаемся к таблице фотографий
                res.table("photos")
                    .toArray()
                    .then((r) => {
                        // Если в indexDB есть фотографии,
                        // тогда записываем их в redux-toolkit
                        // для дальнейшей работы с ними внутри приложения
                        if (r?.length > 0) {
                            dispatch(photoActions.initPhotos(r))
                        }
                    })
            })
        }

        // Открываем соединение с базой данных MapAppDb
        openDbConnection()

        // При закрытии приложения мы закрываем соединение с indexDB
        return () => {
            db.close()
        }
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
