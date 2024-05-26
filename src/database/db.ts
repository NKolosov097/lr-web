import Dexie, { Table } from "dexie"
import { IPhoto, IStatus } from "../types/types"

export class MapAppDbClass extends Dexie {
    photos!: Table<IPhoto>
    statuses!: Table<IStatus>

    constructor() {
        super("MapAppDb")
        this.version(1).stores({
            photos: "&id, title, description, status, viewed, latitude, longitude, altitude, accuracy, altitudeAccuracy, heading, speed, timeStamp",
            statuses: "&id, title, description",
        })
    }
}

export const db = new MapAppDbClass()
