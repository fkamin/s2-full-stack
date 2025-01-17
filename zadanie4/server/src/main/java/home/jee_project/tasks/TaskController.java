package home.jee_project.tasks;

import home.jee_project.tasks.domain.TaskService;
import home.jee_project.tasks.dtos.requests.CreateTaskRequest;
import home.jee_project.tasks.dtos.requests.UpdateTaskRequest;
import home.jee_project.tasks.dtos.responses.TaskResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/projects")
@SecurityRequirement(name = "Bearer Authentication")
@CrossOrigin
public class TaskController {
    @Autowired
    private TaskService taskService;

    @GetMapping("/{projectId}/tasks/{taskId}")
    public TaskResponse getTask(
            Authentication authentication,
            @PathVariable String projectId,
            @PathVariable String taskId) {
        return taskService.getTask(authentication, projectId, taskId);
    }

    @GetMapping("/{projectId}/tasks")
    public List<TaskResponse> getTasksFromProject(
            Authentication authentication,
            @PathVariable String projectId) {
        return taskService.getTasksFromProject(authentication, projectId);
    }

    @PostMapping("/{projectId}/tasks")
    public ResponseEntity<String> addTask(
            Authentication authentication,
            @PathVariable String projectId,
            @RequestBody CreateTaskRequest createTaskRequest) {
        return taskService.addTask(authentication, projectId, createTaskRequest);
    }

    @PutMapping("/{projectId}/tasks/{taskId}")
    public ResponseEntity<String> updateTask(
            Authentication authentication,
            @PathVariable String projectId,
            @PathVariable String taskId,
            @RequestBody UpdateTaskRequest updateTaskRequest) {
        return taskService.updateTask(authentication, projectId, taskId, updateTaskRequest);
    }

    @DeleteMapping("/{projectId}/tasks/{taskId}")
    public ResponseEntity<String> deleteTask(
            Authentication authentication,
            @PathVariable String projectId,
            @PathVariable String taskId) {
        return taskService.deleteTask(authentication, projectId, taskId);
    }

    @DeleteMapping("/{projectId}/tasks")
    public ResponseEntity<String> deleteTasksFromProject(
            Authentication authentication,
            @PathVariable String projectId) {
        return taskService.deleteTasksFromProject(authentication, projectId);
    }
}
