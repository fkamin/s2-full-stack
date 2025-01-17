import { Box, Button, Dialog, DialogContent, Fade, Grid, IconButton, Typography } from "@mui/material";
import React, { forwardRef } from "react";

const Transition = forwardRef(function Transition(props, ref) {
    return <Fade ref={ref} {...props} />
})

function DeleteProjectDialog({ openDialog, closeDialog, deleteFunction }) {
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
                            "@media only screen and (max-width: 400px)": {
                                fontSize: "14px"
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
                                    flexDirection: "column"
                                }}>
                                <Typography 
                                    variant="h6"
                                    sx={{
                                        "@media only screen and (max-width: 400px)": {
                                            fontSize: "14px"
                                        }
                                    }}>
                                    Czy na pewno chcesz usunąć wszystkie projekty?
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={14} 
                            sx={{ 
                                display: "flex", 
                                justifyContent: "flex-end", 
                                gap: "0.75em",
                                 }}>
                            <Button size="medium" variant="contained" onClick={closeDialog} sx={{
                                backgroundColor: "rgb(10, 160, 230)",
                                "&:hover": {
                                    backgroundColor: "rgb(10, 120, 170)"
                                },
                                "@media only screen and (max-width: 400px)": {
                                    fontSize: "10px",
                                    width: "40px",
                                    minWidth: "40px"
                                }
                            }}>
                                Anuluj
                            </Button>
                            <Button size="medium" variant="contained" onClick={deleteFunction} sx={{
                                backgroundColor: "rgb(230, 40, 10)",
                                "&:hover": {
                                    backgroundColor: "rgb(150, 40, 10)"
                                },
                                "@media only screen and (max-width: 400px)": {
                                    fontSize: "10px",
                                    width: "20px",
                                    minWidth: "20px"
                                }
                            }}>
                                Usuń
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default DeleteProjectDialog