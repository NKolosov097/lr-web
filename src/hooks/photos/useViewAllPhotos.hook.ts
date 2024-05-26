import { db } from "../../database/db"
import { useAppDispatch } from "../../redux/hooks"
import { photoActions } from "../../redux/slices/photos"

export const useViewAllPhotos = () => {
    const dispatch = useAppDispatch()

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

    return viewAllPhotos
}
