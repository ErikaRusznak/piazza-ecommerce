package com.ozius.internship.project.security.user;

import com.ozius.internship.project.entity.courier.Courier;
import com.ozius.internship.project.entity.user.UserAccount;
import com.ozius.internship.project.entity.buyer.Buyer;
import com.ozius.internship.project.entity.seller.Seller;
import com.ozius.internship.project.repository.BuyerRepository;
import com.ozius.internship.project.repository.CourierRepository;
import com.ozius.internship.project.repository.SellerRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Component
public class ClientDetailsMapper {

    private final Set<String> roles;

    private final BuyerRepository buyerRepository;
    private final SellerRepository sellerRepository;
    private final CourierRepository courierRepository;

    public ClientDetailsMapper(BuyerRepository buyerRepository, SellerRepository sellerRepository, CourierRepository courierRepository) {
        this.buyerRepository = buyerRepository;
        this.sellerRepository = sellerRepository;
        this.courierRepository = courierRepository;
        this.roles = new HashSet<>();
    }

    private Optional<Buyer> getBuyer(String email) {
        return buyerRepository.findBuyerByAccount_Email(email);
    }

    private Optional<Seller> getSeller(String email) {
        return sellerRepository.findSellerByAccount_Email(email);
    }
    private Optional<Courier> getCourier(String email) { return courierRepository.findCourierByAccount_Email(email); }

    private void addRoles(String email){
        if (getBuyer(email).isPresent()) {
            roles.add("CLIENT");
        }
        if (getSeller(email).isPresent()) {
            roles.add("SELLER");
        }
        if (getCourier(email).isPresent()) {
            roles.add("COURIER");
        }
    }

    public UserDetails toUserDetails(UserAccount userAccount) {

        addRoles(userAccount.getEmail());

        return User.withUsername(userAccount.getEmail())
                .password(userAccount.getPasswordHash())
                .roles(roles.toArray(String[]::new))
                .build();
    }
}
