package com.example.expense_final.model;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.Set;

@AllArgsConstructor//creates a constructor for all of it.
@NoArgsConstructor //need to have empty constructor to make JPA happy
@Entity //JPA knows intention to build a table
@Data //generates getters and setters .
@Table(name = "user") //tells what name to use.
public class User {
    @Id //primary key, supplies it manually
    private Long id;

    private String name;

    private String email;

    @OneToMany //one user can have many categories
    private Set<Category> category;
}