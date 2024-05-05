import React from "react"
import { UploadButton } from "./UploadButton/UploadButton"
import { Footer } from "./Footer/Footer"
import { Button } from "antd"
import { PictureOutlined } from "@ant-design/icons"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { openDrawer } from "../redux/slices/drawerPhoto."
import { Badge } from "antd/lib"
import { photoActions, photosSelector } from "../redux/slices/photos"

export const Toolbar = () => {
    const dispatch = useAppDispatch()
    const photos = useAppSelector(photosSelector)

    return (
        <Footer>
            <UploadButton />
            <Badge
                count={photos.filter((photo) => !photo.viewed).length}
                overflowCount={10}
                size="small"
                color="geekblue"
            >
                <Button
                    icon={<PictureOutlined />}
                    onClick={() => {
                        dispatch(
                            photoActions.toViewAllPhotos([
                                ...photos.map((photo) => ({
                                    ...photo,
                                    viewed: true,
                                })),
                            ])
                        )
                        dispatch(openDrawer())
                    }}
                />
            </Badge>
        </Footer>
    )
}
