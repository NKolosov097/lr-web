import { db } from "../database/db"
import { useAppDispatch } from "../redux/hooks"
import { photoActions } from "../redux/slices/photos"
import { IPhoto } from "../types/types"

// usePhotos - хук (функция), внутри которой описываем все функции для работы
// с фотографиями:
//  1. Добавление фотографии в Redux-toolkit и indexDB
//  2. Редактирование информации у конкретной фотографии (изменение названия,
//     описания, местоположение на карте) в Redux-toolkit и indexDB
//  3. Вспомогательная функция для просмотра всех фотографий
//     в Redux-toolkit и indexDB
//  4. Удаление фотографии из Redux-toolkit и indexDB

// Создаем и экспортируем хук (функцию) usePhotos для дальнейшего использования
export const usePhotos = () => {
    // Вызываем функцию из Redux-toolkit, которая возвращает функцию
    // для работы со state manager (Redux-toolkit)
    const dispatch = useAppDispatch()

    // Инициализируем и описываем функцию для добавления фотографий в
    // Redux-toolkit и в indexDB
    const addPhoto = (photo: IPhoto) => {
        // Добавление фотографии в Redux-toolkit
        dispatch(photoActions.addPhoto(photo))

        // Добавление фотографии в таблицу фотографий в базе данных
        const addPhotoToDb = async () => {
            try {
                await db.photos.add({ ...photo })
            } catch (e) {
                console.error(e)
            }
        }

        addPhotoToDb()
    }

    // Инициализируем и описываем функцию для редактирования информации
    // у конкретной фотографии информацию Redux-toolkit и в indexDB
    const changePhotoInfo = <T extends keyof IPhoto>(payload: {
        id: string | number
        changes: Pick<IPhoto, T>
    }) => {
        // Редактирование информации у конкретной
        // фотографии информацию в Redux-toolkit
        dispatch(photoActions.changePhotoInfo(payload))

        // Редактирование информации у конкретной
        // фотографии информацию в indexDB
        const changePhotoInfoIntoDb = async () => {
            try {
                await db.photos
                    .where({ id: payload.id })
                    .modify(payload.changes)
            } catch (e) {
                console.error(e)
            }
        }

        changePhotoInfoIntoDb()
    }

    // Инициализируем и описываем вспомогательную функцию
    // для просмотра всех фотографий в Redux-toolkit и в indexDB
    const viewAllPhotos = () => {
        // Просмотра всех фотографий в Redux-toolkit
        dispatch(photoActions.toViewAllPhotos())

        // Просмотра всех фотографий в indexDB
        const viewAllPhotosInDb = async () => {
            try {
                await db.photos.toArray().then((res) => {
                    res.map((photo) =>
                        db.photos.update(photo.id, {
                            ...photo,
                            viewed: true,
                        })
                    )
                })
            } catch (e) {
                console.error(e)
            }
        }

        viewAllPhotosInDb()
    }

    // Инициализируем и описываем функцию для удаления
    // конкретной фотографии в Redux-toolkit и в indexDB
    const deletePhoto = (id: string | number) => {
        // Удаление конкретной фотографии из Redux-toolkit
        dispatch(photoActions.deletePhoto(id))

        // Удаление конкретной фотографии из indexDB
        const deletePhotoInDb = async () => {
            try {
                await db.photos.where({ id }).delete()
            } catch (e) {
                console.error(e)
            }
        }

        deletePhotoInDb()
    }

    // Возвращаем все описанные выше функции
    // в одном объекте для удобного использования
    return { addPhoto, changePhotoInfo, viewAllPhotos, deletePhoto }
}
