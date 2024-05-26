import Dexie, { Table } from "dexie"
import { IImages, IPhoto, IStatus } from "../types/types"
import {} from "leaflet"

interface ITablePolylines {
    id: number
    lat: number
    lng: number
}

export class MapAppDbClass extends Dexie {
    photos!: Table<IPhoto>
    images!: Table<IImages>
    statuses!: Table<IStatus>
    polylines!: Table<ITablePolylines>

    constructor() {
        super("MapAppDb")
        this.version(1).stores({
            photos: "&id, title, description, status, viewed, latitude, longitude, altitude, accuracy, altitudeAccuracy, heading, speed, timeStamp",
            images: "&id, fileSrc",
            statuses: "&id, title, description",
            polylines: "&id, lat, lng",
        })
    }
}

export const db = new MapAppDbClass()
