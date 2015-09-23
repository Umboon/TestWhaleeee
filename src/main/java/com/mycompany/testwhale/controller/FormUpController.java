/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.testwhale.controller;

import com.mycompany.testwhale.model.FormUp;
import com.mycompany.testwhale.repo.FormUpRepo;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartRequest;

/**
 *
 * @author UMBOON
 */
@RestController
public class FormUpController {

    @Autowired
    private FormUpRepo formUpRepo;

    @RequestMapping(value = "/saveform", method = RequestMethod.POST)
    private FormUp saveForm(MultipartRequest form) throws IOException {
        FormUp formDoc = new FormUp();
        formDoc.setNameForm(form.getFile("forms").getName());
        formDoc.setMimeType(form.getFile("forms").getContentType());
        formDoc.setContent(form.getFile("forms").getBytes());
        return formDoc;

    }

//    @RequestMapping(value = "/saveform",method = RequestMethod.POST)
//    private void saveForm(@RequestBody FormUp form){
//        formRepo.save(form);
//    }
//    
    @RequestMapping(value = "/deleteform", method = RequestMethod.POST)
    private void deleteForm(@RequestBody FormUp form) {
        formUpRepo.delete(form);
    }

    @RequestMapping(value = "/getform", method = RequestMethod.GET)
    public Page<FormUp> getForm(Pageable pageable) {
        return formUpRepo.findAll(pageable);
    }

}
