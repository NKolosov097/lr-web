import Dexie, { Table } from "dexie"
import { EStatus, IPhoto } from "../types/types"

interface ITableStatuses {
    id: number
    title: EStatus
    description?: string
}

export class MapAppDbClass extends Dexie {
    photos!: Table<IPhoto>
    statuses!: Table<ITableStatuses>

    constructor() {
        super("MapAppDb")
        this.version(1).stores({
            photos: "&id, title, description, status, viewed, latitude, longitude, altitude, accuracy, altitudeAccuracy, heading, speed, timeStamp",
            statuses: "id, title, description",
        })
    }
}

export const db = new MapAppDbClass()
