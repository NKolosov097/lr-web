import { useEffect, useMemo, useRef, useState } from 'react'
import { Entity } from 'resium'

const initCanvas = () => {
    const can = document.createElement('canvas')
    can.width = 100
    can.height = 100
    return can
}

const renderCanvas = (can: HTMLCanvasElement, p: number) => {
    const c = can.getContext('2d')
    if (!c) return
    c.clearRect(0, 0, can.width, can.height)
    c.fillStyle = 'rgba(100,0,0,0.8)'
    c.beginPath()
    c.arc(
        can.width / 2,
        can.height / 2,
        (p * can.width) / 2,
        0,
        Math.PI * 2,
        false
    )
    c.fill()
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const CanvasEntity = (props) => {
    const c1 = useMemo<HTMLCanvasElement>(initCanvas, [])
    const c2 = useMemo<HTMLCanvasElement>(initCanvas, [])
    const [image, setImage] = useState<HTMLCanvasElement>()
    const progress = useRef(0)

    useEffect(() => {
        const i = setInterval(() => {
            progress.current = Math.min(progress.current + 0.01, 1)
            setImage((image) => {
                const canvas = image === c1 ? c2 : c1
                if (canvas) {
                    renderCanvas(canvas, progress.current)
                }
                return canvas
            })
            if (progress.current >= 1) {
                clearInterval(i)
            }
        }, 10)
        return () => clearInterval(i)
    }, [c1, c2])

    return <Entity {...props} billboard={{ image }} />
}
