package home.jee_project.tasks.domain;

import home.jee_project.tasks.dtos.responses.TaskResponse;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "tasks")
public class Task {
    @Id
    String id;
    String projectId;
    String createdBy;
    String title;
    Boolean isCompleted;

    public Task(String projectId, String createdBy, String title) {
        this.projectId = projectId;
        this.createdBy = createdBy;
        this.title = title;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Boolean getCompleted() {
        return isCompleted;
    }

    public void setCompleted(Boolean completed) {
        isCompleted = completed;
    }

    public static TaskResponse toTaskResponse(Task task) {
        return new TaskResponse(task.id, task.projectId, task.createdBy, task.title, task.isCompleted);
    }
}
