/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.testwhale.spec;

import com.mycompany.testwhale.model.DocFile;
import com.mycompany.testwhale.model.DocFile_;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

/**
 *
 * @author UMBOON
 */
public class FilenameSpec {
    
    public static Specification<DocFile> nameLike(final String keyword){
        return new Specification<DocFile>() {

            @Override
            public Predicate toPredicate(Root<DocFile> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
                return cb.like(cb.upper(root.get(DocFile_.name)), keyword.toUpperCase());
               
            }
        };
        
    }
    
}
