package com.example.expense_final.controller;

import com.example.expense_final.model.Expense;
import com.example.expense_final.repository.ExpenseRepository;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.net.URISyntaxException;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api")
public class ExpenseController {

    @Autowired
    private ExpenseRepository expenseRepository;

    //get the data
    @GetMapping("/expenses")
    List<Expense> getExpenses()
    {
        //this expenseRepository has connection to our database
        return expenseRepository.findAll();
    }

    @DeleteMapping("/expenses/{id}")
    //using ? in java says response entity of whatever you put in
    ResponseEntity<?> deleteExpense(@PathVariable Long id)
    {
        expenseRepository.deleteById(id);
        return ResponseEntity.ok().build(); //means we're not returning anything
    }

    @PostMapping("/expenses") //creates new url
    ResponseEntity<Expense> createExpense(@Valid @RequestBody Expense expense) throws URISyntaxException{
        Expense result = expenseRepository.save(expense);
        return ResponseEntity.created(new URI("/api/expenses"+result.getId())).body(result);
    }

    //method to override expenses
    @PutMapping("/expenses/{id}")
    ResponseEntity<Expense> updateExpense(@Valid @RequestBody Expense expense) //receive a valid request body
    {
        Expense result = expenseRepository.save(expense);
        return ResponseEntity.ok().body(result);
        /*Both the same method as postmapping but jpa is smart enough to override
          If the record exists and the method is put then ill override it
         */
    }
}
