import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../rootReducer'

interface IInitState {
    id: string | number
}

const initialState: IInitState = {
    id: '',
}

export const activePhotoSlice = createSlice({
    name: 'activePhoto',
    initialState,
    reducers: {
        getActivePhoto: (state) => {
            state.id
        },
        setActivePhoto: (state, payload: PayloadAction<string | number>) => {
            state.id = payload.payload
        },
        resetActivePhoto: (state) => {
            state.id = ''
        },
    },
})

export const { getActivePhoto, setActivePhoto, resetActivePhoto } =
    activePhotoSlice.actions
export const { reducer: activePhotoReducer } = activePhotoSlice
export const activePhotoSelector = (state: RootState) => state.activePhoto.id
