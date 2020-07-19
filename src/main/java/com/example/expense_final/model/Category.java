package com.example.expense_final.model;
import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data; //creates the setters and getters
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data

@Table(name = "category")
public class Category{

    @Id
    private Long Id;

    @NonNull //valides making sure you must provide a name
    private String name; //category name something like Travel, Grocery

    /*@ManyToOne(cascade= CascadeType.PERSIST)//when u add the category you need to add the user so it affects both tables
    private User user; //many categories connected to one user. */
}