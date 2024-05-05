import React from "react"
import { noop } from "antd/es/_util/warning"
import { createContext, useContext, useState } from "react"

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

    const addImage = (id: string, fileSrc: string) =>
        setImages((prevFiles) => ({ ...prevFiles, [id]: fileSrc }))

    const removeImage = (removeFileId: string) => {
        setImages((prevFiles) =>
            Object.keys(prevFiles)
                .filter((fileId) => fileId !== removeFileId)
                .reduce((newImageStore: ImageStore, key) => {
                    newImageStore[key] = prevFiles[key]
                    return newImageStore
                }, {})
        )
    }

    return (
        <FileContext.Provider value={{ images, addImage, removeImage }}>
            {children}
        </FileContext.Provider>
    )
}
