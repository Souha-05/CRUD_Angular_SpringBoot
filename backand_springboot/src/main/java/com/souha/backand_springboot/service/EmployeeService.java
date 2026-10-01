package com.souha.backand_springboot.service;

import com.souha.backand_springboot.persistence.model.Employee;
import java.util.List;

public interface EmployeeService {
    Employee save(Employee employee);
    List<Employee> getAll();
    Employee getById(Long id);
    Employee update(Long id, Employee employee);
    void delete(Long id);
}