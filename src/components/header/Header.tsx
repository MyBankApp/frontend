import { Link } from "react-router-dom"
import styles from "./Header.module.scss"
import { CircleUserRound } from 'lucide-react'

const Header = () => {

    return (
        <header>
            <div className={styles.logo}>
                <Link to={'/'}>
                    <img src="logo.jpeg" alt="logo" />
                </Link>
            </div>
            <div className={styles.authButtons}>
                <Link to={'/login'} className={styles.login}>
                    <p>Личный кабинет</p>
                    <CircleUserRound />
                </Link>
            </div>
        </header>
    )
}

export default Header