package com.estuate.Employee_Performance.repository;

import com.estuate.Employee_Performance.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepo extends JpaRepository<Employee, Long> {

}
