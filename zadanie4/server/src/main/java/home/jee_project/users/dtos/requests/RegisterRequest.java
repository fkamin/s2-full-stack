package home.jee_project.users.dtos.requests;

import jakarta.validation.constraints.Pattern;

public class RegisterRequest {
    @Pattern(regexp = "^[A-Z][a-z]{2,}(-[A-Z][a-z]{2,})?$", message = "Invalid firstName format")
    String firstName;
    @Pattern(regexp = "^[A-Z][a-z]{2,}(-[A-Z][a-z]{2,})?$", message = "Invalid lastName format")
    String lastName;
    @Pattern(regexp = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$", message = "Invalid email format")
    String email;
    @Pattern(regexp = "^.{8,}$", message = "Password must be at least 8 characters long")
    String password;

    public RegisterRequest(String firstName, String lastName, String email, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
