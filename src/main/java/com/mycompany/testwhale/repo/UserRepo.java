/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.testwhale.repo;

import com.mycompany.testwhale.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author UMBOON
 */
public interface UserRepo extends JpaRepository<User, Integer>{
    
    public User findByUserName(String username);
    public Page<User> findAllByOrderByIdDesc (Pageable pageable);
   
    
}
