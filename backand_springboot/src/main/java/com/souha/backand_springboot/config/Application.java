package com.souha.backand_springboot.config;

import org.springframework.boot.SpringApplication; 
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories("com.souha.backand_springboot.persistence.repo")
@EntityScan("com.souha.backand_springboot.persistence.model")
@SpringBootApplication(scanBasePackages = {"com.souha.backand_springboot"})
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
