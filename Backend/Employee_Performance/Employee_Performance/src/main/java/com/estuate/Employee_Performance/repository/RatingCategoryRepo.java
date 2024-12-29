package com.estuate.Employee_Performance.repository;

import com.estuate.Employee_Performance.entity.RatingCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RatingCategoryRepo extends JpaRepository<RatingCategory, String> {

}
