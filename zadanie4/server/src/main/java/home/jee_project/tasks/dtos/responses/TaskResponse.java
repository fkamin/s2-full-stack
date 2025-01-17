package home.jee_project.tasks.dtos.responses;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TaskResponse {
    String id;
    String projectId;
    String createBy;
    String title;
    Boolean isCompleted;
}
