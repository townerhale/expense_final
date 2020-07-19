package com.example.expense_final.repository;
//used for databse connection

import com.example.expense_final.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

//we're trying to connect a category to a database. once you extend now everything is connected
//Type Long is because of the id of the category
public interface CategoryRepository extends JpaRepository<Category, Long> {

    Category findByName(String name); //we have a field called name so make findByField changes to findByName
}
