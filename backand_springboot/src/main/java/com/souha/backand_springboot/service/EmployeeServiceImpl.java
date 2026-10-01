package com.souha.backand_springboot.service;

import com.souha.backand_springboot.persistence.model.Employee;
import com.souha.backand_springboot.persistence.repo.employeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private employeeRepository repo;

    @Override
    public Employee save(Employee employee) {
        return repo.save(employee);
    }

    @Override
    public List<Employee> getAll() {
        return (List<Employee>) repo.findAll();
    }

    @Override
    public Employee getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public Employee update(Long id, Employee employee) {
        Employee existing = repo.findById(id).orElse(null);
        if (existing != null) {
            existing.setFirstName(employee.getFirstName());
            existing.setLastName(employee.getLastName());
            existing.setEmail(employee.getEmail());
      
            return repo.save(existing);
        }
        return null;
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }
}