package com.ozius.internship.project.controller;

import com.ozius.internship.project.infra.payments.StripeClient;
import com.stripe.model.Charge;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/payment")
public class PaymentGatewayController {

    private final StripeClient stripeClient;

    public PaymentGatewayController(StripeClient stripeClient) {
        this.stripeClient = stripeClient;
    }

    @PostMapping("/charge")
    @PreAuthorize("hasRole('CLIENT')")
    public Charge chargeCard(@RequestHeader(value = "token") String token, @RequestHeader(value = "amount") Double amount) throws Exception {
        return stripeClient.chargeNewCard(token, amount);
    }

}
