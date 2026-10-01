/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.souha.backand_springboot.persistence.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.souha.backand_springboot.persistence.model.Employee;


@Repository
public interface employeeRepository extends CrudRepository<Employee, Long> {
	
	Employee findByEmail(String mail);

}
