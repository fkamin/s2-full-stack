import { Box, Button, Dialog, DialogContent, Fade, Grid, IconButton, TextField, Typography } from "@mui/material";
import React, { forwardRef, useState } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";

const Transition = forwardRef(function Transition(props, ref) {
    return <Fade ref={ref} {...props} />
})

const errorStyle = {
    width: "auto",
    padding: "5px",
    margin: "5px 0",
    fontSize: "14px",
    backgroundColor: "#f34646",
    color: "white",
    borderRadius: "5px",
    textAlign: "center",
    justifyContent: "center"
};


function PasswordChangeDialog({ openDialog, closeDialog }) {
    const [errorMessage, setErrorMessage] = useState("")
    const [userPassword, setUserPassword] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    })

    const handleChange = (event) => {
        const { name, value } = event.target

        setUserPassword((prevUserPassword) => {
            const updatedUserPassword = { ...prevUserPassword }
            updatedUserPassword[name] = value
            return updatedUserPassword
        })
    }

    function isCurrentPasswordDifferentThenNewPassword() {
        return userPassword.currentPassword !== userPassword.newPassword
    }

    function isNewPasswordSameAsConfirmNewPassword() {
        return userPassword.newPassword === userPassword.confirmNewPassword
    }

    function allPaswordsFieldsAreNotEmpty() {
        return (userPassword.currentPassword !== "") && (userPassword.newPassword !== "") && (userPassword.confirmNewPassword !== "")
    }

    const validateNewPassword = (e) => {
        if (!isCurrentPasswordDifferentThenNewPassword()) setErrorMessage("Nowe hasło musi być różne od obecnego")
        if (userPassword.newPassword.length < 8) setErrorMessage("Nowe hasło musi się składać z minimum 8 znaków")
        if (!isNewPasswordSameAsConfirmNewPassword()) setErrorMessage("Nowe hasło i powtórzone hasło nie są identyczne")
        if (!allPaswordsFieldsAreNotEmpty()) setErrorMessage("Wypełnij wszystkie pola")
        if (allPaswordsFieldsAreNotEmpty()
            && isCurrentPasswordDifferentThenNewPassword()
            && isNewPasswordSameAsConfirmNewPassword()
            && userPassword.newPassword.length >= 8) {
            handleChangeUserPassword(e)
        }
    }

    const handleChangeUserPassword = async (e) => {
        setErrorMessage("")
        const sendData = {
            "currentPassword": userPassword.currentPassword,
            "newPassword": userPassword.newPassword
        }

        e.preventDefault()
        const token = "Bearer " + localStorage.getItem("token")
        const userId = jwtDecode(token).userId
        const urlWithUserId = "/users/" + userId + "/change-password"

        if (token) {
            try {
                const config = {
                    url: urlWithUserId,
                    method: 'put',
                    baseURL: "http://localhost/api/v1",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    data: JSON.stringify(sendData)
                }

                await axios(config)
                window.location = "/logout"
            } catch (error) {
                if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                    setErrorMessage(error.response.data.message)
                }
            }
        }
    }

    return (
        <div>
            <Dialog
                open={openDialog}
                maxWidth="sm"
                scroll="body"
                onClose={closeDialog}
                TransitionComponent={Transition}>
                <DialogContent 
                    sx={{ 
                        px: 6, 
                        py: 6, 
                        position: "relative",
                        backgroundColor: "rgb(200, 200, 200)"
                    }}>
                    <IconButton
                        disableRipple={true}
                        size="small"
                        onClick={closeDialog}
                        sx={{
                            position: "absolute",
                            right: "1rem",
                            top: "1rem",
                            "&:hover": {
                                color: "rgb(100, 100, 100)"
                            },
                        }}>
                        X
                    </IconButton>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Box
                                sx={{
                                    mb: 3,
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    flexDirection: "column"
                                }}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        "@media only screen and (max-width: 300px)": {
                                            width: "100px",
                                            fontSize: "12px"
                                        }
                                    }}>
                                    Zmień hasło
                                </Typography>
                                <Typography variant="h6"
                                    sx={{
                                        "@media only screen and (max-width: 300px)": {
                                            fontSize: "5px"
                                        }
                                    }}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        name="currentPassword"
                                        label="Aktualne hasło"
                                        type="password"
                                        fullWidth
                                        variant="standard"
                                        value={userPassword.currentPassword}
                                        onChange={handleChange}
                                        sx={{
                                            "@media only screen and (max-width: 300px)": {
                                                fontSize: "8px"
                                            }
                                        }} />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        name="newPassword"
                                        label="Nowe hasło"
                                        type="password"
                                        fullWidth
                                        variant="standard"
                                        value={userPassword.newPassword}
                                        onChange={handleChange}
                                        sx={{
                                            "@media only screen and (max-width: 300px)": {
                                                fontSize: "8px"
                                            }
                                        }} />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        name="confirmNewPassword"
                                        label="Powtórz nowe hasło:"
                                        type="password"
                                        fullWidth
                                        variant="standard"
                                        value={userPassword.confirmNewPassword}
                                        onChange={handleChange}
                                        sx={{
                                            "@media only screen and (max-width: 300px)": {
                                                fontSize: "8px"
                                            }
                                        }} />
                                </Typography>
                                {errorMessage && <div style={errorStyle}> {errorMessage}</div>}
                            </Box>
                        </Grid>
                        <Grid item xs={14} sx={{ display: "flex", justifyContent: "flex-end", gap: "0.75em" }}>
                            <Button size="medium" variant="contained" onClick={closeDialog} sx={{
                                backgroundColor: "rgb(10, 160, 230)",
                                "&:hover": {
                                    backgroundColor: "rgb(10, 120, 170)"
                                },
                                "@media only screen and (max-width: 300px)": {
                                    fontSize: "8px"
                                }
                            }}>
                                Anuluj
                            </Button>
                            <Button size="medium" variant="contained" onClick={validateNewPassword} sx={{
                                backgroundColor: "rgb(200, 120, 10)",
                                "&:hover": {
                                    backgroundColor: "rgb(180, 80, 10)"
                                }, "@media only screen and (max-width: 300px)": {
                                    fontSize: "8px"
                                }
                            }}>
                                Zatwierdź
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default PasswordChangeDialog