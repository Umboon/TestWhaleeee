/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.testwhale.controller;

import com.mycompany.testwhale.model.Category;
import com.mycompany.testwhale.model.Document;
import com.mycompany.testwhale.repo.CategoryRepo;
import com.mycompany.testwhale.repo.DocumentRepo;

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
public class DocumentController {
    
    @Autowired
    private DocumentRepo documentRepo;
    
   
    
    @RequestMapping(value = "/savedocument",method = RequestMethod.POST)
    private void SaveDocument(@RequestBody Document document){
        documentRepo.save(document);
    }
    
    @RequestMapping(value = "/deletedocument" , method = RequestMethod.POST)
    private void DeleteDocument(@RequestBody Document document){
        documentRepo.delete(document);
    }
    
    @RequestMapping(value = "/getdocuments" , method = RequestMethod.GET)
    private Page<Document> getDocument(Pageable pageable){
        return documentRepo.findAll(pageable);
    }
    
 
    
    
    
}
