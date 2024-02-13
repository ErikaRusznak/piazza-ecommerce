package com.ozius.internship.project.controller;

import com.ozius.internship.project.entity.UserAccount;
import com.ozius.internship.project.repository.UserAccountRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    private final UserAccountRepository userAccountRepository;

    public UserController(UserAccountRepository userAccountRepository) {
        this.userAccountRepository = userAccountRepository;
    }

    @GetMapping("/users/{email}")
    public ResponseEntity<Object> retrieveUserByEmail(@PathVariable String email){
        UserAccount user = userAccountRepository.findByEmail(email);
        if(user!=null){
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/users/{email}/role")
    public ResponseEntity<Object> retrieveUserStatus(@PathVariable String email) {
        UserAccount userAccount = userAccountRepository.findByEmail(email);
        if(userAccount!=null) {
            return ResponseEntity.ok(userAccount.getUserStatus().toString());
        }
        return ResponseEntity.notFound().build();
    }
}
