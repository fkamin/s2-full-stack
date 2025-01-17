package home.jee_project.tasks.dtos.requests;

public class UpdateTaskRequest {
    String title;
    Boolean isCompleted;

    public String getTitle() {
        return title;
    }

    public Boolean getCompleted() {
        return isCompleted;
    }
}
