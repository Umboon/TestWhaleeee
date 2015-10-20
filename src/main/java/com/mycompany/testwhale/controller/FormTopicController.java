/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.testwhale.controller;

import com.mycompany.testwhale.model.FormFile;
import com.mycompany.testwhale.model.FormTopic;
import com.mycompany.testwhale.repo.FormFileRepo;
import com.mycompany.testwhale.repo.FormTopicRepo;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
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
public class FormTopicController {
    
    @Autowired
    private FormTopicRepo formTopicRepo;
    
    @Autowired
    private FormFileRepo formFileRepo;
    
    @RequestMapping(value = "/saveformtopic" ,method = RequestMethod.POST)
    private void saveFormTopic(@Validated @RequestBody FormTopic formTopic){
        formTopicRepo.save(formTopic);
    }
    
    @RequestMapping(value = "/saveform", method = RequestMethod.POST)
    private FormFile saveForm(MultipartRequest form) throws IOException {
        System.out.println("------------------------------->"+form.getFile("forms").getContentType());
        FormFile formfile = new FormFile();
        formfile.setFormName(form.getFile("forms").getOriginalFilename());
        formfile.setMimeType(form.getFile("forms").getContentType());
        formfile.setContent(form.getFile("forms").getBytes());
        return formfile;

    }
    
    @RequestMapping(value = "/getfileform/{id}", method = RequestMethod.GET)
    public ResponseEntity<InputStreamResource> getFile(@PathVariable("id") FormFile formfile) {
        ResponseEntity<InputStreamResource> body = ResponseEntity.ok().contentLength(formfile.getContent().length)
                .contentType(MediaType.parseMediaType(formfile.getMimeType()))
                .header("Content-Disposition", "attachment; filename=\"" + formfile.getFormName() + "\"")
                .body(new InputStreamResource(new ByteArrayInputStream(formfile.getContent())));
        return body;
    }

    
    @RequestMapping(value = "/deleteformtopic",method = RequestMethod.POST)
    private void deleteFormTopic(@RequestBody FormTopic formTopic){
        formTopicRepo.delete(formTopic);
    }
    
    @RequestMapping(value = "/getformtopic", method = RequestMethod.GET)
    private Page<FormTopic> getFormTopic(Pageable pageable){
        return formTopicRepo.findAllByOrderByIdDesc(pageable);
    }
    
    @RequestMapping(value = "/gettotalrowform",method = RequestMethod.GET)
    private Long getTotalRowForm(){
        return formTopicRepo.count();
    }
    
    
}
