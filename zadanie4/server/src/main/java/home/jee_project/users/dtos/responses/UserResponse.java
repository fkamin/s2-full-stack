package home.jee_project.users.dtos.responses;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    String firstName;
    String lastName;
    String email;
}
