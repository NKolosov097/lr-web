import { ShareAltOutlined } from "@ant-design/icons"
import { Button, message } from "antd/lib"
import { LatLngExpression } from "leaflet"
import React, { useState } from "react"
import { Polyline, useMapEvents } from "react-leaflet"
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks"
import { clickType, setClickType } from "../../../../redux/slices/click"
import { EClickType } from "../../../../types/types"
import styles from "./Polylines.module.css"
import cn from "classnames"
import { v4 as uuidv4 } from "uuid"
import { Helmet } from "react-helmet"

interface IPolyline {
    id: string | number
    positions: LatLngExpression[] | LatLngExpression[][]
}

export const Polylines = () => {
    const [polylines, setPolilynes] = useState<IPolyline[]>([
        {
            id: 1,
            positions: [
                [55.751061122423486, 37.61046491702407],
                [55.75126112242844, 37.6144649178244],
                [55.75306112242844, 37.6124649178244],
            ],
        },
    ])
    const click = useAppSelector(clickType)
    const dispatch = useAppDispatch()

    useMapEvents({
        dblclick(e) {
            if (click === EClickType.addPolyline) {
                setPolilynes((prev) => [
                    ...prev,
                    {
                        id: uuidv4(),
                        positions: [[e.latlng.lat, e.latlng.lng]],
                    },
                ])
            }

            console.log("dblclick: ", polylines[0])
        },
        click(e) {
            if (click === EClickType.addPolyline) {
                setPolilynes((prev) => [
                    ...prev,
                    {
                        id: uuidv4(),
                        positions: [[e.latlng.lat, e.latlng.lng]],
                    },
                ])

                console.log([[e.latlng.lat, e.latlng.lng]])
            }
        },
    })

    return (
        <>
            {click === EClickType.addPolyline && (
                <Helmet title="Map App | Добавление точек на карту" />
            )}
            <Button
                icon={<ShareAltOutlined />}
                onClick={() => {
                    if (click === EClickType.addPolyline) {
                        dispatch(setClickType(EClickType.null))
                        dispatch(setClickType(EClickType.addPolyline))
                    } else {
                        dispatch(setClickType(EClickType.addPolyline))
                        message.info({
                            content: "При клике на карту, вы строите маршрут",
                            duration: 3,
                        })
                    }
                }}
                className={cn({
                    [styles.activeBtn]: click === EClickType.addPolyline,
                })}
            />

            {polylines.map((polyline) => (
                <Polyline key={polyline.id} positions={polyline.positions} />
            ))}
        </>
    )
}
