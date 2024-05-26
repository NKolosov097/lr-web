import { noop } from "antd/es/_util/warning"
import { createContext, useContext, useState } from "react"
import { db } from "../database/db"

export type ImageStore = {
    [key: string]: string
}

const FileContext = createContext<{
    images: ImageStore
    addImage: (id: string, image: string) => void
    removeImage: (id: string) => void
}>({
    images: {},
    addImage: noop,
    removeImage: noop,
})

export const useFiles = () => {
    const context = useContext(FileContext)
    if (!context) {
        throw new Error("useFile must be used within a FileProvider")
    }
    return context
}

export function FileProvider({ children }: { children: React.ReactNode }) {
    const [images, setImages] = useState<ImageStore>({})

    const initImages = async () => {
        try {
            await db.images.toArray().then((res) => {
                res.forEach((img) => {
                    setImages({ [img.id]: img.fileSrc })
                })
            })
        } catch (e) {
            console.error(e)
        }
    }
    initImages()

    const addImage = async (id: string, fileSrc: string) => {
        setImages((prevFiles) => ({ ...prevFiles, [id]: fileSrc }))

        try {
            await db.images.add({ id, fileSrc })
        } catch (e) {
            console.error(e)
        }
    }

    const removeImage = async (removeFileId: string) => {
        setImages((prevFiles) =>
            Object.keys(prevFiles)
                .filter((fileId) => fileId !== removeFileId)
                .reduce((newImageStore: ImageStore, key) => {
                    newImageStore[key] = prevFiles[key]
                    return newImageStore
                }, {})
        )

        try {
            await db.images.delete(removeFileId)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <FileContext.Provider value={{ images, addImage, removeImage }}>
            {children}
        </FileContext.Provider>
    )
}
