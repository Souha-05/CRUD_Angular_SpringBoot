package com.souha.backand_springboot.service;

import com.souha.backand_springboot.persistence.model.User;

import java.util.List;

public interface UserService {
    User save(User user);
    List<User> getAll();
    User getById(Long id);
    User update(Long id, User user);
    void delete(Long id);
    User findByEmail(String email);
}
