import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import axios from "axios";

export default function Register() {
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    };

    const handleValidation = (e) => {
        if (validateFields()) {
            setError("")
            handleSubmit(e)
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const registerURL = "http://localhost/api/v1/register"
            
            await axios.post(registerURL, JSON.stringify(data), {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });

            navigate("/login");
        } catch (error) {
            if ( error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            }
        }
    }

    const validateFields = () => {
        const firstNameAndLastNameRegex = /^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*(-[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*)?$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!firstNameAndLastNameRegex.test(data.firstName)) {
            setError("Niepoprawne imię");
            return false;
        }

        if (data.firstName.length < 3) {
            setError("Imię musi się składać z minimum 3 liter");
            return false;
        }

        if (!firstNameAndLastNameRegex.test(data.lastName)) {
            setError("Niepoprawne nazwisko");
            return false;
        }

        if (data.lastName.length < 3) {
            setError("Nazwisko musi się składać z minimum 3 liter");
            return false;
        }

        if (!emailRegex.test(data.email)) {
            setError("Niepoprawny adres email");
            return false;
        }

        if (data.password.length < 8) {
            setError("Hasło musi mieć co najmniej 8 znaków");
            return false;
        }

        if (data.password !== data.confirmPassword) {
            setError("Hasła muszą być identyczne");
            return false;
        }

        return true;
    };

    return (
        <div className={styles.signup_container}>
            <div className={styles.signup_form_container}>
                <div className={styles.left}>
                    <h1>Witaj ponownie</h1>
                    <Link to="/login">
                        <button type="button" className={styles.login_button}>
                            Zaloguj się
                        </button>
                    </Link>
                </div>
                <div className={styles.right}>
                    <form className={styles.form_container}>
                        <h1>Załóż konto</h1>
                        <input
                            type="text"
                            placeholder="Imię"
                            name="firstName"
                            onChange={handleChange}
                            value={data.firstName}
                            required
                            className={styles.input}/>
                        <input
                            type="text"
                            placeholder="Nazwisko"
                            name="lastName"
                            onChange={handleChange}
                            value={data.lastName}
                            required
                            className={styles.input}/>
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
                        <input
                            type="password"
                            placeholder="Powtórz hasło"
                            name="confirmPassword"
                            onChange={handleChange}
                            value={data.confirmPassword}
                            required
                            className={styles.input}/>
                        {error && <div className={styles.error_msg}>{error}</div>}
                        <button
                            type="button"
                            onClick={handleValidation}
                            className={styles.register_button}>
                            Zarejestruj się
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
