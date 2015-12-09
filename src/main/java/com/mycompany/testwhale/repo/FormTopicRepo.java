/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.testwhale.repo;

import com.mycompany.testwhale.model.FormTopic;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author UMBOON
 */
public interface FormTopicRepo extends JpaRepository<FormTopic, Integer>{
    public Page<FormTopic> findAllByOrderByIdDesc(Pageable pageable);
    
    public List<FormTopic> findByFormName(String name);
    
}
