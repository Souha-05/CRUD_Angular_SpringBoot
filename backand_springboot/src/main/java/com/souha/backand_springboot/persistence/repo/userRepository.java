package com.souha.backand_springboot.persistence.repo;

import com.souha.backand_springboot.persistence.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface userRepository extends CrudRepository<User, Long> {
    User findByEmail(String email);
}
