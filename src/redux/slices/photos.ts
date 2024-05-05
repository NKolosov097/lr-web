import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import { IPhoto } from "../../types/types"
import { RootState } from "../rootReducer"

const initialState: IPhoto[] = []

const polylineAdapter = createEntityAdapter({
    selectId: (polyline: IPhoto) => polyline.id,
    sortComparer: (a, b) => a.timeStamp - b.timeStamp,
})

export const photosSlice = createSlice({
    name: "photos",
    initialState: polylineAdapter.getInitialState(initialState),
    reducers: {
        addPhoto: polylineAdapter.addOne,
        changePhotoInfo: polylineAdapter.updateOne,
        deletePhoto: polylineAdapter.removeOne,
        toViewAllPhotos: polylineAdapter.upsertMany,
    },
})

export const { actions: photoActions } = photosSlice

export const { selectAll: photosSelector, selectById: getPhotoById } =
    polylineAdapter.getSelectors((state: RootState) => state[photosSlice.name])
