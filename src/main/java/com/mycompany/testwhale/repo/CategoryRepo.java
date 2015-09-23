/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.testwhale.repo;

import com.mycompany.testwhale.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/**
 *
 * @author UMBOON
 */
public interface CategoryRepo extends JpaRepository<Category, Integer>,JpaSpecificationExecutor<Category>{
    
}
