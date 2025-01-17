import { useState } from "react"
import { Link } from "react-router-dom"
import styles from "./styles.module.css"
import axios from "axios"

export function Login() {
    if (localStorage.getItem("token")) window.location = "/"

    const [data, setData] = useState({ email: "", password: "" })
    const [error, setError] = useState("")

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = "http://localhost/api/v1/login"
            const res = await axios.post(url, data)
            localStorage.setItem("token", res.data.token)
            window.location = "/"
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message)
            }
        }
    }

    return (
        <div className={styles.login_container}>
            <div className={styles.login_form_container}>
                <div className={styles.left}>
                    <form className={styles.form_container}
                        onSubmit={handleSubmit}>
                        <h1>Logowanie</h1>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                            value={data.email}
                            required
                            className={styles.input}/>
                        <input
                            type="password"
                            placeholder="Hasło"
                            name="password"
                            onChange={handleChange}
                            value={data.password}
                            required
                            className={styles.input}/>
                        {error && <div className={styles.error_msg}>{error}</div>}
                        <button type="submit" className={styles.submit_button}>
                            Zaloguj się
                        </button>
                    </form>
                </div>
                <div className={styles.right}>
                    <h1>Nowy tutaj?</h1>
                    <Link to="/register">
                        <button type="button"
                            className={styles.register_button}>
                            Zarejestruj się
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}