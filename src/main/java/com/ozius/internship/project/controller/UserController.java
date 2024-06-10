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
@RequestMapping("/api/users")
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

    @GetMapping("/{email}")
    public ResponseEntity<UserAccountDto> retrieveUserByEmail(@PathVariable String email){
        UserAccount user = userAccountRepository.findByEmail(email);
        if(user!=null){
            UserAccountDto userAccountDto = modelMapper.map(user, UserAccountDto.class);
            return ResponseEntity.ok(userAccountDto);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<UserAccountDto> getUserById(@PathVariable long id){
        UserAccount userAccount = userAccountRepository.findById(id).orElseThrow();
        UserAccountDto userAccountDto = modelMapper.map(userAccount, UserAccountDto.class);
        return ResponseEntity.ok(userAccountDto);
    }

    @GetMapping
    public ResponseEntity<List<UserAccountDto>> getAllUsers() {
        List<UserAccountDto> userAccountList = userService.getAllUsers();
        return ResponseEntity.ok(userAccountList);

    }

    @GetMapping("/{email}/role")
    public ResponseEntity<Object> retrieveUserRole(@PathVariable String email) {
        UserAccount userAccount = userAccountRepository.findByEmail(email);
        if(userAccount!=null) {
            return ResponseEntity.ok(userAccount.getUserRole().toString());
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/sellers")
    public ResponseEntity<List<SimpleSellerDTO>> retrieveSellerUsers() {
        List<SimpleSellerDTO> simpleSellerDTOS = userService.getAllSellerUsersWithSellerAlias();
        if(simpleSellerDTOS != null) {
            return ResponseEntity.ok(simpleSellerDTOS);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserAccountDto> updateUserAccount(@PathVariable long id, @RequestBody UserAccount userAccount) {
        UserAccountDto newUserAccount = userService.updateUserAccount(id, userAccount.getFirstName(), userAccount.getLastName(), userAccount.getEmail(), userAccount.getImageName(), userAccount.getTelephone());
        return ResponseEntity.ok(newUserAccount);
    }

    @DeleteMapping("/buyer/{id}")
    public void deleteAccountForBuyerById(@PathVariable long id) {
        userService.deleteAccountForBuyer(id);
    }

    @DeleteMapping("/seller/{id}")
    public void deleteAccountForSellerById(@PathVariable long id) {
        userService.deleteAccountForSeller(id);
    }

    @DeleteMapping("/courier/{id}")
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
