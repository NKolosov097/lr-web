/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button, Popconfirm, Row, message } from "antd/lib"
import { LatLng, LatLngExpression } from "leaflet"
import { useEffect, useState } from "react"
import { Polyline, useMapEvents } from "react-leaflet"
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks"
import { clickType, setClickType } from "../../../../redux/slices/click"
import { EClickType } from "../../../../types/types"
import styles from "./Polylines.module.css"
import cn from "classnames"
import { v4 as uuidv4 } from "uuid"
import { Helmet } from "react-helmet"
import { DeleteOutlined, RiseOutlined } from "@ant-design/icons"
import { db } from "../../../../database/db"

export const Polylines = () => {
    const [polylines, setPolilynes] = useState<LatLngExpression[]>([])
    const click = useAppSelector(clickType)
    const dispatch = useAppDispatch()

    const getDistance = (
        lat1: number,
        lon1: number,
        lat2: number,
        lon2: number
    ) => {
        const R = 6371 // Радиус Земли в километрах
        const dLat = ((lat2 - lat1) * Math.PI) / 180
        const dLon = ((lon2 - lon1) * Math.PI) / 180

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((lat1 * Math.PI) / 180) *
                Math.cos((lat2 * Math.PI) / 180) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2)
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

        const distance = R * c
        return distance
    }

    useEffect(() => {
        const initPolylines = async () => {
            try {
                await db.polylines.toArray().then((res) => {
                    res?.forEach((polyline) => {
                        if (polyline) {
                            setPolilynes((prev) => [
                                ...prev,
                                new LatLng(polyline.lat, polyline.lng),
                            ])
                        }
                    })
                })
            } catch (e) {
                console.error(e)
            }
        }

        initPolylines()

        return () => {
            const addPolylinesToDb = async () => {
                try {
                    polylines?.forEach(async (polyline) => {
                        await db.polylines.add({
                            id: Math.random(),
                            // @ts-ignore
                            lat: polyline?.lat,
                            // @ts-ignore
                            lng: polyline?.lng,
                        })
                    })
                } catch (e) {
                    console.error(e)
                }
            }

            addPolylinesToDb()
        }
    }, [])

    useMapEvents({
        click(e) {
            if (click === EClickType.addPolyline) {
                setPolilynes((prev) => [...prev, [e.latlng.lat, e.latlng.lng]])

                const lat1 = 55.7851408637352
                const lon1 = 37.47057859834967

                const lat2 = 55.785550942749666
                const lon2 = 37.463951475539226

                const dist = getDistance(lat1, lon1, lat2, lon2)
                console.log(`Расстояние между координатами: ${dist} км`)
            }
        },
    })

    return (
        <>
            {click === EClickType.addPolyline && (
                <Helmet title="Map App | Добавление точек на карту" />
            )}

            <Row style={{ flexDirection: "column", gap: 5 }}>
                <Button
                    icon={<RiseOutlined style={{ fontSize: 20 }} />}
                    onClick={() => {
                        if (click === EClickType.addPolyline) {
                            dispatch(setClickType(EClickType.null))
                            // Когда мы кликаем по линейке для того, чтобы прекратить строить линии, мы все равно триггерим клик по карте и строим еще одну линию. Для этого сразу же удаляем ее
                            setPolilynes((prev) => [
                                ...prev.slice(0, prev.length - 1),
                            ])

                            message.info({
                                content: "Построение маршрута завершено",
                                duration: 1.5,
                            })
                        } else {
                            dispatch(setClickType(EClickType.addPolyline))
                            message.info({
                                content: "Вы строите маршрут по клику на карту",
                                duration: 3,
                            })
                        }
                    }}
                    className={cn({
                        [styles.activeBtn]: click === EClickType.addPolyline,
                    })}
                />

                {polylines.length > 0 && (
                    <Popconfirm
                        title="Вы уверены, что хотите удалить все линии?"
                        placement="bottom"
                        okText="Да"
                        cancelText="Нет"
                        onConfirm={() => {
                            setPolilynes([])
                            dispatch(setClickType(EClickType.null))
                        }}
                    >
                        <Button
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => {
                                setPolilynes((prev) => [
                                    ...prev.slice(0, prev.length - 1),
                                ])
                            }}
                        />
                    </Popconfirm>
                )}
            </Row>

            <Polyline
                key={uuidv4()}
                positions={polylines}
                eventHandlers={{
                    mousedown: (e) => {
                        console.log(e)
                    },
                }}
            />
        </>
    )
}
