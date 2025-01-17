package home.jee_project.auth;

import org.springframework.web.server.ResponseStatusException;

public class ApiException extends ResponseStatusException {
    public ApiException(int code, String message) {
        super(code, message, null);
    }
}
