import { Box, Button, Dialog, DialogContent, Fade, Grid, IconButton, TextField, Typography } from "@mui/material";
import React, { forwardRef, useState } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";

const Transition = forwardRef(function Transition(props, ref) {
    return <Fade ref={ref} {...props} />;
});

const errorStyle = {
    width: "auto",
    padding: "5px",
    margin: "5px 0",
    fontSize: "14px",
    backgroundColor: "#f34646",
    color: "white",
    borderRadius: "5px",
    textAlign: "center",
    justifyContent: "center",
};

const fieldPatterns = {
    firstName: /^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*(-[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*)?$/,
    lastName: /^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*(-[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*)?$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

function PropertyChangeDialog({
    openDialog,
    closeDialog,
    propertyName,
    propertyId,
    propertyType,
    propertyLabel,
    userData,
}) {
    const oldUserData = userData || [];
    const [newUserData, setNewUserData] = useState(userData);
    const [errorMessage, setErrorMessage] = useState("");

    const handleCloseDialog = () => {
        setErrorMessage("");
        closeDialog();
        setNewUserData(oldUserData);
    };

    const handleChange = (event) => {
        const { value } = event.target;

        setNewUserData((prevUserData) => {
            const updatedUserData = { ...prevUserData };
            updatedUserData[propertyId] = value;
            return updatedUserData;
        });
    };

    const validateNewProperty = (e) => {
        if (newUserData[propertyId] === oldUserData[propertyId])
            setErrorMessage("Pole musi być różne od obecnego");
        else if (!fieldPatterns[propertyId].test(newUserData[propertyId])) // Regex validation based on fieldId
            setErrorMessage("Nieprawidłowy format pola " + propertyName.slice(0, -1));
        else if (newUserData[propertyId] === "")
            setErrorMessage("Pole nie może być puste");
        else {
            setErrorMessage("");
            handleChangeUserData(e);
        }
    };

    const handleChangeUserData = async (e) => {
        e.preventDefault();
        const token = "Bearer " + localStorage.getItem("token");
        const userId = jwtDecode(token).userId;
        const urlWithUserId = "/users/" + userId + "/change-data";

        if (token) {
            try {
                const config = {
                    url: urlWithUserId,
                    method: "put",
                    baseURL: "http://localhost/api/v1",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                    data: JSON.stringify(newUserData),
                };

                await axios(config);
                window.location.reload();
            } catch (error) {
                if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                    setErrorMessage(error.response.data.message);
                }
            }
        }
    };

    return (
        <div>
            <Dialog
                open={openDialog}
                maxWidth="sm"
                scroll="body"
                onClose={handleCloseDialog}
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
                        onClick={handleCloseDialog}
                        sx={{
                            position: "absolute",
                            right: "1rem",
                            top: "1rem",
                            "&:hover": {
                                color: "rgb(100, 100, 100)",
                            }
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
                                    flexDirection: "column",
                                }}
                            >
                                <Typography 
                                    variant="h6"
                                    sx={{
                                        "@media only screen and (max-width: 300px)": {
                                            width: "50px",
                                            fontSize: "10px"
                                        }
                                    }}>{`Zmień ${propertyName}`}</Typography>
                                <TextField
                                    margin="dense"
                                    id={propertyId}
                                    label={propertyLabel}
                                    type={propertyType}
                                    value={newUserData[propertyId]}
                                    onChange={handleChange}
                                    fullWidth
                                    variant="standard"
                                    pattern={fieldPatterns[propertyId].source}
                                    sx={{
                                        "@media only screen and (max-width: 300px)": {
                                            width: "100px",
                                            fontSize: "8px"
                                        }
                                    }}/>
                                {errorMessage && <div style={errorStyle}>{errorMessage}</div>}
                            </Box>
                        </Grid>
                        <Grid
                            item
                            xs={14}
                            sx={{ display: "flex", justifyContent: "flex-end", gap: "0.75em" }}
                        >
                            <Button
                                size="medium"
                                variant="contained"
                                onClick={handleCloseDialog}
                                sx={{
                                    backgroundColor: "rgb(10, 160, 230)",
                                    "&:hover": {
                                        backgroundColor: "rgb(10, 120, 170)",
                                    },
                                    "@media only screen and (max-width: 300px)": {
                                        width: "50px",
                                        fontSize: "10px"
                                    }
                                }}
                            >
                                Anuluj
                            </Button>
                            <Button
                                size="medium"
                                variant="contained"
                                onClick={validateNewProperty}
                                sx={{
                                    backgroundColor: "rgb(200, 120, 10)",
                                    "&:hover": {
                                        backgroundColor: "rgb(180, 80, 10)",
                                    },
                                    "@media only screen and (max-width: 300px)": {
                                        width: "50px",
                                        fontSize: "10px"
                                    }
                                }}
                            >
                                Zatwierdź
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default PropertyChangeDialog;
