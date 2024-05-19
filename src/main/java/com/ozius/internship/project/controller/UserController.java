package com.ozius.internship.project.controller;

import com.ozius.internship.project.dto.SimpleSellerDTO;
import com.ozius.internship.project.dto.UserAccountDto;
import com.ozius.internship.project.entity.user.UserAccount;
import com.ozius.internship.project.repository.UserAccountRepository;
import com.ozius.internship.project.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@RestController
public class UserController {

    private final UserAccountRepository userAccountRepository;
    private final UserService userService;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserAccountRepository userAccountRepository, UserService userService, ModelMapper modelMapper, PasswordEncoder passwordEncoder) {
        this.userAccountRepository = userAccountRepository;
        this.userService = userService;
        this.modelMapper = modelMapper;
        this.passwordEncoder = passwordEncoder;
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
    public ResponseEntity<Object> retrieveUserRole(@PathVariable String email) {
        UserAccount userAccount = userAccountRepository.findByEmail(email);
        if(userAccount!=null) {
            return ResponseEntity.ok(userAccount.getUserRole().toString());
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/users/sellers")
    public ResponseEntity<List<SimpleSellerDTO>> retrieveSellerUsers() {
        List<SimpleSellerDTO> simpleSellerDTOS = userService.getAllSellerUsersWithSellerAlias();
        if(simpleSellerDTOS != null) {
            return ResponseEntity.ok(simpleSellerDTOS);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<UserAccountDto> updateUserAccount(@PathVariable long id, @RequestBody UserAccount userAccount) {
        UserAccountDto newUserAccount = userService.updateUserAccount(id, userAccount.getFirstName(), userAccount.getLastName(), userAccount.getEmail(), userAccount.getImageName(), userAccount.getTelephone());
        return ResponseEntity.ok(newUserAccount);
    }

    @DeleteMapping("/users-buyer/{id}")
    public void deleteAccountForBuyerById(@PathVariable long id) {
        userService.deleteAccountForBuyer(id);
    }

    @DeleteMapping("/users-seller/{id}")
    public void deleteAccountForSellerById(@PathVariable long id) {
        userService.deleteAccountForSeller(id);
    }

    @DeleteMapping("/users-courier/{id}")
    public void deleteAccountForCourierById(@PathVariable long id) {
        userService.deleteAccountForCourier(id);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestParam String token, @RequestParam String newPassword) {
        UserAccount user = userAccountRepository.findByResetToken(token);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Invalid or expired reset token");
        }

        // Update password
        String newPasswordHashed = passwordEncoder.encode(newPassword);
        user.updatePassword(user.getPasswordHash(), newPasswordHashed);
        user.setResetToken(null);
        userAccountRepository.save(user);

        return ResponseEntity.ok("Password reset successfully");
    }
}
