/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.testwhale.service;

import com.mycompany.testwhale.model.DocFile;
import com.mycompany.testwhale.repo.DocFileRepo;
import com.mycompany.testwhale.spec.FilenameSpec;
import javax.swing.text.html.HTMLDocument;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specifications;
import org.springframework.stereotype.Service;

/**
 *
 * @author UMBOON
 */
@Service
public class FilenameSearchService {
    @Autowired
    private DocFileRepo docFileRepo;
    
    public Page<DocFile> searchByName(String keyword,Pageable pageable){
        Specifications<DocFile> specification = Specifications.where(FilenameSpec.nameLike("%"+keyword+"%"));
        return docFileRepo.findAll(specification, pageable);
        
    }
    
}
