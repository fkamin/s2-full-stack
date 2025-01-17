package home.jee_project.projects.domain;

import home.jee_project.auth.ApiException;
import home.jee_project.auth.AuthExt;
import home.jee_project.projects.dtos.requests.CreateProjectRequest;
import home.jee_project.projects.dtos.requests.UpdateProjectRequest;
import home.jee_project.projects.dtos.responses.ProjectResponse;
import home.jee_project.tasks.domain.TaskRepository;
import home.jee_project.users.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private TaskRepository taskRepository;

    public ResponseEntity<String> addProject(Authentication authentication, CreateProjectRequest createProjectRequest) {
        User authUser = AuthExt.toUser(authentication);

        Project project = new Project(createProjectRequest.getTitle(), createProjectRequest.getDescription(), authUser.getId());

        projectRepository.save(project);
        return ResponseEntity.ok("Pomyślnie utworzono projekt '" + createProjectRequest.getTitle() + "'");
    }

    public ProjectResponse getProject(Authentication authentication, String projectId) {
        User authUser = AuthExt.toUser(authentication);
        Project project = validateProjectAuthentication(projectId, authUser);

        return Project.toProjectResponse(project);
    }

    public List<ProjectResponse> getProjectsByUser(Authentication authentication) {
        User authUser = AuthExt.toUser(authentication);

        return projectRepository.findProjectsByCreatedBy(authUser.getId()).stream().map(Project::toProjectResponse).toList();
    }

    public ResponseEntity<String> updateProject(Authentication authentication, String projectId, UpdateProjectRequest updateProjectRequest) {
        User authUser = AuthExt.toUser(authentication);
        Project project = validateProjectAuthentication(projectId, authUser);

        project.setTitle(updateProjectRequest.getTitle());
        project.setDescription(updateProjectRequest.getDescription());

        projectRepository.save(project);
        return ResponseEntity.ok("Pomyślnie zaktualizowano projekt '" + updateProjectRequest.getTitle() + "'");
    }

    public ResponseEntity<String> deleteProject(Authentication authentication, String projectId) {
        User authUser = AuthExt.toUser(authentication);
        Project project = validateProjectAuthentication(projectId, authUser);
        String projectName = project.title;

        taskRepository.deleteTasksByProjectId(projectId);
        projectRepository.delete(project);

        return ResponseEntity.ok("Pomyślnie usunięto projekt '" + projectName + "'");
    }

    public ResponseEntity<String> deleteProjects(Authentication authentication) {
        User authUser = AuthExt.toUser(authentication);
        List<Project> projects = projectRepository.findProjectsByCreatedBy(authUser.getId());

        for (Project project : projects) {
            taskRepository.deleteTasksByProjectId(project.id);
        }
        projectRepository.deleteAll(projects);

        return ResponseEntity.ok("Pomyślnie usunięto projekty");
    }

    private Project validateProjectAuthentication(String projectId, User authUser) {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new ApiException(404, "Szukany projekt nie istnieje"));
        if (!Objects.equals(authUser.getId(), project.createdBy)) throw new ApiException(403, "To nie jest twój projekt");
        return project;
    }
}
