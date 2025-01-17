package home.jee_project.users.domain;

import home.jee_project.users.dtos.responses.UserResponse;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    String id = null;
    String firstName;
    String lastName;
    String email;
    String password;

    public User(String firstName, String lastName, String email, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    public static UserResponse toUserResponse(User user) {
        return new UserResponse(user.firstName, user.lastName, user.email);
    }
}
