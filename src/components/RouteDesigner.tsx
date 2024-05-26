import React from "react"
import { LatLngExpression } from "leaflet"
import GpxParser from "gpxparser"
import { gpxData } from "../mock/gpxData/gpx"
import { Polyline } from "react-leaflet"

export const RouteDesigner = () => {
    const gpx = new GpxParser()
    gpx.parse(gpxData)
    // здесь выводятся координаты, считанные с gpx файла
    const positions = gpx.tracks[0].points.map((p) => [p.lat, p.lon]) as
        | LatLngExpression[]
        | LatLngExpression[][]

    // const [positions, setPositions] = useState<
    //     LatLngExpression[] | LatLngExpression[][]
    // >([
    //     [40.689818841705, -74.04511194542516],
    //     [40.75853187779803, -73.98495720388513],
    //     [40.86151538060051, -74.06201170384256],
    //     [40.80981015620906, -74.03656769139772],
    //     [40.80721155324825, -74.04274750092904],
    //     [40.78901848327006, -74.081199649124],
    //     [40.764319913561216, -74.08840942691056],
    //     [40.749756455072884, -74.09493255919364],
    //     [40.74793579843903, -74.07673645335137],
    //     [40.675849802727335, -74.19758606169779],
    //     [40.60394644123212, -74.05991363796608],
    //     [40.6495463256113, -73.96000671720954],
    // ])

    return (
        <Polyline
            positions={positions}
            pathOptions={{ fillColor: "red", color: "blue" }}
        />
    )
}
