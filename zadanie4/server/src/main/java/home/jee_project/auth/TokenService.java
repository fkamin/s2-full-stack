package home.jee_project.auth;

import home.jee_project.users.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.security.oauth2.server.resource.InvalidBearerTokenException;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Validated
@Service
public class TokenService {
    @Autowired
    private JwtEncoder jwtEncoder;

    @Autowired
    private JwtDecoder jwtDecoder;

    public String createToken(User user) {
        JwsHeader jwtHeader = JwsHeader.with(() -> "HS256").build();
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuedAt(Instant.now())
                .expiresAt(Instant.now().plus(1L, ChronoUnit.HOURS))
                .subject(user.getEmail())
                .claim("userId", user.getId())
                .build();
        return jwtEncoder.encode(JwtEncoderParameters.from(jwtHeader, claims)).getTokenValue();
    }

    public String parseToken(String token) {
        try {
            Jwt jwt = jwtDecoder.decode(token);
            return (String) jwt.getClaims().get("userId");
        } catch (Exception e) {
            System.out.println("Error decoding token: " + e.getMessage());
            throw new InvalidBearerTokenException("Invalid token", e);
        }
    }

}
