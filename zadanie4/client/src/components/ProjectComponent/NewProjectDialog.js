import { Box, Button, Dialog, DialogContent, Fade, Grid, IconButton, TextField, Typography } from "@mui/material";
import React, { forwardRef, useState } from "react";

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

function NewProjectDialog({ openDialog, closeDialog, addFunction }) {
    const [errorMessage, setErrorMessage] = useState("")
    const [projectData, setProjectData] = useState({
        title: "",
        description: ""
    })

    const handleCloseDialog = () => {
        closeDialog()
        setProjectData({
            title: "",
            description: ""
        })
    }

    const handleChange = (event) => {
        const { name, value } = event.target

        setProjectData((prevProjectData) => {
            const updatedProjectData = { ...prevProjectData }
            updatedProjectData[name] = value
            return updatedProjectData
        })
    }

    const handleValidateNewProject = () => {
        if (projectData["title"] === "") setErrorMessage("Tytuł nie może być pusty")
        else {
            setErrorMessage("")
            const e = { preventDefault: () => {} }
            addFunction(e, projectData)
        }
    }

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
                                color: "rgb(100, 100, 100)"
                            }
                        }}>
                        X
                    </IconButton>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    flexDirection: "column"
                                }}>
                                <Typography
                                    sx={{
                                        mb: 2,
                                        color: "rgb(220, 150, 50)",
                                        fontSize: "25px",
                                        fontWeight: "bold",
                                        fontStyle: "italic"
                                    }}>
                                    {projectData.title || "Nowy projekt"}
                                </Typography>
                                <TextField
                                    sx={{
                                        mb: 1
                                    }}
                                    value={projectData["title"]}
                                    onChange={handleChange}
                                    type="text"
                                    name="title"
                                    label="Nazwa projektu"
                                    fullWidth
                                    variant="standard"
                                />
                                <TextField
                                    sx={{
                                        mb: 1
                                    }}
                                    value={projectData["description"]}
                                    onChange={handleChange}
                                    type="text"
                                    name="description"
                                    label="Opis projektu"
                                    fullWidth
                                    variant="standard"
                                    multiline
                                />
                                {errorMessage && <div style={errorStyle}> {errorMessage}</div>}
                            </Box>
                        </Grid>
                        <Grid item xs={14} sx={{ display: "flex", justifyContent: "flex-end", gap: "0.75em" }}>
                            <Button size="medium" variant="contained" onClick={handleCloseDialog} sx={{
                                backgroundColor: "rgb(10, 160, 230)",
                                "&:hover": {
                                    backgroundColor: "rgb(10, 120, 170)"
                                }
                            }}>
                                Anuluj
                            </Button>
                            <Button size="medium" variant="contained" onClick={handleValidateNewProject} sx={{
                                backgroundColor: "rgb(200, 120, 10)",
                                "&:hover": {
                                    backgroundColor: "rgb(180, 80, 10)"
                                }
                            }}>
                                Utwórz
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default NewProjectDialog