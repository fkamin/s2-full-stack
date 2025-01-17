import { useEffect, useState } from "react"
import axios from "axios"
import jwtDecode from "jwt-decode"
import styles from "./styles.module.css"
import PropertyChangeDialog from "./PropertyChangeDialog"
import PasswordChangeDialog from "./PasswordChangeDialog"
import DeleteAccountDialog from "./DeleteAccountDialog"

const baseUrl = 'http://localhost/api/v1/users'

export function Account() {
    const [userData, setUserData] = useState([])

    const [firstNameChangeDialog, setFirstNameChangeDialog] = useState(false)
    const [lastNameChangeDialog, setLastNameChangeDialog] = useState(false)
    const [emailChangeDialog, setEmailChangeDialog] = useState(false)
    const [passwordChangeDialog, setPasswordChangeDialog] = useState(false)
    const [deleteUserDialog, setDeleteUserDialog] = useState(false)

    const openFirstNameChangeDialog = () => { setFirstNameChangeDialog(true) }
    const openLastNameChangeDialog = () => { setLastNameChangeDialog(true) }
    const openEmailChangeDialog = () => { setEmailChangeDialog(true) }
    const openPasswordChangeDialog = () => { setPasswordChangeDialog(true) }
    const openDeleteDialog = () => { setDeleteUserDialog(true) }

    useEffect(() => {
        const event = { preventDefault: () => { } }
        handleGetUserData(event)
    }, [])

    const handleGetUserData = async (e) => {
        e.preventDefault()
        const token = "Bearer " + localStorage.getItem("token")
        const userId = jwtDecode(token).userId
        const urlWithUserId = baseUrl + "/" + userId

        if (token) {
            try {
                const config = {
                    url: urlWithUserId,
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                }

                const res = await axios(config)
                setUserData(res.data)
            } catch (error) {
                if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                    localStorage.removeItem("token")
                    window.location.reload()
                }
            }
        }
    }

    const handleDeleteUser = async (e) => {
        e.preventDefault()
        const token = "Bearer " + localStorage.getItem("token")
        const userId = jwtDecode(token).userId
        const urlWithUserId = baseUrl + "/" + userId

        if (token) {
            try {
                const config = {
                    url: urlWithUserId,
                    method: 'delete',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                }

                await axios(config)
                localStorage.removeItem("token")
                window.location.reload()
            } catch (error) {
                if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                    localStorage.removeItem("token")
                    window.location.reload()
                }
            }
        }
    }

    return (
        <div>
            {userData && 
                (<div className={styles.content}>
                    <h2>Dane konta</h2>
                    <div className={styles.user_data}>
                        <div>
                            <div className={styles.property_name}>
                                <h4>IMIĘ</h4>
                            </div>
                            <div className={styles.value_and_button}>
                                <h3>{userData.firstName}</h3>
                                <button type="button" className={styles.change_button} onClick={openFirstNameChangeDialog}>ZMIEŃ</button>
                            </div>
                            <hr />
                        </div>
                        <div>
                            <div className={styles.property_name}>
                                <h4>NAZWISKO</h4>
                            </div>
                            <div className={styles.value_and_button}>
                                <h3>{userData.lastName}</h3>
                                <button type="button" className={styles.change_button} onClick={openLastNameChangeDialog}>ZMIEŃ</button>
                            </div>
                            <hr />
                        </div>
                        <div>
                            <div className={styles.property_name}>
                                <h4>EMAIL</h4>
                            </div>
                            <div className={styles.value_and_button}>
                                <h3>{userData.email}</h3>
                                <button type="button" className={styles.change_button} onClick={openEmailChangeDialog}>ZMIEŃ</button>
                            </div>
                            <hr />
                        </div>
                        <div className={styles.user_item}>
                            <div className={styles.value_and_button}>
                                <h4>HASŁO</h4>
                                <button type="button" className={styles.change_button} onClick={openPasswordChangeDialog}>ZMIEŃ</button>
                            </div>
                            <hr />
                        </div>
                        <div className={styles.user_item}>
                            <button type="button" className={styles.delete_account_button} onClick={openDeleteDialog}>USUŃ KONTO</button>
                        </div>
                    </div>
                </div>
            )}
            {firstNameChangeDialog && (<PropertyChangeDialog
                className={styles.delete_account_button}
                openDialog={firstNameChangeDialog}
                closeDialog={() => setFirstNameChangeDialog(false)}
                propertyName={"imię:"}
                propertyLabel={"Podaj nowe imię"}
                propertyId={"firstName"}
                propertyType={"text"}
                userData={userData} />)}
            {lastNameChangeDialog && (<PropertyChangeDialog
                className={styles.delete_account_button}
                openDialog={lastNameChangeDialog}
                closeDialog={() => setLastNameChangeDialog(false)}
                propertyName={"nazwisko:"}
                propertyLabel={"Podaj nowe nazwisko"}
                propertyId={"lastName"}
                propertyType={"text"}
                userData={userData} />)}
            {emailChangeDialog && (<PropertyChangeDialog
                className={styles.delete_account_button}
                openDialog={emailChangeDialog}
                closeDialog={() => setEmailChangeDialog(false)}
                propertyName={"email:"}
                propertyLabel={"Podaj nowy e-mail"}
                propertyId={"email"}
                propertyType={"email"}
                userData={userData} />)}
            {passwordChangeDialog && (<PasswordChangeDialog
                className={styles.delete_account_button}
                openDialog={passwordChangeDialog}
                closeDialog={() => setPasswordChangeDialog(false)}
                userData={userData} />)}
            {deleteUserDialog && (<DeleteAccountDialog
                className={styles.delete_account_button}
                openDialog={deleteUserDialog}
                deleteFunction={handleDeleteUser}
                closeDialog={() => setDeleteUserDialog(false)} />)}
        </div>
    )
}