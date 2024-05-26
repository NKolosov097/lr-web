import { db } from "../../database/db"
import { useAppDispatch } from "../../redux/hooks"
import { photoActions } from "../../redux/slices/photos"
import { IPhoto } from "../../types/types"

export const useChangePhotoInfo = () => {
    const dispatch = useAppDispatch()

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

    return changePhotoInfo
}
