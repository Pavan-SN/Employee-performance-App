package com.estuate.Employee_Performance.controller;

import com.estuate.Employee_Performance.service.EmployeePerformanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/performance")
public class EmployeePerformanceController {

    @Autowired
    private EmployeePerformanceService employeeperformanceService;

    @CrossOrigin(origins = "http://localhost:5173/")
    @GetMapping("/percentages")
    public Map<String, Double> getActualPercentages() {
        return employeeperformanceService.calculateActualPercentages();
    }

    @CrossOrigin(origins = "http://localhost:5173/")
    @GetMapping("/adjustments")
    public List<String> getRatingAdjustments() {
        return employeeperformanceService.suggestRatingAdjustments();
    }
}


