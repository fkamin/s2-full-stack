package home.jee_project.projects.domain;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ProjectRepository extends MongoRepository<Project, String> {
    List<Project> findProjectsByCreatedBy(String userId);
}
