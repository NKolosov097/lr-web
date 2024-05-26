import { db } from "../../database/db"
import { useAppDispatch } from "../../redux/hooks"
import { photoActions } from "../../redux/slices/photos"

export const useDeletePhoto = () => {
    const dispatch = useAppDispatch()

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

    return deletePhoto
}
