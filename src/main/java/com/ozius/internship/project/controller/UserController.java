package com.ozius.internship.project.controller;

import com.ozius.internship.project.dto.UserAccountDto;
import com.ozius.internship.project.entity.user.UserAccount;
import com.ozius.internship.project.repository.UserAccountRepository;
import com.ozius.internship.project.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {

    private final UserAccountRepository userAccountRepository;
    private final UserService userService;
    private final ModelMapper modelMapper;

    public UserController(UserAccountRepository userAccountRepository, UserService userService, ModelMapper modelMapper) {
        this.userAccountRepository = userAccountRepository;
        this.userService = userService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/users/{email}")
    public ResponseEntity<Object> retrieveUserByEmail(@PathVariable String email){
        UserAccount user = userAccountRepository.findByEmail(email);
        UserAccountDto userAccountDto = modelMapper.map(user, UserAccountDto.class);
        if(user!=null){
            return ResponseEntity.ok(userAccountDto);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserAccountDto>> getAllUsers() {
        List<UserAccountDto> userAccountList = userService.getAllUsers();
        return ResponseEntity.ok(userAccountList);

    }

    @GetMapping("/users/{email}/role")
    public ResponseEntity<Object> retrieveUserStatus(@PathVariable String email) {
        UserAccount userAccount = userAccountRepository.findByEmail(email);
        if(userAccount!=null) {
            return ResponseEntity.ok(userAccount.getUserRole().toString());
        }
        return ResponseEntity.notFound().build();
    }

    // maybe can delete these
    @MessageMapping("/user.addUser")
    @SendTo("/user/topic")
    public UserAccount addUser(UserAccount userAccount) {
        userService.saveUser(userAccount);
        return userAccount;
    }

    @MessageMapping("/user.disconnectUser")
    @SendTo("/user/topic")
    public UserAccount disconnect(@Payload UserAccount userAccount) {
        userService.disconnect(userAccount);
        return userAccount;
    }

    @GetMapping("/connectedUsers")
    public ResponseEntity<List<UserAccount>> findConnectedUsers() {
        return ResponseEntity.ok(userService.findConnectedUsers());
    }

}
