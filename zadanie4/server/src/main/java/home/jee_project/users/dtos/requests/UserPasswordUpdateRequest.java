package home.jee_project.users.dtos.requests;

public class UserPasswordUpdateRequest {
    String currentPassword;
    String newPassword;

    public String getCurrentPassword() {
        return currentPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }
}
