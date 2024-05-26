import styles from "./Card.module.css"
import { IPhoto } from "../../types/types"
import { Button, Col, Row, Skeleton, Typography } from "antd"
import { EditOutlined } from "@ant-design/icons"
import { openModal } from "../../redux/slices/modalToChangePhotoInfo"
import { setActivePhoto } from "../../redux/slices/activePhoto"
import { useAppDispatch } from "../../redux/hooks"

const { Paragraph, Title } = Typography

type CardProps = IPhoto & {
    imageSrc: string
}

export const Card = ({ imageSrc, ...polyline }: CardProps) => {
    const dispatch = useAppDispatch()
    const { id, title, description, latitude, longitude } = polyline

    return (
        <li className={styles.cardContainer}>
            <Row>
                <div className={styles.imageWrapper}>
                    {imageSrc ? (
                        <img
                            src={imageSrc}
                            alt={title}
                            className={styles.image}
                        />
                    ) : (
                        <Skeleton.Button
                            style={{ width: 300, height: 200 }}
                            block
                            active
                        />
                    )}

                    <Button
                        className={styles.editIcon}
                        icon={<EditOutlined />}
                        ghost
                        onClick={() => {
                            dispatch(setActivePhoto(id))
                            dispatch(openModal(polyline))
                        }}
                    />
                </div>

                <Title
                    level={4}
                    ellipsis={{
                        rows: 4,
                        expandable: "collapsible",
                        symbol: (expanded) => (expanded ? "скрыть" : "ещё"),
                    }}
                    className={styles.title}
                >
                    {title}
                </Title>
                <Paragraph
                    className={styles.description}
                    ellipsis={{
                        rows: 4,
                        expandable: "collapsible",
                        symbol: (expanded) => (expanded ? "скрыть" : "ещё"),
                    }}
                >
                    {description}
                </Paragraph>

                <div className={styles.br} />

                <Col className={styles.coordWrapper}>
                    <Row className={styles.coord}>
                        <span>Широта:</span>{" "}
                        <span>{latitude ?? "Не указано..."} °</span>
                    </Row>
                    <Row className={styles.coord}>
                        <span>Долгота:</span>{" "}
                        <span>{longitude ?? "Не указано..."} °</span>
                    </Row>
                </Col>
            </Row>
        </li>
    )
}
