/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.testwhale.spec;

import com.mycompany.testwhale.model.Document;
import com.mycompany.testwhale.model.Document_;
import java.util.Date;
import javafx.scene.chart.PieChart;
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

    public static Specification<Document> dateReceivedLike(final String keyword) {
        String dateReceived = Document_.dateReceived + "";
        return new Specification<Document>() {

            @Override
            public Predicate toPredicate(Root<Document> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
                return null;
                //return cb.or(cb.like(cb., keyword));

            }
        };

    }

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

}
