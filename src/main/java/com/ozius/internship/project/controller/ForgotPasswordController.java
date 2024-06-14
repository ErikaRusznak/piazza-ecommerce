package com.ozius.internship.project.controller;

import com.ozius.internship.project.entity.user.UserAccount;
import com.ozius.internship.project.entity.user.UserRole;
import com.ozius.internship.project.service.email.EmailService;
import com.ozius.internship.project.repository.UserAccountRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/forgot-password")
public class ForgotPasswordController {

    private final UserAccountRepository userAccountRepository;
    private final EmailService emailService;

    @Value("${frontend.url.client}")
    private String resetPasswordLinkClient;

    @Value("${frontend.url.seller}")
    private String resetPasswordLinkSeller;

    @Value("${frontend.url.courier}")
    private String resetPasswordLinkCourier;

    public ForgotPasswordController(UserAccountRepository userAccountRepository, EmailService emailService) {
        this.userAccountRepository = userAccountRepository;
        this.emailService = emailService;
    }

    @PostMapping("/client")
    public ResponseEntity<?> forgotPasswordClient(@RequestParam String email) {
        return forgotPassword(email, resetPasswordLinkClient, UserRole.CLIENT);
    }

    @PostMapping("/seller")
    public ResponseEntity<?> forgotPasswordSeller(@RequestParam String email) {
        return forgotPassword(email, resetPasswordLinkSeller, UserRole.SELLER);
    }

    @PostMapping("/courier")
    public ResponseEntity<?> forgotPasswordCourier(@RequestParam String email) {
        return forgotPassword(email, resetPasswordLinkCourier, UserRole.COURIER);
    }

    private ResponseEntity<?> forgotPassword(String email, String resetLink, UserRole userRole) {
        UserAccount userAccount = userAccountRepository.findByEmail(email);
        if (userAccount == null || userAccount.getUserRole() != userRole) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Email not found");
        }

        String resetToken = UUID.randomUUID().toString();

        userAccount.setResetToken(resetToken);
        userAccountRepository.save(userAccount);

        String resetLinkWithToken = resetLink + "/reset-password?token=" + resetToken;
        String emailContent = "Please click the link below to reset your password: " + resetLinkWithToken;
        emailService.sendEmail(email, "Password Reset", emailContent);

        return ResponseEntity.ok("Password reset instructions were sent to your email");
    }
}
