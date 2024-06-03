import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import { IPhoto } from "../../types/types"
import { RootState } from "../rootReducer"

// Описываем начальное состояние фотографий,
// которое будет у нашего приложения при запуске
const initialState: IPhoto[] = []

// Функция, которая генерирует набор готовых reducers
// (функций для работы с Redux-toolkit) для выполнения операций CRUD
// (C - Create; R - Read; U - Update; D - Delete) над структурой состояния
const photoAdapter = createEntityAdapter({
    // Говорим Redux-toolkit, какой у нас будет уникальный ключ,
    // чтобы обращаться к конкретной фотографии (к конкретному полю)
    // для работы с ней
    selectId: (photo: IPhoto) => photo.id,
    // Сортируем наши данные по полю timeStamp - по дате загрузки
    // фотографии в наше приложение
    sortComparer: (a, b) => a.timeStamp - b.timeStamp,
})

// Инициализируем и описываем функцию для работы со
// state (состоянием) фотографий
export const photosSlice = createSlice({
    // Называем наш state как "photos"
    name: "photos",
    // Инициализируем наш state описанным раннее массивом,
    // который записан в переменную initialState
    initialState: photoAdapter.getInitialState(initialState),
    // Объявляем поле reducers, внутри которого будем
    // описывать все наши редьюсеры - функции, через которые
    // мы будем работать с Redux-toolkit, а именно с фотографиями
    reducers: {
        // Функция (reducer), позволяющая обновить весь state photos
        initPhotos: photoAdapter.addMany,

        // Функция (reducer), позволяющая добавить
        // фотографию в state photos
        addPhoto: photoAdapter.addOne,

        // Функция (reducer), позволяющая редактировать информацию
        // у конкретной фотографии в state photos
        // (изменение названия, описания, местоположение на карте)
        changePhotoInfo: photoAdapter.updateOne,

        // Функция (reducer), позволяющая удалить
        // фотографию из state photos
        deletePhoto: photoAdapter.removeOne,

        // Вспомогательная функция (reducer), позволяющая
        // просмотреть все фотографии из state photos
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
