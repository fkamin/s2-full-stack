package home.jee_project.projects;

import home.jee_project.projects.domain.ProjectService;
import home.jee_project.projects.dtos.requests.CreateProjectRequest;
import home.jee_project.projects.dtos.requests.UpdateProjectRequest;
import home.jee_project.projects.dtos.responses.ProjectResponse;
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
public class ProjectController {
    @Autowired
    private ProjectService projectService;

    @PostMapping
    public ResponseEntity<String> addProject(Authentication authentication, @RequestBody CreateProjectRequest createProjectRequest) {
        return projectService.addProject(authentication, createProjectRequest);
    }

    @GetMapping("/{projectId}")
    public ProjectResponse getProject(Authentication authentication, @PathVariable String projectId) {
        return projectService.getProject(authentication, projectId);
    }

    @GetMapping
    public List<ProjectResponse> getProjects(Authentication authentication) {
        return projectService.getProjectsByUser(authentication);
    }

    @PutMapping("/{projectId}")
    public ResponseEntity<String> updateProject(
            Authentication authentication,
            @PathVariable String projectId,
            @RequestBody UpdateProjectRequest updateProjectRequest) {
        return projectService.updateProject(authentication, projectId, updateProjectRequest);
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<String> deleteProject(Authentication authentication, @PathVariable String projectId) {
        return projectService.deleteProject(authentication, projectId);
    }

    @DeleteMapping
    public ResponseEntity<String> deleteProjects(Authentication authentication) {
        return projectService.deleteProjects(authentication);
    }
}
