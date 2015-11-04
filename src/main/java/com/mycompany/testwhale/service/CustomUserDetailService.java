/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.testwhale.service;

import com.mycompany.testwhale.model.RecordLog;
import com.mycompany.testwhale.model.User;
import com.mycompany.testwhale.repo.RecordLogRepo;
import com.mycompany.testwhale.repo.UserRepo;
import java.text.SimpleDateFormat;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 *
 * @author UMBOON
 */
@Service
public class CustomUserDetailService implements UserDetailsService{

    @Autowired
    private UserRepo userRepo;
    @Autowired
    private RecordLogRepo recordLogRepo;
    
    @Override
    public UserDetails loadUserByUsername(String string) throws UsernameNotFoundException {
       RecordLog recordLog = new RecordLog();
       
       User user = userRepo.findByUserName(string);
       if(user != null){
            recordLog.setName(user.getUserName());
            recordLog.setStatus(user.getStatus());
            recordLog.setDateLogin(new Date());
            recordLogRepo.save(recordLog);
        }
//       else{
//           new UsernameNotFoundException("User Not Font");
//       }
        return user;
    }
    
    
    
}
