package com.ozius.internship.project.service;

import com.ozius.internship.project.dto.SimpleSellerDTO;
import com.ozius.internship.project.dto.UserAccountDto;
import com.ozius.internship.project.entity.buyer.Buyer;
import com.ozius.internship.project.entity.courier.Courier;
import com.ozius.internship.project.entity.seller.Seller;
import com.ozius.internship.project.entity.user.UserAccount;
import com.ozius.internship.project.entity.user.UserRole;
import com.ozius.internship.project.repository.BuyerRepository;
import com.ozius.internship.project.repository.CourierRepository;
import com.ozius.internship.project.repository.SellerRepository;
import com.ozius.internship.project.repository.UserAccountRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class UserService {

    public final UserAccountRepository userAccountRepository;
    public final ModelMapper modelMapper;
    public final SellerRepository sellerRepository;
    public final BuyerRepository buyerRepository;
    public final CourierRepository courierRepository;

    public UserService(UserAccountRepository userAccountRepository, ModelMapper modelMapper, SellerRepository sellerRepository, BuyerRepository buyerRepository, CourierRepository courierRepository) {
        this.userAccountRepository = userAccountRepository;
        this.modelMapper = modelMapper;
        this.sellerRepository = sellerRepository;
        this.buyerRepository = buyerRepository;
        this.courierRepository = courierRepository;
    }

    public List<UserAccountDto> getAllUsers() {
        List<UserAccount> userAccounts =  userAccountRepository.findAll();
        return userAccounts.stream()
                .map(acc -> modelMapper.map(acc, UserAccountDto.class))
                .collect(Collectors.toList());
    }

    @Transactional
    public List<SimpleSellerDTO> getAllSellerUsersWithSellerAlias() {
        return userAccountRepository.findAllByUserRole(UserRole.SELLER).stream()
                .map(user -> {
                    Seller seller = sellerRepository.findSellerByAccount_Id(user.getId());
                    if (seller != null) {
                        SimpleSellerDTO sellerDTO = modelMapper.map(user, SimpleSellerDTO.class);
                        sellerDTO.setSellerAlias(seller.getAlias());
                        return sellerDTO;
                    }
                    return null;
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }

    @Transactional
    // TODO - add access only to the principal
    public UserAccountDto updateUserAccount(long id, String firstName, String lastName, String email, String image, String telephone) {
        UserAccount userAccount = userAccountRepository.findById(id).orElseThrow();
        userAccount.updateAccount(firstName, lastName, email, image, telephone);

        return modelMapper.map(userAccount, UserAccountDto.class);

    }

    @Transactional
    public void deleteAccountForSeller(long accountId) {
        UserAccount userAccount = userAccountRepository.findById(accountId)
                .orElseThrow(() -> new IllegalArgumentException("User account not found"));

        Seller seller = sellerRepository.findSellerByAccount_Id(accountId);

        if (seller != null) {
            sellerRepository.delete(seller);
        } else {
            userAccountRepository.delete(userAccount);
        }
    }

    @Transactional
    public void deleteAccountForBuyer(long accountId) {
        UserAccount userAccount = userAccountRepository.findById(accountId)
                .orElseThrow(() -> new IllegalArgumentException("User account not found"));

        Buyer buyer = buyerRepository.findBuyerByAccount_Id(accountId);

        if (buyer != null) {
            buyerRepository.delete(buyer);
        } else {
            userAccountRepository.delete(userAccount);
        }
    }

    @Transactional
    public void deleteAccountForCourier(long accountId) {
        UserAccount userAccount = userAccountRepository.findById(accountId)
                .orElseThrow(() -> new IllegalArgumentException("User account not found"));

        Courier courier = courierRepository.findCourierByAccount_Id(accountId);

        if (courier != null) {
            courierRepository.delete(courier);
        } else {
            userAccountRepository.delete(userAccount);
        }
    }

}

