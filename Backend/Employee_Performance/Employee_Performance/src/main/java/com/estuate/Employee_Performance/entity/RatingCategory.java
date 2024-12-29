package com.estuate.Employee_Performance.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;


@Entity
public class RatingCategory {

    @Id
    private String category;
    private double standardPercentage;
    private double actualPercentage;

    public RatingCategory() {

    }

    @Override
    public String toString() {
        return "RatingCategory{" +
                "category='" + category + '\'' +
                ", standardPercentage=" + standardPercentage +
                ", actualPercentage=" + actualPercentage +
                '}';
    }

    public RatingCategory(String category, double standardPercentage, double actualPercentage) {
        this.category = category;
        this.standardPercentage = standardPercentage;
        this.actualPercentage = actualPercentage; // Ensure actual percentage is set
    }

    public RatingCategory(String category) {
        this.category = category;
    }

    public double getActualPercentage() {
        return actualPercentage;
    }

    public void setActualPercentage(double actualPercentage) {
        this.actualPercentage = actualPercentage;
    }

    public double getStandardPercentage() {
        return standardPercentage;
    }

    public void setStandardPercentage(double standardPercentage) {
        this.standardPercentage = standardPercentage;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}

