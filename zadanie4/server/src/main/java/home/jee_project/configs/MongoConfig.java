package home.jee_project.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.convert.*;
import org.springframework.data.mongodb.core.mapping.MongoMappingContext;
import org.springframework.data.mongodb.MongoDatabaseFactory;

@Configuration
public class MongoConfig {
    private final MongoDatabaseFactory mongoDatabaseFactory;
    private final MongoMappingContext mongoMappingContext;

    public MongoConfig(MongoDatabaseFactory mongoDatabaseFactory, MongoMappingContext mongoMappingContext) {
        this.mongoDatabaseFactory = mongoDatabaseFactory;
        this.mongoMappingContext = mongoMappingContext;
    }

    @Bean
    public MappingMongoConverter mappingMongoConverter() {
        DbRefResolver dbRefResolver = new DefaultDbRefResolver(mongoDatabaseFactory);
        MappingMongoConverter converter = new MappingMongoConverter(dbRefResolver, mongoMappingContext);
        converter.setTypeMapper((MongoTypeMapper) new DefaultMongoTypeMapper(null));

        return converter;
    }
}

