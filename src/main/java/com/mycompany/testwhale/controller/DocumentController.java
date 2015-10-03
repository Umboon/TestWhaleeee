/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.testwhale.controller;

import com.mycompany.testwhale.model.Document;
import com.mycompany.testwhale.model.DocFile;
import com.mycompany.testwhale.model.SearchData;
import com.mycompany.testwhale.repo.DocFileRepo;
import com.mycompany.testwhale.repo.DocumentRepo;
import com.mycompany.testwhale.service.DocumentSearchService;
import com.mycompany.testwhale.spec.DocumentSpec;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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
public class DocumentController {

    @Autowired
    private DocumentRepo documentRepo;
    @Autowired
    private DocFileRepo docFileRepo;
    @Autowired
    private DocumentSearchService documentSearchService;

    private Integer docId;
    private String category;

    @RequestMapping(value = "/savedocument", method = RequestMethod.POST)
    private void saveDocument(@RequestBody Document document) {
        documentRepo.save(document);
    }

    @RequestMapping(value = "/savefile", method = RequestMethod.POST)
    private DocFile saveFile(MultipartRequest file) throws IOException {
        DocFile docFile = new DocFile();
        docFile.setName(file.getFile("files").getOriginalFilename());
        docFile.setMimeType(file.getFile("files").getContentType());
        docFile.setContent(file.getFile("files").getBytes());
        return docFile;

    }

    @RequestMapping(value = "/deletedocument", method = RequestMethod.POST)
    private void DeleteDocument(@RequestBody Document document) {
        documentRepo.delete(document);
    }

    @RequestMapping(value = "/getdocuments", method = RequestMethod.GET)
    private Page<Document> getDocument(Pageable pageable) {
        return documentRepo.findAll(pageable);
    }

    @RequestMapping(value = "/getfile/{id}", method = RequestMethod.GET)
    public ResponseEntity<InputStreamResource> getFile(@PathVariable("id") DocFile docFile) {
        ResponseEntity<InputStreamResource> body = ResponseEntity.ok().contentLength(docFile.getContent().length)
                .contentType(MediaType.parseMediaType(docFile.getMimeType()))
                .header("Content-Disposition", "attachment; filename=\"" + docFile.getName() + "\"")
                .body(new InputStreamResource(new ByteArrayInputStream(docFile.getContent())));
        return body;
    }

    @RequestMapping(value = "/getdocumentdetail", method = RequestMethod.GET)
    private Document getDocumentDetail() {
        return documentRepo.findOne(docId);
    }

    @RequestMapping(value = "/setdocumentdetail", method = RequestMethod.POST)
    private void setDocumentDetail(@RequestBody Document document) {
        docId = document.getId();
    }

    @RequestMapping(value = "/searchdocument", method = RequestMethod.POST)
    private Page<Document> searchDocument(@RequestBody SearchData searchData, Pageable pageable) {
        String keyword = searchData.getKeyWord();
        String searchBy = searchData.getSearchBy();

        Page<Document> document = null;
        if ("keyword".equals(searchBy)) {

            document = documentSearchService.searchByKeyword(keyword, pageable);
        }
        if ("topic".equals(searchBy)) {

            document = documentSearchService.searchByTopic(keyword, pageable);
        }
        if("fileName".equals(searchBy)){
             document = documentSearchService.searchByFileName(keyword, pageable);
        }
        return document;

    }
      
       @RequestMapping(value = "/searchbycategory" , method = RequestMethod.POST)
       private void searchByCategory(@RequestBody SearchData category){
           System.out.println("------------------------------>"+category.getKeyWord());
       this.category = category.getKeyWord();
       }
    
       @RequestMapping(value = "/getdocforcate" , method = RequestMethod.GET)
       private Page<Document> getDocForCate(Pageable pageable){
       return documentSearchService.searchByCateLike(category, pageable);
       }
       
       @RequestMapping(value = "/gettotalrow" , method = RequestMethod.GET)
       private Long getTotalRow(){
       return documentRepo.count();
       }
       
       @RequestMapping(value = "/countsearchdocument" , method = RequestMethod.POST)
       private Long countSearch(@RequestBody SearchData searchData){
       String keyword = searchData.getKeyWord();
       String searchBy = searchData.getSearchBy();
       Long count = null;
        if ("keyword".equals(searchBy)) {
            count = documentRepo.count(DocumentSpec.keyWordLike("%"+keyword+"%"));
        }
        if ("topic".equals(searchBy)) {
            count = documentRepo.count(DocumentSpec.topicLike("%"+keyword+"%"));
         }
        if("fileName".equals(searchBy)){
            count = documentRepo.count(DocumentSpec.topicLike("%"+keyword+"%"));
        }
       return count;
       }
}
