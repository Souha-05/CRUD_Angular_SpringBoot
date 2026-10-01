package com.souha.backand_springboot.service;

import com.souha.backand_springboot.persistence.model.User;
import com.souha.backand_springboot.persistence.repo.userRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private userRepository repo;

    @Override
    public User save(User user) {
        return repo.save(user);
    }

    @Override
    public List<User> getAll() {
        return (List<User>) repo.findAll();
    }

    @Override
    public User getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public User update(Long id, User user) {
        User existing = repo.findById(id).orElse(null);
        if (existing != null) {
            existing.setFirstName(user.getFirstName());
            existing.setLastName(user.getLastName());
            existing.setEmail(user.getEmail());
            existing.setPassword(user.getPassword());
            return repo.save(existing);
        }
        return null;
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }

    @Override
    public User findByEmail(String email) {
        return repo.findByEmail(email);
    }
}
