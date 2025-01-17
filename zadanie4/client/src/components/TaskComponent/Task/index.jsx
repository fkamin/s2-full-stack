import React, { useState } from "react"
import styles from "./styles.module.css"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';

function Task({ taskId, taskTitle, projectId, taskIsCompleted, deleteFunction, isCompletedFunction, editFunction }) {
    const [isCompleted, setIsCompleted] = useState(taskIsCompleted)
    const [isOpenTitleEdit, setIsOpenTitleEdit] = useState(false)
    const [newTask, setNewTask] = useState({
        title: taskTitle,
        isCompleted: taskIsCompleted
    })

    const handleOpenEditTitle = () => { setIsOpenTitleEdit(true) }
    const handleCloseEditTitle = () => { 
        setIsOpenTitleEdit(false)
        if (newTask.title === taskTitle || newTask.title === "") return
        else editFunction(newTask, projectId, taskId)
    }

    const handleChange = (event) => {
        const value = event.target.value

        setNewTask((prevTask) => {
            const updatedTask = { ...prevTask }
            updatedTask["title"] = value
            return updatedTask
        })
    }

    const handleChangeIsComplited = () => {
        const updatedIsCompleted = !isCompleted;
        setIsCompleted(updatedIsCompleted);

        const updatedTask = {
            title: taskTitle,
            isCompleted: updatedIsCompleted
        };

        isCompletedFunction(updatedTask, projectId, taskId);
    }

    return (
        <div className={styles.task_content}>
            <div className={`${styles.task_name} ${isCompleted ? styles.completed : ""}`}>
                {isOpenTitleEdit !== true ? (
                    <span onClick={handleChangeIsComplited}>{taskTitle}</span>
                ) : (
                    <input
                        className={styles.input_edit}
                        value={newTask.title}
                        onChange={handleChange}
                        autoFocus></input>
                )}
            </div>
            <div className={styles.task_buttons}>
                {isOpenTitleEdit !== true ? (
                    <>
                        <EditIcon
                            className={styles.edit_button}
                            onClick={handleOpenEditTitle} />
                        <HighlightOffIcon
                            className={styles.delete_button}
                            onClick={() => { deleteFunction(projectId, taskId) }} />
                    </>
                ) : (
                    <CheckIcon
                        className={styles.confirm_edit_button}
                        onClick={handleCloseEditTitle} />
                )}
            </div>
        </div>
    )
}

export default Task