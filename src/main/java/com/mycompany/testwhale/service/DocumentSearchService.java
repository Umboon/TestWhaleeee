/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.testwhale.service;

import com.mycompany.testwhale.model.Document;
import com.mycompany.testwhale.repo.DocumentRepo;
import com.mycompany.testwhale.spec.DocumentSpec;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.domain.Specifications;
import org.springframework.stereotype.Service;

/**
 *
 * @author UMBOON
 */
@Service
public class DocumentSearchService {
    @Autowired
    private  DocumentRepo documentRepo;
    
    
    public Page<Document> searchByTopic(String keyword,Pageable pageable){
        Specifications<Document> specification = Specifications.where(DocumentSpec.topicLike("%"+keyword+"%"));
        return documentRepo.findAll(specification,pageable);
    }
    
    public Page<Document> searchByKeyword(String keyword,Pageable pageable){
        Specifications<Document> specification = Specifications.where(DocumentSpec.keyWordLike("%"+keyword+"%"));
        return documentRepo.findAll(specification,pageable);
    }
     
   
    
    
}
