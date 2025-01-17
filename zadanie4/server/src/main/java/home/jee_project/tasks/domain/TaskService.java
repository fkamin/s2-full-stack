package home.jee_project.tasks.domain;

import home.jee_project.auth.ApiException;
import home.jee_project.auth.AuthExt;
import home.jee_project.projects.domain.Project;
import home.jee_project.projects.domain.ProjectRepository;
import home.jee_project.tasks.dtos.requests.CreateTaskRequest;
import home.jee_project.tasks.dtos.requests.UpdateTaskRequest;
import home.jee_project.tasks.dtos.responses.TaskResponse;
import home.jee_project.users.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private ProjectRepository projectRepository;

    public TaskResponse getTask(Authentication authentication, String projectId, String taskId) {
        User authUser = AuthExt.toUser(authentication);

        validateProjectApiExceptions(projectId, authUser);

        Task task = taskRepository.findById(taskId).orElseThrow(() -> new ApiException(404, "Szukane zadanie nie istnieje"));
        return Task.toTaskResponse(task);
    }

    public List<TaskResponse> getTasksFromProject(Authentication authentication, String projectId) {
        User authUser = AuthExt.toUser(authentication);

        validateProjectApiExceptions(projectId, authUser);

        return taskRepository.findTaskByProjectId(projectId).stream().map(Task::toTaskResponse).toList();
    }

    public ResponseEntity<String> addTask(Authentication authentication, String projectId, CreateTaskRequest createTaskRequest) {
        User authUser = AuthExt.toUser(authentication);

        validateProjectApiExceptions(projectId, authUser);

        Task task = new Task(projectId, authUser.getId(), createTaskRequest.getTitle());
        taskRepository.save(task);

        return ResponseEntity.ok("Pomyślnie dodano zadanie '" + task.title + "' do projektu");
    }

    public ResponseEntity<String> updateTask(
            Authentication authentication,
            String projectId,
            String taskId,
            UpdateTaskRequest updateTaskRequest) {
        User authUser = AuthExt.toUser(authentication);

        validateProjectApiExceptions(projectId, authUser);

        Task task = validateTaskApiExceptionsAndIfValidatedReturnTask(projectId, taskId);
        task.setTitle(updateTaskRequest.getTitle());
        task.setCompleted(updateTaskRequest.getCompleted());

        taskRepository.save(task);
        return ResponseEntity.ok("Pomyślnie zaktualizowano zadanie '" + task.title + "'");
    }

    public ResponseEntity<String> deleteTask(
            Authentication authentication,
            String projectId,
            String taskId) {
        User authUser = AuthExt.toUser(authentication);

        validateProjectApiExceptions(projectId, authUser);

        Task task = validateTaskApiExceptionsAndIfValidatedReturnTask(projectId, taskId);
        String taskName = task.title;

        taskRepository.delete(task);
        return ResponseEntity.ok("Pomyślnie usunięto zadanie '" + taskName + "'");
    }

    public ResponseEntity<String> deleteTasksFromProject(Authentication authentication, String projectId) {
        User authUser = AuthExt.toUser(authentication);

        validateProjectApiExceptions(projectId, authUser);

        taskRepository.deleteTasksByProjectId(projectId);
        return ResponseEntity.ok("Pomyślnie usunięto wszystkie zadania");
    }

    public void deleteTasksByUserId(String userId) {
        taskRepository.deleteTasksByCreatedBy(userId);
    }

    private void validateProjectApiExceptions(String projectId, User authUser) {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new ApiException(404, "Szukany projekt nie istnieje"));
        if (!Objects.equals(authUser.getId(), project.getCreatedBy())) throw new ApiException(403, "To nie jest twój projekt");
    }

    private Task validateTaskApiExceptionsAndIfValidatedReturnTask(String projectId, String taskId) {
        Task task = taskRepository.findById(taskId).orElseThrow(() -> new ApiException(404, "Szukane zadanie nie istnieje"));
        if (!Objects.equals(task.projectId, projectId)) throw new ApiException(403, "To nie jest twoje zadanie");

        return task;
    }

}
