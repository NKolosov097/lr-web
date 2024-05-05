import { Button, Drawer, Input, Popover, Row } from "antd"
import { CloseOutlined, SearchOutlined } from "@ant-design/icons"
import { Card } from "../Card/Card"
import styles from "./ImageLibrary.module.css"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { photosSelector } from "../../redux/slices/photos"
import { closeDrawer } from "../../redux/slices/drawerPhoto."
import { drawerSelector } from "../../redux/selectors"
import { useFiles } from "../../context/FileContext"
import { resetActivePhoto } from "../../redux/slices/activePhoto"
import { Helmet } from "react-helmet"

export const ImageLibrary = () => {
    const photos = useAppSelector(photosSelector)
    const drawerPhoto = useAppSelector(drawerSelector)
    const dispatch = useAppDispatch()
    const { images } = useFiles()

    return (
        <>
            {drawerPhoto && <Helmet title="Map App | Фотографии" />}
            <Drawer
                width="100vw"
                open={drawerPhoto}
                title={
                    <div className={styles.drawerContent}>
                        <h2 className={styles.drawerTitle}>
                            Загруженные фотографии
                        </h2>
                        <Popover
                            content={
                                <div className={styles.drawerSearchWrapper}>
                                    <Row>
                                        <Input placeholder="Поиск по названию фотографии" />
                                    </Row>
                                </div>
                            }
                            trigger="click"
                            placement="bottomLeft"
                        >
                            <Button
                                icon={<SearchOutlined />}
                                type="text"
                                style={{ color: "#f4f4f4" }}
                            />
                        </Popover>
                    </div>
                }
                style={{ backgroundColor: "#262626", color: "#F4F4F4" }}
                closeIcon={<CloseOutlined style={{ color: "#f4f4f4" }} />}
                onClose={() => {
                    dispatch(resetActivePhoto())
                    dispatch(closeDrawer())
                }}
            >
                <ul className={styles.photoList}>
                    {photos.length > 0 ? (
                        photos.map((photo) => (
                            <Card
                                key={photo.id}
                                imageSrc={images[photo.id]}
                                {...photo}
                            />
                        ))
                    ) : (
                        <h3 className={styles.drawerEmptyContent}>
                            У Вас пока нет загруженных фотографий
                        </h3>
                    )}
                </ul>
            </Drawer>
        </>
    )
}
