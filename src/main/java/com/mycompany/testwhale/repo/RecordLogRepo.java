/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.testwhale.repo;

import com.mycompany.testwhale.model.RecordLog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/**
 *
 * @author UMBOON
 */
public interface RecordLogRepo extends JpaRepository<RecordLog, Integer>, JpaSpecificationExecutor<RecordLog> {

    public Page<RecordLog> findAllByOrderByIdDesc(Pageable pageable);

}
