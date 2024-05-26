import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import { IPhoto } from "../../types/types"
import { RootState } from "../rootReducer"

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
        addPhoto: photoAdapter.addOne,
        changePhotoInfo: photoAdapter.updateOne,
        deletePhoto: photoAdapter.removeOne,
        toViewAllPhotos: (state) => {
            const viewAllPhotos = () =>
                Object.values(state.entities).map((photo) => ({
                    ...photo,
                    viewed: true,
                }))

            photoAdapter.upsertMany(state, viewAllPhotos())
        },
    },
})

export const { actions: photoActions } = photosSlice

export const { selectAll: photosSelector, selectById: getPhotoById } =
    photoAdapter.getSelectors((state: RootState) => state[photosSlice.name])
