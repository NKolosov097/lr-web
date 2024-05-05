import React from "react"
import { Button, Popover } from "antd"
import { HomeOutlined, InfoCircleOutlined } from "@ant-design/icons"
import styles from "./InfoBlock.module.css"

export const InfoBlock = () => {
    const hotBtns = [
        {
            name: "Home",
            description: "Показывает Ваше местоположение",
            altBtn: (
                <Button
                    size="small"
                    icon={<HomeOutlined />}
                    onClick={() => {
                        console.log()
                    }}
                />
            ),
        },
        {
            name: "ЛКМ",
            description: "Поставить метку на карту / построить маршрут",
            altBtn: null,
        },
    ]

    return (
        <Popover
            trigger="click"
            placement="rightTop"
            content={
                <div className={styles.contentWrapper}>
                    <ul className={styles.hotBtns}>
                        {hotBtns.map((item) => (
                            <li key={item.name} className={styles.hotBtnItem}>
                                <span className={styles.hotBtn}>
                                    {item?.altBtn && item.altBtn}
                                </span>
                                <h4 className={styles.hotBtnTitle}>
                                    «{item.name}»
                                </h4>
                                -
                                <p className={styles.hotBtnDescription}>
                                    {item.description}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            }
        >
            <Button icon={<InfoCircleOutlined />} className={styles.infoBtn} />
        </Popover>
    )
}
