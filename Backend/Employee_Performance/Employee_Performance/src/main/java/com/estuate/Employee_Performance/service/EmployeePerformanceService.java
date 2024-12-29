package com.estuate.Employee_Performance.service;

import com.estuate.Employee_Performance.entity.Employee;
import com.estuate.Employee_Performance.entity.RatingCategory;
import com.estuate.Employee_Performance.repository.EmployeeRepo;
import com.estuate.Employee_Performance.repository.RatingCategoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class EmployeePerformanceService {

    @Autowired
    private EmployeeRepo employeeRepo;

    @Autowired
    private RatingCategoryRepo ratingCategoryRepo;

    public Map<String, Double> calculateActualPercentages() {

        List<Employee> employees = employeeRepo.findAll();
        System.out.println("Employees: " + employees);

        if (employees.isEmpty()) {

            return Map.of();
        }

        Map<String, Long> counts = employees.stream()
                .filter(employee -> {
                    boolean valid = employee.getCategory() != null && employee.getCategory().getCategory() != null;
                    System.out.println("Employee: " + employee + ", Valid: " + valid);
                    return valid;
                })
                .collect(Collectors.groupingBy(

                        employee -> employee.getCategory().getCategory(),
                        Collectors.counting()
                ));

        System.out.println("Counts: " + counts);

        long totalEmployees = employees.size();
        System.out.println("Total Employees: " + totalEmployees);

        return counts.entrySet().stream()
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        entry -> (entry.getValue() * 100.0) / totalEmployees
                ));
    }

    public List<String> suggestRatingAdjustments() {
        Map<String, Double> actualPercentages = calculateActualPercentages();
        List<RatingCategory> categories = ratingCategoryRepo.findAll();

        List<String> adjustments = new ArrayList<>();
        for (RatingCategory category : categories) {
            double actual = actualPercentages.getOrDefault(category.getCategory(), 0.0);
            double deviation = actual - category.getStandardPercentage();

            System.out.println("Category: " + category.getCategory() + ", Actual: " + actual + ", Deviation: " + deviation);
            adjustments.add("Adjust category " + category.getCategory() + " by " + deviation + "%");
        }
        return adjustments;
    }
}



