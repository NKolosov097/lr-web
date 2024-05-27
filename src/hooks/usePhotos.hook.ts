import { db } from "../database/db"
import { useAppDispatch } from "../redux/hooks"
import { photoActions } from "../redux/slices/photos"
import { IPhoto } from "../types/types"

export const usePhotos = () => {
    const dispatch = useAppDispatch()

    const addPhoto = (photo: IPhoto) => {
        dispatch(photoActions.addPhoto(photo))

        const addPhotoToDb = async () => {
            try {
                await db.photos.add({ ...photo })
            } catch (e) {
                console.error(e)
            }
        }

        addPhotoToDb()
    }

    const changePhotoInfo = <T extends keyof IPhoto>(payload: {
        id: string | number
        changes: Pick<IPhoto, T>
    }) => {
        dispatch(photoActions.changePhotoInfo(payload))

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

    const viewAllPhotos = () => {
        dispatch(photoActions.toViewAllPhotos())

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

    const deletePhoto = (id: string | number) => {
        dispatch(photoActions.deletePhoto(id))

        const deletePhotoInDb = async () => {
            try {
                await db.photos.where({ id }).delete()
            } catch (e) {
                console.error(e)
            }
        }

        deletePhotoInDb()
    }

    return { addPhoto, changePhotoInfo, viewAllPhotos, deletePhoto }
}
