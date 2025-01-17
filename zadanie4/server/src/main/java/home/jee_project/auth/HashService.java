package home.jee_project.auth;

import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

@Service
public class HashService {
    public Boolean checkBcrypt(String input, String hash) {
        return BCrypt.checkpw(input, hash);
    }

    public String hashBcrypt(String input) {
        return BCrypt.hashpw(input, BCrypt.gensalt(10));
    }
}
