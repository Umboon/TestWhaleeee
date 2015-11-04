/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.testwhale.controller;

import com.mycompany.testwhale.model.Category;
import com.mycompany.testwhale.model.User;
import com.mycompany.testwhale.repo.CategoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author UMBOON
 */
@RestController
public class CategoryController {

    @Autowired
    private CategoryRepo categoryRepo;

    @RequestMapping(value = "/savecategory", method = RequestMethod.POST)
    private void saveCategory(@RequestBody Category category) {
        categoryRepo.save(category);
    }

    @RequestMapping(value = "/deletecategory", method = RequestMethod.POST)
    private void deleteCategory(@RequestBody Category category) {
        categoryRepo.delete(category);
    }

    @RequestMapping(value = "/getcategorys", method = RequestMethod.GET)
    private Page<Category> getCategory(Pageable pageable) {
        return categoryRepo.findAll(pageable);

    }
    
 

//    @RequestMapping(value = "/getcategroupuser", method = RequestMethod.POST)
//    private Page<Category> getCateGroupUser(@RequestBody User user, Pageable pageable) {
//        Page<Category> categ = null;
//        if ("Admin".equals(user.getStatus())) {
//            categ = categoryRepo.findAll(pageable);
//        } else if ("Teacher".equals(user.getStatus())) {
//            categ = categoryRepo.findByCateOrCateOrderByIdDesc("Public", "Teacher", pageable);
//        } else if ("Student".equals(user.getStatus())){
//            categ = categoryRepo.findByCateOrderByIdDesc("Public", pageable);
//        }
//        return categ;
//    }

}
