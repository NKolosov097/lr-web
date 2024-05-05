import { createSelector } from '@reduxjs/toolkit'
import { RootState } from './rootReducer'

export const drawerSelector = createSelector(
    (state: RootState) => state.drawerPhoto.isOpen,
    (isOpen) => isOpen
)

export const activePhotoSelector = createSelector(
    (state: RootState) => state.activePhoto,
    (photo) => photo.id
)
