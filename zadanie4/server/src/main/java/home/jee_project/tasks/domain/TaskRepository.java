package home.jee_project.tasks.domain;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface TaskRepository extends MongoRepository<Task, String> {
    List<Task> findTaskByProjectId(String projectId);

    void deleteTasksByProjectId(String projectId);

    void deleteTasksByCreatedBy(String createdBy);
}
