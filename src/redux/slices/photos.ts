import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import { IPhoto } from "../../types/types"
import { RootState } from "../rootReducer"
import { db } from "../../database/db"

const initialState: IPhoto[] = []

const photoAdapter = createEntityAdapter({
    selectId: (polyline: IPhoto) => polyline.id,
    sortComparer: (a, b) => a.timeStamp - b.timeStamp,
})

export const photosSlice = createSlice({
    name: "photos",
    initialState: photoAdapter.getInitialState(initialState),
    reducers: {
        initPhotos: photoAdapter.addMany,
        addPhoto: (state, { payload }) => {
            const addPhotoToDb = async () => {
                await db.photos.add(payload)
            }

            addPhotoToDb()

            photoAdapter.addOne(state, payload)
        },
        changePhotoInfo: (state, { payload }) => {
            const changePhotoInfoIntoDb = async () => {
                await db.photos
                    .where({ id: payload.id })
                    .modify(payload.changes)
            }

            changePhotoInfoIntoDb()

            photoAdapter.updateOne(state, payload)
        },
        deletePhoto: (state, action) => {
            const deletePhotoFromDb = async () => {
                await db.photos.where({ id: action.payload }).delete()
            }

            deletePhotoFromDb()

            photoAdapter.removeOne(state, action)
        },
        toViewAllPhotos: (state) => {
            const viewAllPhotos = () =>
                Object.values(state.entities).map((photo) => ({
                    ...photo,
                    viewed: true,
                }))

            const viewAllPhotosInDb = async () => {
                db.photos.toArray().then((res) => {
                    res.map((photo) =>
                        db.photos.update(photo.id, {
                            ...photo,
                            viewed: true,
                        })
                    )
                })
            }

            viewAllPhotosInDb()

            photoAdapter.upsertMany(state, viewAllPhotos())
        },
    },
})

export const { actions: photoActions } = photosSlice

export const { selectAll: photosSelector, selectById: getPhotoById } =
    photoAdapter.getSelectors((state: RootState) => state[photosSlice.name])
