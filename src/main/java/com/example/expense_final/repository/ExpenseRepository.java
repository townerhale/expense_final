package com.example.expense_final.repository;
import com.example.expense_final.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

//we're trying to connect a expense to a database. once you extend now everything is connected
//Type Long is because of the id of the expense
public interface ExpenseRepository extends JpaRepository<Expense, Long>{ //long is due to id
}
