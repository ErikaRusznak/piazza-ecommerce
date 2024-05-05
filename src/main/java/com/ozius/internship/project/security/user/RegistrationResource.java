package com.ozius.internship.project.security.user;

import com.ozius.internship.project.dto.RegisterSellerDTO;
import com.ozius.internship.project.entity.seller.LegalDetails;
import com.ozius.internship.project.entity.seller.RegistrationNumber;
import com.ozius.internship.project.entity.seller.Seller;
import com.ozius.internship.project.entity.seller.SellerType;
import com.ozius.internship.project.entity.user.Address;
import com.ozius.internship.project.entity.user.UserAccount;
import com.ozius.internship.project.entity.buyer.Buyer;
import com.ozius.internship.project.entity.cart.Cart;
import com.ozius.internship.project.entity.user.UserRole;
import com.ozius.internship.project.repository.BuyerRepository;
import com.ozius.internship.project.repository.CartRepository;
import com.ozius.internship.project.repository.SellerRepository;
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
    private final SellerRepository sellerRepository;

    public RegistrationResource(BuyerRepository buyerRepository, PasswordEncoder passwordEncoder, CartRepository cartRepository, SellerRepository sellerRepository) {
        this.buyerRepository = buyerRepository;
        this.passwordEncoder = passwordEncoder;
        this.cartRepository = cartRepository;
        this.sellerRepository = sellerRepository;
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

    @PostMapping("/register-seller")
    @ResponseStatus(code = HttpStatus.CREATED)
    public void registerSeller(@Valid @RequestBody RegisterSellerDTO sellerDTO){

        UserAccount userAccount = new UserAccount(
                sellerDTO.getFirstName(),
                sellerDTO.getLastName(),
                sellerDTO.getEmail(),
                sellerDTO.getImageName(),
                sellerDTO.getTelephone(),
               UserRole.ADMIN
        );
        userAccount.setInitialPassword(passwordEncoder.encode(sellerDTO.getPassword()));

        Address legalAddress = new Address(
                sellerDTO.getCountry(),
                sellerDTO.getState(),
                sellerDTO.getCity(),
                sellerDTO.getAddressLine1(),
                sellerDTO.getAddressLine2(),
                sellerDTO.getZipCode()
        );

        String sellerAlias = sellerDTO.getAlias();
        SellerType sellerType = sellerDTO.getSellerType();

        Seller seller;
        if(sellerType != SellerType.LOCAL_FARMER) {
            LegalDetails legalDetails = new LegalDetails(
                    sellerDTO.getCompanyName(),
                    sellerDTO.getCui(),
                    new RegistrationNumber(sellerDTO.getCompanyType(), sellerDTO.getNumericCodeByState(),
                            sellerDTO.getSerialNumber(), sellerDTO.getDateOfRegistration())
            );
            seller = new Seller(sellerAlias, sellerType, userAccount, legalAddress, legalDetails);
        } else {
            seller = new Seller(sellerAlias, sellerType, userAccount, legalAddress);
        }
        sellerRepository.save(seller);
    }
}
