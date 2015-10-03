/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.testwhale.repo;

import com.mycompany.testwhale.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetailsService;

/**
 *
 * @author UMBOON
 */
public interface UserRepo extends JpaRepository<User, Integer>{
    
    public User findByUserName(String username);
    
}
