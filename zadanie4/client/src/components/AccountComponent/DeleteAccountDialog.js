import { Box, Button, Dialog, DialogContent, Fade, Grid, IconButton, Typography } from "@mui/material";
import React, { forwardRef } from "react";

const Transition = forwardRef(function Transition(props, ref) {
    return <Fade ref={ref} {...props} />
})

function DeleteAccountDialog({ openDialog, closeDialog, deleteFunction }) {
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
                        backgroundColor: "rgb(200, 200, 200)",
                        "@media only screen and (max-width: 300px)": {
                            minWidth: "200px",
                            width: "200px",
                            textAlign: "center"
                        }
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
                            }
                        }}>X</IconButton>
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
                                    variant="h5"
                                    sx={{
                                        "@media only screen and (max-width: 300px)": {
                                            fontSize: "16px"
                                        }
                                    }}>Czy na pewno chcesz usunąć konto?</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={14} sx={{ display: "flex", justifyContent: "flex-end", gap: "0.75em" }}>
                            <Button size="medium" variant="contained" onClick={closeDialog} sx={{
                                backgroundColor: "rgb(10, 160, 230)",
                                "&:hover": {
                                    backgroundColor: "rgb(10, 120, 170)"
                                },
                                "@media only screen and (max-width: 300px)": {
                                    fontSize: "10px"
                                }
                            }}>Anuluj</Button>
                            <Button size="medium" variant="contained" onClick={deleteFunction} sx={{
                                backgroundColor: "rgb(230, 40, 10)",
                                "&:hover": {
                                    backgroundColor: "rgb(150, 40, 10)"
                                },
                                "@media only screen and (max-width: 300px)": {
                                    fontSize: "10px"
                                }
                            }}>Usuń</Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default DeleteAccountDialog