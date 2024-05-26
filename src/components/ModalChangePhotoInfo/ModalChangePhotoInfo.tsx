import { Button, Input, Modal, Popover, Row } from "antd"
import styles from "./ModalChangePhotoInfo.module.css"
import TextArea from "antd/es/input/TextArea"
import {
    DeleteOutlined,
    ExclamationCircleOutlined,
    PushpinOutlined,
} from "@ant-design/icons"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import {
    changeDescription,
    changeTitle,
    closeModal,
    resetModal,
} from "../../redux/slices/modalToChangePhotoInfo"
import { closeDrawer } from "../../redux/slices/drawerPhoto."
import {
    activePhotoSelector,
    resetActivePhoto,
} from "../../redux/slices/activePhoto"
import { setClickType } from "../../redux/slices/click"
import { EClickType } from "../../types/types"
import { Divider } from "antd/lib"
import { useDeletePhoto } from "../../hooks/photos/useDeletePhoto.hook"
import { useChangePhotoInfo } from "../../hooks/photos/useChangePhotoInfo.hook"

export const ModalChangePhotoInfo = () => {
    const id = useAppSelector(activePhotoSelector)
    const modal = useAppSelector((state) => state.modalToChangePhotoInfo)
    const dispatch = useAppDispatch()
    const deletePhoto = useDeletePhoto()
    const changePhotoInfo = useChangePhotoInfo()

    return (
        <Modal
            open={modal.isOpen}
            title={
                <h5 className={styles.modalTitle}>
                    Редактирование информации о фотографии
                </h5>
            }
            onCancel={() => dispatch(closeModal())}
            footer={null}
            style={{ zIndex: 9999999 }}
        >
            <h6 className={styles.modalInputLabel}>Название фотографии</h6>
            <Input
                value={modal.title}
                onChange={(e) => dispatch(changeTitle(e.target.value))}
                placeholder="Введите название для фотографии"
            />

            <h6 className={styles.modalInputLabel}>Описание фотографии</h6>
            <TextArea
                autoSize
                value={modal.description}
                onChange={(e) => dispatch(changeDescription(e.target.value))}
                placeholder="Введите описание для фотографии"
            />

            <Divider />

            <Row>
                <Popover
                    content={
                        <div style={{ maxWidth: 230 }}>
                            <ExclamationCircleOutlined
                                style={{ color: "#4096ff" }}
                            />
                            &nbsp; Для того, чтобы указать точку, нажмите левую
                            кнопку мыши по карте
                        </div>
                    }
                    trigger="hover"
                    placement="top"
                >
                    <Button
                        type="dashed"
                        icon={<PushpinOutlined />}
                        className={styles.btn}
                        onClick={() => {
                            dispatch(closeDrawer())
                            dispatch(closeModal())
                            dispatch(setClickType(EClickType.changeLocation))
                        }}
                    >
                        Указать точку на карте
                    </Button>
                </Popover>
            </Row>

            <Row className={styles.modalFooter}>
                <Button
                    danger
                    ghost
                    icon={<DeleteOutlined />}
                    onClick={() => {
                        deletePhoto(id)
                        dispatch(resetModal())
                        dispatch(resetActivePhoto())
                    }}
                />
                <div className={styles.modalFooterRight}>
                    <Button
                        type="primary"
                        onClick={() => {
                            changePhotoInfo({
                                id: id,
                                changes: {
                                    title: modal.title,
                                    description: modal.description,
                                },
                            })
                            dispatch(resetModal())
                        }}
                    >
                        Сохранить
                    </Button>
                    <Button onClick={() => dispatch(resetModal())}>
                        Отменить
                    </Button>
                </div>
            </Row>
        </Modal>
    )
}
