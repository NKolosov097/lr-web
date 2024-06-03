import { App, Button, Upload } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import exif from "exifr"
import styles from "./UploadButton.module.css"
import { v4 as uuidv4 } from "uuid"
import { useAppDispatch } from "../../redux/hooks"
import { openModal } from "../../redux/slices/modalToChangePhotoInfo"

import type { UploadProps } from "antd/lib/upload/interface"
import { useFiles } from "../../context/FileContext"
import { EStatus, IPhoto } from "../../types/types"
import { setActivePhoto } from "../../redux/slices/activePhoto"
import { message } from "antd/lib"
import { usePhotos } from "../../hooks/usePhotos.hook"

export const UploadButton = () => {
    const { notification } = App.useApp()
    const { addImage } = useFiles()
    const dispatch = useAppDispatch()
    // Берем функцию для добавления фотографии
    const { addPhoto } = usePhotos()

    // Описываем функцию для загрузки фотографии с устройства в приложение
    const onFileChange: UploadProps<File>["beforeUpload"] = async (photo) => {
        const data = await exif.gps(photo)
        if (!data || !data.latitude || !data.longitude) {
            notification.warning({
                message: "В загруженной фотографии нет координат",
            })
            return false
        }
        const id = uuidv4()

        const fileReader = new FileReader()
        fileReader.onload = (e) => {
            if (e.target && typeof e.target.result === "string") {
                addImage(id, e.target.result)
            }
        }
        fileReader.readAsDataURL(photo)

        // формируем объект, который запишем в redux-toolkit в photos и в indexDB
        const photoObj: IPhoto = {
            id: id,
            title: "",
            description: "",
            latitude: data.latitude,
            longitude: data.longitude,
            status: EStatus.success,
            viewed: false,
            altitude: 0,
            accuracy: null,
            altitudeAccuracy: null,
            heading: null,
            speed: null,
            timeStamp: Date.now(),
        }

        // Добавляем фотографию и все данные о ней в хранилища
        addPhoto(photoObj)
        dispatch(setActivePhoto(id))
        dispatch(openModal(photoObj))

        // Выводим сообщение об успешном завершении операции по добавлению фотографии в приложение
        message.success({ content: "Фотография успешно добавлена" })
    }

    return (
        <Upload<File>
            className={styles.uploadBtn}
            beforeUpload={onFileChange}
            fileList={[]}
        >
            <Button icon={<UploadOutlined />}>Загрузить фотографию</Button>
        </Upload>
    )
}
