export interface Polyline {
    latitude: number // Широта
    longitude: number // Долгота
    altitude: number | undefined // Высота
    accuracy: number | null // Точность (погрешность координат?)
    altitudeAccuracy: number | null // Точность определения высоты (погрешность высоты?)
    heading: number | null // Заголовок / курс / часть света (?)
    speed: number | null // Скорость (?)
    timeStamp: number // Дата создания объекта данных
}
