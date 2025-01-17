package home.jee_project.auth;

import home.jee_project.users.domain.UserService;
import home.jee_project.users.dtos.requests.LoginRequest;
import home.jee_project.users.dtos.requests.RegisterRequest;
import home.jee_project.users.dtos.responses.LoginResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequestMapping("/api/v1")
@CrossOrigin
public class AuthController {
    @Autowired
    private UserService userService;

    @PostMapping(path = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public LoginResponse login(@RequestBody LoginRequest loginRequest) {
        return userService.loginUser(loginRequest);
    }

    @Validated
    @PostMapping("/register")
    public LoginResponse register(@Valid @RequestBody RegisterRequest registerRequest) {
        return userService.registerUser(registerRequest);
    }
}
