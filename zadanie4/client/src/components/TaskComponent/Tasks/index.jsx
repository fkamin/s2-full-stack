import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import Task from "../Task";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function Tasks({ projectId }) {
    const baseUrl = "http://localhost/api/v1/projects";
    const [projectTasksCounter, setProjectTasksCounter] = useState(0);
    const [projectTasks, setProjectTasks] = useState([]);
    const [showTasks, setShowTasks] = useState(false);
    const [newTask, setNewTask] = useState({
        title: "",
        isCompleted: false
    });


    const toggleShowTasks = () => {
        setShowTasks(!showTasks);
    };

    const handleChange = (event) => {
        setNewTask((prevTask) => {
            const updatedTask = { ...prevTask };
            updatedTask["title"] = event.target.value;
            return updatedTask;
        });
    };

    useEffect(() => {
        const event = { preventDefault: () => { } };
        handleGetProjectTasks(event);
        setProjectTasksCounter(projectTasks.length);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const event = { preventDefault: () => { } };
        handleGetProjectTasks(event);
        // eslint-disable-next-line
    }, [projectTasksCounter]);

    const handleGetProjectTasks = async (e) => {
        e.preventDefault();
        const token = "Bearer " + localStorage.getItem("token");
        const urlWithProjectIdAndTasks = baseUrl + "/" + projectId + "/tasks";
        if (token) {
            try {
                const config = {
                    url: urlWithProjectIdAndTasks,
                    method: "get",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                };

                const result = await axios(config);
                setProjectTasks(result.data);
            } catch (error) {
                if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                    console.log(error);
                }
            }
        }
    };

    const handleAddTask = async (e) => {
        if (newTask.title === "") return;
        e.preventDefault();
        const token = "Bearer " + localStorage.getItem("token");
        const urlWithProjectIdAndTasks = baseUrl + "/" + projectId + "/tasks";

        if (token) {
            try {
                const config = {
                    url: urlWithProjectIdAndTasks,
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                    data: JSON.stringify(newTask),
                };

                await axios(config);
                setNewTask({
                    title: "",
                    isCompleted: false,
                });
                setProjectTasksCounter(projectTasksCounter + 1);
            } catch (error) {
                if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                    console.log(error);
                }
            }
        }
    };

    const handleDeleteTask = async (projectId, taskId) => {
        const token = "Bearer " + localStorage.getItem("token");
        const urlWithProjectIdAndTasks = baseUrl + "/" + projectId + "/tasks/" + taskId;

        if (token) {
            try {
                const config = {
                    url: urlWithProjectIdAndTasks,
                    method: "delete",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                };

                await axios(config);
                setProjectTasksCounter(projectTasksCounter - 1);
            } catch (error) {
                if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                    console.log(error);
                }
            }
        }
    };

    const handleChangeIsCompleted = async (updatedTask, projectId, taskId) => {
        const token = "Bearer " + localStorage.getItem("token");
        const urlWithProjectIdAndTasks = baseUrl + "/" + projectId + "/tasks/" + taskId;

        if (token) {
            try {
                const config = {
                    url: urlWithProjectIdAndTasks,
                    method: "put",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                    data: JSON.stringify(updatedTask),
                };

                const result = await axios(config);
                console.log(result);
            } catch (error) {
                if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                    console.log(error);
                }
            }
        }
    };

    const handleEditTask = async (newTask, projectId, taskId) => {
        const token = "Bearer " + localStorage.getItem("token");
        const urlWithProjectIdAndTasks = baseUrl + "/" + projectId + "/tasks/" + taskId;

        if (token) {
            try {
                const config = {
                    url: urlWithProjectIdAndTasks,
                    method: "put",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                    data: JSON.stringify(newTask),
                };

                await axios(config);
                setProjectTasksCounter(projectTasksCounter + 1);
            } catch (error) {
                if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                    console.log(error);
                }
            }
        }
    };

    return (
        <>
            <div className={styles.task_list}>
                <div className={styles.info}>
                    <div className={styles.your_tasks_text}>
                        Twoja lista zadań
                    </div>
                    <div className={styles.buttons}>
                        {showTasks ? (
                            <VisibilityOffIcon
                                className={styles.hide_tasks}
                                onClick={toggleShowTasks} />
                        ) : (
                            <VisibilityIcon
                                className={styles.show_tasks}
                                onClick={toggleShowTasks} />
                        )}
                    </div>
                </div>
                {showTasks && (
                    <div className={styles.add_task}>
                        <input
                            type="text"
                            name="task"
                            className={styles.edit_input}
                            value={newTask.title}
                            placeholder="Wpisz treść zadania"
                            onChange={handleChange}
                        />
                        <button type="button" className={styles.new_task_button} onClick={handleAddTask}>
                            Dodaj zadanie
                        </button>
                    </div>
                )}
                {showTasks && projectTasks.length > 0 && (
                    <div className={styles.task}>
                        {projectTasks.map((task) => (
                            <React.Fragment key={task.id}>
                                <div key={task.id} className={styles.single_task}>
                                    <Task
                                        key={task.id}
                                        taskId={task.id}
                                        taskTitle={task.title}
                                        projectId={projectId}
                                        taskIsCompleted={task.isCompleted}
                                        deleteFunction={handleDeleteTask}
                                        isCompletedFunction={handleChangeIsCompleted}
                                        editFunction={handleEditTask}
                                    />
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default Tasks;
