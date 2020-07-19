package com.example.expense_final.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.Instant;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@Table(name = "expense")

public class Expense {

    @Id
    private Long id;

    private Instant expensedate; //date that we're going to tamp the date using time object

    private String descript;

    //format: Id, date, description, user id, Category id.

    @ManyToOne
    private Category category; //many of these expenses goes under one caegory

    @ManyToOne
    private User user; //many expenses goes to one user.
}
