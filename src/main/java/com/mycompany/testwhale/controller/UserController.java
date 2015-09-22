/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.testwhale.controller;

import com.mycompany.testwhale.model.User;
import com.mycompany.testwhale.repo.UserRepo;
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
public class UserController {
    
    @Autowired
    private UserRepo userRepo;
    
    private Integer userId;
    
    @RequestMapping(value = "/saveuser",method = RequestMethod.POST)
    private void saveUser(@RequestBody User user){
        userRepo.save(user);
    }
    
    @RequestMapping(value = "/deleteuser",method = RequestMethod.POST)
    private void deleteUser(@RequestBody User user){
        userRepo.delete(user);
    }
    
    @RequestMapping(value = "/getuser", method = RequestMethod.GET)
    public Page<User> getUser(Pageable pageable){
        return userRepo.findAll(pageable);
    }
    
    
    @RequestMapping(value = "/getuserdetail", method = RequestMethod.GET)
    private User getUserDetail(){
        return userRepo.findOne(userId);
    }
    
    @RequestMapping(value = "/setuserdetail", method = RequestMethod.POST)
    private void setUserDetail(@RequestBody User user){
        userId = user.getId();
    }
}
