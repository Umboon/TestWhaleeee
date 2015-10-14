/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.testwhale.repo;

import com.mycompany.testwhale.model.Document;
import com.mycompany.testwhale.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/**
 *
 * @author UMBOON
 */
public interface DocumentRepo extends JpaRepository<Document, Integer>, JpaSpecificationExecutor<Document> {
    
    public Page<Document> findAllByOrderByIdDesc(Pageable pageable);
    public Page<Document> findByUserr(User userr, Pageable pageable);
}
