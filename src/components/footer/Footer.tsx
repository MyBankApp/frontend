import { Link } from "react-router-dom"
import styles from "./Footer.module.scss"

const Footer = () => {
    return (
        <footer>
            <div className={styles.content}>
                <div className={styles.section}>
                    <h3>FinBank</h3>
                    <p>© 2024 Все права защищены</p>
                </div>
                <div className={styles.section}>
                    <h3>Контакты</h3>
                    <div className={styles.links}>
                        <Link to={"#"}>+7 (495) 123-45-67</Link>
                        <Link to={"#"}>support@finbank.ru</Link>
                    </div>
                </div>
                <div className={styles.section}>
                    <h3>Соцсети</h3>
                    <div className={styles.links}>
                        <Link to={"#"}>ВКонтакте</Link>
                        <Link to={"#"}>Telegram</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer