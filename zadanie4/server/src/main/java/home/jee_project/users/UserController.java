package home.jee_project.users;

import home.jee_project.users.domain.UserService;
import home.jee_project.users.dtos.requests.UserPasswordUpdateRequest;
import home.jee_project.users.dtos.requests.UserUpdateRequest;
import home.jee_project.users.dtos.responses.UserResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

@RestController
@RequestMapping("/api/v1/users")
@SecurityRequirement(name = "Bearer Authentication")
@CrossOrigin
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/{userId}")
    public UserResponse getUser(Authentication authentication, @PathVariable String userId) {
        return userService.getUser(authentication, userId);
    }

    @PutMapping("/{userId}/change-data")
    public ResponseEntity<String> updateUser(
            Authentication authentication,
            @PathVariable String userId,
            @RequestBody UserUpdateRequest userUpdateRequest) {
        return userService.updateUser(authentication, userId, userUpdateRequest);
    }

    @PutMapping("/{userId}/change-password")
    public ResponseEntity<String> changePassword(
            Authentication authentication,
            @PathVariable String userId,
            @RequestBody UserPasswordUpdateRequest userPasswordUpdateRequest) {
        return userService.changePassword(authentication, userId, userPasswordUpdateRequest);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<String> deleteUser(Authentication authentication, @PathVariable String userId) {
        return userService.deleteUser(authentication, userId);
    }
}
