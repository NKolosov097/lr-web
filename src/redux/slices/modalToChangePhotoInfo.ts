import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { IPhoto } from "../../types/types"

interface IInitState {
    isOpen: boolean
    title: string
    description: string
}

const initialState: IInitState = {
    isOpen: false,
    title: "",
    description: "",
}

export const modalToChangePhotoInfoSlice = createSlice({
    name: "modalToChangePhotoInfo",
    initialState,
    reducers: {
        openModal: (state, payload: PayloadAction<IPhoto>) => {
            state.isOpen = true
            state.title = payload.payload.title || ""
            state.description = payload.payload.description || ""
        },
        closeModal: (state) => {
            state.isOpen = false
        },
        changeTitle: (state, payload: PayloadAction<string>) => {
            state.title = payload.payload
        },

        changeDescription: (state, payload: PayloadAction<string>) => {
            state.description = payload.payload
        },
        resetModal: (state) => {
            state.isOpen = false
            state.title = ""
            state.description = ""
        },
    },
})

export const {
    openModal,
    closeModal,
    changeTitle,
    changeDescription,
    resetModal,
} = modalToChangePhotoInfoSlice.actions
export const { reducer: modalToChangePhotoInfoReducer } =
    modalToChangePhotoInfoSlice
