/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.testwhale.spec;

import com.mycompany.testwhale.model.Category_;
import com.mycompany.testwhale.model.DocFile_;
import com.mycompany.testwhale.model.Document;
import com.mycompany.testwhale.model.Document_;
import com.mycompany.testwhale.model.User;
import com.mycompany.testwhale.model.User_;
import java.util.Date;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;

/**
 *
 * @author UMBOON
 */
public class DocumentSpec {

    public static Specification<Document> topicLike(final String keyword) {
        return new Specification<Document>() {

            @Override
            public Predicate toPredicate(Root<Document> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
                return cb.like(cb.upper(root.get(Document_.topic)), keyword.toUpperCase());

            }
        };

    }

    public static Specification<Document> keyWordLike(final String keyword) {
        return new Specification<Document>() {

            @Override
            public Predicate toPredicate(Root<Document> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
                return cb.like(cb.upper(root.get(Document_.keyWord)), keyword.toUpperCase());

            }
        };

    }

    public static Specification<Document> nameLike(final String keyword) {
        return new Specification<Document>() {

            @Override
            public Predicate toPredicate(Root<Document> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
                return cb.like(cb.upper(root.get(Document_.file).get(DocFile_.name)), keyword.toUpperCase());

            }
        };

    }

    public static Specification<Document> cateLike(final String keyword) {
        return new Specification<Document>() {

            @Override
            public Predicate toPredicate(Root<Document> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
                return cb.like(cb.upper(root.get(Document_.category).get(Category_.cate)), keyword.toUpperCase());

            }
        };

    }

    public static Specification<Document> dateInBetween(final Date start, final Date end) {
        return new Specification<Document>() {

            @Override
            public Predicate toPredicate(Root<Document> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
                return cb.between(root.get(Document_.dateReceived), start, end);
            }
        };
    }

    public static Specification<Document> dateWorkBetween(final Date start, final Date end) {
        return new Specification<Document>() {

            @Override
            public Predicate toPredicate(Root<Document> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
                return cb.between(root.get(Document_.dateWork), start, end);
            }
        };
    }

// ===================pagsearch===================================================================//
    public static Specification<Document> docForCategory(final String keyword) {
        return new Specification<Document>() {

            @Override
            public Predicate toPredicate(Root<Document> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                return cb.like(root.get(Document_.category).get(Category_.cate), keyword);
            }

        };
    }

    //===================pagsearchuserupload===================================================================//
    
    public static Specification<Document> docForUser(final String keyword) {
        return new Specification<Document>() {

            @Override
            public Predicate toPredicate(Root<Document> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                return cb.like(root.get(Document_.userr).get(User_.userName), keyword);

            }
        };
    }
}
