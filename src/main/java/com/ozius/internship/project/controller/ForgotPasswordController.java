package com.ozius.internship.project.controller;

import com.ozius.internship.project.entity.user.UserAccount;
import com.ozius.internship.project.infra.email.EmailService;
import com.ozius.internship.project.repository.UserAccountRepository;
import com.ozius.internship.project.service.UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
public class ForgotPasswordController {

    private final UserService userService;
    private final UserAccountRepository userAccountRepository;
    private final EmailService emailService;

    @Value("${frontend.url.client}")
    private String resetPasswordLinkClient;

    public ForgotPasswordController(UserService userService, UserAccountRepository userAccountRepository, EmailService emailService) {
        this.userService = userService;
        this.userAccountRepository = userAccountRepository;
        this.emailService = emailService;
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestParam String email) {
        UserAccount userAccount = userAccountRepository.findByEmail(email);
        if (userAccount == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Email not found");
        }

        String resetToken = UUID.randomUUID().toString();

        userAccount.setResetToken(resetToken);
        userAccountRepository.save(userAccount);

        String resetLink = resetPasswordLinkClient+"/reset-password?token=" + resetToken;
        String emailContent = "Please click the link below to reset your password: " + resetLink;
        emailService.sendEmail(email, "Password Reset", emailContent);

        return ResponseEntity.ok("Password reset instructions sent to your email");
    }
}
