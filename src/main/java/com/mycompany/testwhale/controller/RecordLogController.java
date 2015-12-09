/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.testwhale.controller;

import com.mycompany.testwhale.model.RecordLog;
import com.mycompany.testwhale.repo.RecordLogRepo;
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
public class RecordLogController {
    
    @Autowired
    private RecordLogRepo recordLogRepo;
    
    @RequestMapping(value = "/saverecordlog",method = RequestMethod.POST)
    private void saveRecordLog (@RequestBody RecordLog recordLog){
        recordLogRepo.save(recordLog);
    }
    
    @RequestMapping(value = "/deleterecordlog",method = RequestMethod.POST)
    private void deleteRecordLog(@RequestBody RecordLog recordLog){
        recordLogRepo.delete(recordLog);
    }
    
    @RequestMapping(value = "/getrecordlog", method = RequestMethod.GET)
    public Page<RecordLog> getRecordLog (Pageable pageable){
        return recordLogRepo.findAllByOrderByIdDesc(pageable);
    }
    
    @RequestMapping(value = "/gettotolrowrecordlog",method = RequestMethod.GET)
    private long getTotalRowRecordLog(){
        return recordLogRepo.count();
    }
}
