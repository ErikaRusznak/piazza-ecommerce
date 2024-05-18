package com.ozius.internship.project.infra.payments;

import com.stripe.Stripe;
import com.stripe.model.Charge;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;


import java.util.HashMap;
import java.util.Map;

@Component
public class StripeClient {

    @Value("${stripe.api.key}")
    private String apiSecretKey;

    public StripeClient() {
    }
    @PostConstruct
    public void init() {
        Stripe.apiKey = apiSecretKey;
    }

    public Charge chargeNewCard(String token, double amount) throws Exception {
        Map<String, Object> chargeParams = new HashMap<String, Object>();
        chargeParams.put("amount", (int)(amount * 100));
        chargeParams.put("currency", "RON");
        chargeParams.put("source", token);
        return Charge.create(chargeParams);
    }
}
