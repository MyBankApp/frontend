import type { JSX } from "react"
import styles from "./Layout.module.scss"
import type { LayoutProps } from "../types/props/LayoutProps"

const Layout = ({ children } : LayoutProps): JSX.Element => {

    return (
        <div className={styles.page}>
            {children}
        </div>
    )
}

export default Layout