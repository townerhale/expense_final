package com.example.expense_final.controller;

import com.example.expense_final.model.Category;
import com.example.expense_final.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

//controller handles http requests using postman.
@RestController
@RequestMapping("/api")
public class CategoryController {

    private CategoryRepository categoryRepository; //create a private connection to our category repository

    public CategoryController(CategoryRepository categoryRepository)
    {
        super(); //refers to parent class object
        this.categoryRepository = categoryRepository; //set local categoryRepository so we can talk to db
    }

    @GetMapping("/categories")
    Collection<Category> categories(){
        return categoryRepository.findAll();
        //select *(all tables from category.
    }

    //category/2
    @GetMapping("/category/{id}") //this is how we pass a path variable as part of our url
    ResponseEntity<?> getCategory(@PathVariable Long id){ //pass id of type of long, its pathvariable because its part of the url
        Optional<Category> category = categoryRepository.findById(id);  //optional because it might not return anything but it returns the category
        return category.map(response -> ResponseEntity.ok().body(response)).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
        //if there is something, return the result we got from the category and map it to the response,
        // the response is going to be ResponseEntity, if its okay, put the response
        //into the body and send back to the browser otherwise create a new response entity
        //as the header body plus everything and send back as status not found in the browser.
        // http://localHistory/api/category/3 returns everything
    }

    @PostMapping("/category")
    ResponseEntity<Category> createCategory(@Valid @RequestBody Category category) throws URISyntaxException {
        Category result = categoryRepository.save(category);
        return ResponseEntity.created(new URI("/api/category" + result.getId())).body(result); //lombot generates access to get the getter methods
    }
    //allows you to create a POST in sql with category name and long

    //method to override category
    @PutMapping("/category/{id}")
    ResponseEntity<Category> updateCategory(@Valid @RequestBody Category category) //receive a valid request body
    {
        Category result = categoryRepository.save(category);
        return ResponseEntity.ok().body(result);
        /*Both the same method as postmapping but jpa is smart enough to override
          If the record exists and the method is put then ill override it
         */
    }

    @DeleteMapping("/category/{id}") //deletes id number 4
    ResponseEntity<?> deleteCategory(@PathVariable Long id)
    {
        categoryRepository.deleteById(id);
        return ResponseEntity.ok().build();  //once done w/ delete opton, return response entity
        //build means send reponse status of ok and send to browser.
    }




}
