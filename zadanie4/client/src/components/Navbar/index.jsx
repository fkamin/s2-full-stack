import styles from "./styles.module.css"
import { Link } from "react-router-dom"

export function Navbar() {
    return (
        <div className={styles.main_container}>
            <div className={styles.application_name}>
                <h1>System zarządzania projektami</h1>
            </div>
            <nav className={styles.navbar}>
                <Link to="/projects">
                    <button className={styles.white_btn}>Projekty</button>
                </Link>
                <Link to="/account">
                    <button className={styles.white_btn}>Konto</button>
                </Link>
                <Link to="/logout">
                    <button type="button" className={styles.white_btn}>Wyloguj się</button>
                </Link>
            </nav>
        </div>
    )
}