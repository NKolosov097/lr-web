import { UploadButton } from "./UploadButton/UploadButton"
import { Footer } from "./Footer/Footer"
import { Button } from "antd"
import { PictureOutlined } from "@ant-design/icons"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { openDrawer } from "../redux/slices/drawerPhoto."
import { Badge } from "antd/lib"
import { photosSelector } from "../redux/slices/photos"
import { useViewAllPhotos } from "../hooks/photos/useViewAllPhotos.hook"

export const Toolbar = () => {
    const dispatch = useAppDispatch()
    const photos = useAppSelector(photosSelector)
    const viewAllPhotos = useViewAllPhotos()

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
                        viewAllPhotos()
                        dispatch(openDrawer())
                    }}
                />
            </Badge>
        </Footer>
    )
}
