package home.jee_project.auth;

import home.jee_project.users.domain.User;
import org.springframework.security.core.Authentication;

public class AuthExt {
    public static User toUser(Authentication authentication) {
        return (User) authentication.getPrincipal();
    }
}
