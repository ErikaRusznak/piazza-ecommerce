package com.ozius.internship.project.security.user;

import com.ozius.internship.project.entity.user.UserAccount;
import com.ozius.internship.project.entity.buyer.Buyer;
import com.ozius.internship.project.entity.cart.Cart;
import com.ozius.internship.project.repository.BuyerRepository;
import com.ozius.internship.project.repository.CartRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@Validated
public class RegistrationResource {

    private final BuyerRepository buyerRepository;
    private final PasswordEncoder passwordEncoder;
    private final CartRepository cartRepository;

    public RegistrationResource(BuyerRepository buyerRepository, PasswordEncoder passwordEncoder, CartRepository cartRepository) {
        this.buyerRepository = buyerRepository;
        this.passwordEncoder = passwordEncoder;
        this.cartRepository = cartRepository;
    }

    @CrossOrigin(origins = "*")
    @GetMapping(path = "/")
    public String returnSuccessForRootUrl() {
        return "Success";
    }

    @PostMapping("/register-client")
    @ResponseStatus(code = HttpStatus.CREATED)
    public void register(@Valid @RequestBody UserAccountDto userAccountDto){

        UserAccount user = new UserAccount(
                userAccountDto.getFirstName(),
                userAccountDto.getLastName(),
                userAccountDto.getEmail(),
                userAccountDto.getImage(),
                userAccountDto.getTelephone(),
                userAccountDto.getUserRole()
        );

        user.setInitialPassword(passwordEncoder.encode(userAccountDto.getPassword()));

        Buyer buyer = new Buyer(user);
        buyerRepository.save(buyer);

        // we create a cart for the client
        Cart cart = new Cart(buyer);
        cartRepository.save(cart);
    }
}
