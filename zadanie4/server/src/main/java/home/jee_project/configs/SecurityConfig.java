package home.jee_project.configs;

import home.jee_project.users.domain.User;
import home.jee_project.users.domain.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.server.resource.InvalidBearerTokenException;
import org.springframework.security.oauth2.server.resource.authentication.BearerTokenAuthenticationToken;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import home.jee_project.auth.TokenService;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Autowired
    private TokenService tokenService;

    @Autowired
    private UserRepository userRepository;

    private static final String[] AUTH_WHITELIST = {
            "/swagger-resources",
            "/swagger-resources/**",
            "/configuration/ui",
            "/configuration/security",
            "/swagger-ui.html",
            "/webjars/**",
            "/v3/api-docs/**",
            "/api/public/**",
            "/api/public/authenticate",
            "/actuator/*",
            "/swagger-ui/**"
    };

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(authorize -> {
            for (String path : AUTH_WHITELIST) {
                authorize.requestMatchers(path).permitAll();
            }
            authorize.requestMatchers(HttpMethod.POST, "/login").permitAll();
            authorize.requestMatchers(HttpMethod.POST, "/register").permitAll();
            authorize.anyRequest().authenticated();
        });

        http.oauth2ResourceServer().jwt();
        http.authenticationManager(auth -> {
            BearerTokenAuthenticationToken jwt = (BearerTokenAuthenticationToken) auth;
            String userId = tokenService.parseToken(jwt.getToken());
            User user = userRepository.findById(userId).orElseThrow(() -> new InvalidBearerTokenException("Invalid token"));
            return new UsernamePasswordAuthenticationToken(user, "", java.util.Collections.singletonList(new SimpleGrantedAuthority("USER")));
        });

        http.cors();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.csrf().disable();
//        http.headers().frameOptions().disable();
//        http.headers().xssProtection().disable();

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(java.util.Arrays.asList("http://localhost/", "http://localhost/api/v1", "http://localhost:3000", "http://localhost:8080", "http://localhost:8080/api/v1"));
        configuration.setAllowedMethods(java.util.Arrays.asList("GET", "POST", "PUT", "DELETE"));
        configuration.setAllowedHeaders(java.util.Arrays.asList("Authorization", "Content-Type", "Access-Control-Allow-Origin"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}