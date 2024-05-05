import styles from "./Footer.module.css"

interface IFooterProps {
    children: React.ReactNode
}

export const Footer = ({ children }: IFooterProps) => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>{children}</div>
        </footer>
    )
}
