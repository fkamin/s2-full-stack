import React, { useState, useEffect, useRef } from "react"
import styles from "./styles.module.css"
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import Tasks from "../../TaskComponent/Tasks"

function Project({ projectTitle, projectDescription, id, editFunction }) {
    const [isOpenPropertyEdit, setIsOpenPropertyEdit] = useState(false)
    const [editPropertyName, setEditPropertyName] = useState("")
    const [originalProjectData, setOriginalProjectData] = useState({
        title: projectTitle,
        description: projectDescription
    })

    const [newProjectData, setNewProjectData] = useState({
        title: projectTitle,
        description: projectDescription
    })

    const textareaRef = useRef(null);

    useEffect(() => {
        adjustTextareaHeight();
    }, [newProjectData.description, newProjectData.title]);

    const adjustTextareaHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    const handleOpenEditProperty = (propertyName) => {
        setIsOpenPropertyEdit(true)
        setEditPropertyName(propertyName)
    }

    const handleCloseEditProperty = () => {
        setIsOpenPropertyEdit(false)
        setNewProjectData(originalProjectData)
    }

    const handleChange = (event) => {
        const value = event.target.value
        const name = event.target.name

        setNewProjectData((prevProjectData) => {
            const updatedProjectData = { ...prevProjectData }
            updatedProjectData[name] = value
            return updatedProjectData
        })
    }

    const handleConfirmEditProperty = (propertyName) => {
        if (propertyName !== "description") {
            if (newProjectData[propertyName] === "" || newProjectData[propertyName] === originalProjectData[propertyName]) {
                handleCloseEditProperty()
                return
            }
        }
    
        const event = { preventDefault: () => { } };
        editFunction(event, newProjectData, id)
        setNewProjectData(newProjectData)
        setOriginalProjectData(newProjectData)
        setIsOpenPropertyEdit(false)
    }

    return (
        <>
            <div className={styles.project_title}>
                <div className={styles.title_word}>Nazwa projektu</div>
                <div className={styles.title_value}>
                    {isOpenPropertyEdit === true && editPropertyName === "title" ? (
                        <textarea
                            ref={textareaRef}
                            type="text"
                            name="title"
                            className={styles.edit_input}
                            autoFocus={true}
                            value={newProjectData.title}
                            onChange={handleChange}></textarea>
                    ) : (<span>{newProjectData.title}</span>)}
                </div>
                <div className={styles.icons}>
                    {isOpenPropertyEdit === true && editPropertyName === "title" ? (
                        <>
                            <CheckIcon
                                className={styles.confirm_button}
                                onClick={() => { handleConfirmEditProperty("title") }} />
                            <CloseIcon
                                className={styles.cancel_button}
                                onClick={() => { handleCloseEditProperty() }} />
                        </>
                    ) : (
                        <>
                            <EditIcon
                                className={styles.edit_button}
                                onClick={() => { handleOpenEditProperty("title") }} />
                        </>)}
                </div>
            </div>
            <hr className={styles.project_hr} />
            <div className={styles.project_description}>
                <div className={styles.description_word}>Opis</div>
                <div className={styles.description_value}>
                    {isOpenPropertyEdit === true && editPropertyName === "description" ? (
                        <textarea
                            ref={textareaRef}
                            type="text"
                            name="description"
                            className={styles.edit_input}
                            autoFocus={true}
                            value={newProjectData.description}
                            onChange={handleChange}></textarea>
                    ) : (<span>{newProjectData.description}</span>)}
                </div>
                <div className={styles.icons}>
                    {isOpenPropertyEdit === true && editPropertyName === "description" ? (
                        <>
                            <CheckIcon
                                className={styles.confirm_button}
                                onClick={() => { handleConfirmEditProperty("description") }} />
                            <CloseIcon
                                className={styles.cancel_button}
                                onClick={() => { handleCloseEditProperty() }} />
                        </>
                    ) : (
                        <>
                            <EditIcon
                                className={styles.edit_button}
                                onClick={() => { handleOpenEditProperty("description") }} />
                        </>)}
                </div>
            </div>
            <Tasks projectId={id} />
        </>
    )
}

export default Project