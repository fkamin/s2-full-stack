import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import Project from "../Project";
import NewProjectDialog from "../NewProjectDialog";
import DeleteProjectDialog from "../DeleteProjectDialog";
import DeleteProjectsDialog from "../DeleteProjectsDialog";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DeleteIcon from '@mui/icons-material/Delete';

export function Projects() {
    const baseUrl = "http://localhost/api/v1/projects";
    const [userProjects, setUserProjects] = useState([]);
    const [userProjectsCounter, setUserProjectsCounter] = useState(0);
    const [newProjectDialog, setNewProjectDialog] = useState(false);
    const [deleteProjectDialog, setDeleteProjectDialog] = useState(false);
    const [deleteProjectsDialog, setDeleteProjectsDialog] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState("");
    const [selectedProjectName, setSelectedProjectName] = useState("");
    const [expandedProjects, setExpandedProjects] = useState({});

    const openNewProjectDialog = () => {
        setNewProjectDialog(true);
    };

    const openDeleteProjectDialog = (projectId, projectName) => {
        setDeleteProjectDialog(true);
        setSelectedProjectId(projectId);
        setSelectedProjectName(projectName);
    };

    const openDeleteProjectsDialog = () => {
        setDeleteProjectsDialog(true);
    };

    useEffect(() => {
        const event = { preventDefault: () => { } };
        handleGetUserProjects(event);
        setUserProjectsCounter(userProjects.length);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const event = { preventDefault: () => { } };
        handleGetUserProjects(event);
        // eslint-disable-next-line
    }, [userProjectsCounter]);

    const handleGetUserProjects = async (e) => {
        e.preventDefault();
        const token = "Bearer " + localStorage.getItem("token");

        if (token) {
            try {
                const config = {
                    url: baseUrl,
                    method: "get",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                };

                const res = await axios(config);
                setUserProjects(res.data);
            } catch (error) {
                if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                    localStorage.removeItem("token");
                    window.location.reload();
                }
            }
        }
    };

    const handleDeleteProject = async (e) => {
        e.preventDefault();
        const token = "Bearer " + localStorage.getItem("token");
        const urlWithProjectId = baseUrl + "/" + selectedProjectId;

        if (token) {
            try {
                const config = {
                    url: urlWithProjectId,
                    method: "delete",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                };

                await axios(config);
                setDeleteProjectDialog(false);
                setUserProjectsCounter(userProjectsCounter - 1);
            } catch (error) {
                if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                    localStorage.removeItem("token");
                    window.location.reload();
                }
            }
        }
    };

    const handleDeleteProjects = async (e) => {
        e.preventDefault();
        const token = "Bearer " + localStorage.getItem("token");

        if (token) {
            try {
                const config = {
                    url: baseUrl,
                    method: "delete",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                };

                await axios(config);
                setDeleteProjectsDialog(false);
                setUserProjectsCounter(0);
                setUserProjects([]);
            } catch (error) {
                if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                    localStorage.removeItem("token");
                    window.location.reload();
                }
            }
        }
    };

    const handleAddNewProject = async (e, projectData) => {
        e.preventDefault();
        const token = "Bearer " + localStorage.getItem("token");

        if (token) {
            try {
                const config = {
                    url: baseUrl,
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                    data: JSON.stringify(projectData),
                };

                await axios(config);
                setNewProjectDialog(false);
                setUserProjectsCounter(userProjectsCounter + 1);
            } catch (error) {
                if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                    console.log(error);
                }
            }
        }
    };

    const toggleProject = (projectId) => {
        setExpandedProjects((prevState) => {
            const isExpanded = prevState[projectId] || false;
            return {
                ...prevState,
                [projectId]: !isExpanded,
            };
        });
    };

    const handleEditProperty = async (e, newProjectData, projectId) => {
        const token = "Bearer " + localStorage.getItem("token")
        const urlWithProjectId = baseUrl + "/" + projectId

        if (token) {
            try {
                const config = {
                    url: urlWithProjectId,
                    method: 'put',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    data: JSON.stringify(newProjectData)
                }

                await axios(config)
                handleGetUserProjects(e)
            } catch (error) {
                if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                    console.log(error)
                }
            }
        }
    }

    return (
        <>
            {userProjects.length > 0 && (
                <div className={styles.project_structure}>
                    <div className={styles.project_content}>
                        <div className={styles.your_projects_text}>Twoje projekty</div>
                        <button type="button" className={styles.new_project_button} onClick={openNewProjectDialog}>
                            Stwórz nowy projekt
                        </button>
                        <button type="button" className={styles.delete_projects_button} onClick={openDeleteProjectsDialog}>
                            Usuń wszystkie projekty
                        </button>
                        <div className={styles.projects}>
                            {userProjects.map((project) => (
                                <React.Fragment key={project.id}>
                                    <div className={styles.info}>
                                        {expandedProjects[project.id] ? (
                                            <div className={styles.control_buttons}>
                                                <DeleteIcon
                                                    className={styles.delete_project}
                                                    onClick={() => { openDeleteProjectDialog(project.id, project.title) }} />
                                                <VisibilityOffIcon
                                                    className={styles.hide_project}
                                                    onClick={() => toggleProject(project.id)} />
                                            </div>
                                        ) : (
                                            <>
                                                <div className={styles.project_title}>
                                                    {project.title}
                                                </div>
                                                <div className={styles.visibleOff_button_div}>
                                                    <VisibilityIcon
                                                        className={styles.show_project}
                                                        onClick={() => toggleProject(project.id)} />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    {expandedProjects[project.id] && (
                                        <div key={project.id} className={styles.single_project}>
                                            <Project
                                                key={project.id}
                                                id={project.id}
                                                projectTitle={project.title}
                                                projectDescription={project.description}
                                                openButtonFunction={openNewProjectDialog}
                                                editFunction={handleEditProperty}
                                            />
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                        <button type="button" className={styles.new_project_button} onClick={openNewProjectDialog}>
                            Stwórz nowy projekt
                        </button>
                    </div>
                </div>
            )}
            {userProjects.length === 0 && (
                <div className={styles.project_structure}>
                    <div className={styles.project_content}>
                        <div className={styles.your_projects_text}>Twoje projekty</div>
                        <div className={styles.project_content}>
                            <div className={styles.no_project_notification}>Nie masz żadnych projektów</div>
                            <div className={styles.button_center}>
                                <button type="button" className={styles.new_project_button} onClick={openNewProjectDialog}>
                                    Stwórz nowy projekt
                                </button>
                                <NewProjectDialog openDialog={newProjectDialog} closeDialog={() => setNewProjectDialog(false)} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {deleteProjectDialog && (
                <DeleteProjectDialog
                    openDialog={deleteProjectDialog}
                    closeDialog={() => setDeleteProjectDialog(false)}
                    deleteFunction={handleDeleteProject}
                    projectName={selectedProjectName}
                />
            )}
            {deleteProjectsDialog && (
                <DeleteProjectsDialog
                    openDialog={deleteProjectsDialog}
                    closeDialog={() => setDeleteProjectsDialog(false)}
                    deleteFunction={handleDeleteProjects}
                />
            )}
            {newProjectDialog && (
                <NewProjectDialog
                    openDialog={newProjectDialog}
                    closeDialog={() => setNewProjectDialog(false)}
                    addFunction={handleAddNewProject}
                />
            )}
        </>
    );
}

export default Projects;
