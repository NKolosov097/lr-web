import { db } from "../../database/db"
import { useAppDispatch } from "../../redux/hooks"
import { photoActions } from "../../redux/slices/photos"
import { IPhoto } from "../../types/types"

export const useAddPhoto = () => {
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

    return addPhoto
}
