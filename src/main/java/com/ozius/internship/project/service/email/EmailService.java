package com.ozius.internship.project.service.email;

import com.ozius.internship.project.entity.user.SellerRequest;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender javaMailSender;

    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendEmail(String to, String subject, String text) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text, true);
            javaMailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send email", e);
        }
    }

    public void sendApprovalEmailToUser(SellerRequest sellerRequest) {
        String to = sellerRequest.getSellerEmail();
        String subject = "Seller Request Approved";
        String text = "Your seller request has been approved. You can now register as a seller using your email: " + sellerRequest.getSellerEmail();

        sendEmail(to, subject, text);
    }

    public void sendRejectionEmailToUser(SellerRequest sellerRequest) {
        String to = sellerRequest.getSellerEmail();
        String subject = "Seller Request Rejected";
        String text = "Your seller request has been rejected. Please contact support for more details.";

        sendEmail(to, subject, text);
    }

}
