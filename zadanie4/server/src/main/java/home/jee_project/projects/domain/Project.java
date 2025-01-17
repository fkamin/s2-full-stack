package home.jee_project.projects.domain;

import home.jee_project.projects.dtos.responses.ProjectResponse;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "projects")
public class Project {
    @Id
    String id;
    String createdBy;
    String title;
    String description;

    public Project(String title, String description, String createdBy) {
        this.createdBy = createdBy;
        this.title = title;
        this.description = description;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public static ProjectResponse toProjectResponse(Project project) {
        return new ProjectResponse(project.id, project.createdBy, project.title, project.description);
    }

}
