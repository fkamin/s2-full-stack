package home.jee_project.projects.dtos.responses;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProjectResponse {
    String id;
    String createdBy;
    String title;
    String description;
}
