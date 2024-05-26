export enum EStatus {
    failed = "failed",
    pending = "pending",
    success = "success",
}

export interface IStatus {
    id: string
    title: EStatus
    description?: string
}

export interface IPhoto {
    id: number | string
    title: string | undefined
    description: string | undefined
    status: EStatus
    viewed: boolean
    latitude: number // Широта
    longitude: number // Долгота
    altitude: number | undefined // Высота
    accuracy: number | null // Точность (погрешность координат?)
    altitudeAccuracy: number | null // Точность определения высоты (погрешность высоты?)
    heading: number | null // Заголовок / курс / часть света (?)
    speed: number | null // Скорость (?)
    timeStamp: number // Дата создания объекта данных
}

export interface IImages {
    id: string
    fileSrc: string
}

export interface IModalChangePhotoInfo {
    isOpen: boolean
    title: string | undefined
    description: string | undefined
    props: IPhoto
}

export enum EClickType {
    null = "null",
    addPolyline = "addPolyline",
    changeLocation = "changeLocation",
}
