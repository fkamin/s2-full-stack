package home.jee_project.users.domain;

import home.jee_project.auth.ApiException;
import home.jee_project.auth.AuthExt;
import home.jee_project.auth.HashService;
import home.jee_project.auth.TokenService;
import home.jee_project.projects.domain.ProjectService;
import home.jee_project.tasks.domain.TaskService;
import home.jee_project.users.dtos.requests.LoginRequest;
import home.jee_project.users.dtos.requests.RegisterRequest;
import home.jee_project.users.dtos.requests.UserPasswordUpdateRequest;
import home.jee_project.users.dtos.requests.UserUpdateRequest;
import home.jee_project.users.dtos.responses.LoginResponse;
import home.jee_project.users.dtos.responses.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.security.core.Authentication;

import java.util.Objects;

@Validated
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HashService hashService;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private TaskService taskService;

    public LoginResponse loginUser(LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new ApiException(401, "Error while logging"));

        if (!hashService.checkBcrypt(loginRequest.getPassword(), user.getPassword())) throw new ApiException(401, "Error while logging");

        return new LoginResponse(tokenService.createToken(user));
    }

    public LoginResponse registerUser(RegisterRequest registerRequest) {
        if (userRepository.existsByEmail(registerRequest.getEmail())) throw new ApiException(400, "Email already exists");

        User user = new User(
                registerRequest.getFirstName(),
                registerRequest.getLastName(),
                registerRequest.getEmail(),
                hashService.hashBcrypt(registerRequest.getPassword())
        );

        User savedUser = userRepository.save(user);

        return new LoginResponse(tokenService.createToken(savedUser));
    }

    public UserResponse getUser(Authentication authentication, String userId) {
        User authUser = AuthExt.toUser(authentication);
        User user = validateUserPermission(userId, authUser);

        return User.toUserResponse(user);
    }

    public ResponseEntity<String> updateUser(Authentication authentication, String userId, UserUpdateRequest userUpdateRequest) {
        User authUser = AuthExt.toUser(authentication);
        User user = validateUserPermission(userId, authUser);

        if (userRepository.existsByEmail(userUpdateRequest.getEmail())
                && !Objects.equals(authUser.email, userUpdateRequest.getEmail())) throw new ApiException(400, "Email already exists");

        user.setFirstName(userUpdateRequest.getFirstName());
        user.setLastName(userUpdateRequest.getLastName());
        user.setEmail(userUpdateRequest.getEmail());

        userRepository.save(user);
        return ResponseEntity.ok("Pomyślnie zaktualizowano użytkownika");
    }

    public ResponseEntity<String> changePassword(Authentication authentication, String userId, UserPasswordUpdateRequest userPasswordUpdateRequest) {
        User authUser = AuthExt.toUser(authentication);
        User user = validateUserPermission(userId, authUser);

        if (!hashService.checkBcrypt(userPasswordUpdateRequest.getCurrentPassword(), authUser.password) ||
                hashService.checkBcrypt(userPasswordUpdateRequest.getNewPassword(), authUser.password)) throw new ApiException(404, "Błąd podczas zmiany hasła");

        user.setPassword(hashService.hashBcrypt(userPasswordUpdateRequest.getNewPassword()));

        userRepository.save(user);
        return ResponseEntity.ok("Pomyślnie zaktualizowano hasło");
    }

    public ResponseEntity<String> deleteUser(Authentication authentication, String userId) {
        User authUser = AuthExt.toUser(authentication);
        User user = validateUserPermission(userId, authUser);

        taskService.deleteTasksByUserId(userId);
        projectService.deleteProjects(authentication);
        userRepository.delete(user);

        return ResponseEntity.ok("Pomyślnie usunięto użytkownika");
    }

    public User findUserById(String id) {
        return userRepository.findById(id).orElseThrow(() -> new ApiException(404, "User not found exception"));
    }

    private User validateUserPermission(String userId, User authUser) {
        User user = findUserById(userId);
        if (!Objects.equals(userId, authUser.id)) throw new ApiException(404, "You are not allowed to this user");
        return user;
    }
}
