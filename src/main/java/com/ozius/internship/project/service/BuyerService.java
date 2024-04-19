package com.ozius.internship.project.service;

import com.ozius.internship.project.dto.BuyerAddressDto;
import com.ozius.internship.project.dto.BuyerDTO;
import com.ozius.internship.project.entity.user.Address;
import com.ozius.internship.project.entity.buyer.Buyer;
import com.ozius.internship.project.entity.buyer.BuyerAddress;
import com.ozius.internship.project.entity.product.Product;
import com.ozius.internship.project.repository.BuyerRepository;
import com.ozius.internship.project.repository.ProductRepository;
import com.ozius.internship.project.repository.UserAccountRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BuyerService {

    private final BuyerRepository buyerRepository;
    private final UserAccountRepository userAccountRepository;
    private final ProductRepository productRepository;
    private final ModelMapper modelMapper;

    public BuyerService(BuyerRepository buyerRepository, UserAccountRepository userAccountRepository, ProductRepository productRepository, ModelMapper modelMapper) {
        this.buyerRepository = buyerRepository;
        this.userAccountRepository = userAccountRepository;
        this.productRepository = productRepository;
        this.modelMapper = modelMapper;
    }

    @Transactional
    public Buyer getBuyerByEmail(String email){
        long userId = userAccountRepository.findByEmail(email).getId();
        return buyerRepository.findBuyerByAccount_Id(userId);
    }

    @Transactional
    public BuyerDTO getBuyerByEmailDTO(String email) {
        long userId = userAccountRepository.findByEmail(email).getId();
        Buyer buyer = buyerRepository.findBuyerByAccount_Id(userId);
        return modelMapper.map(buyer, BuyerDTO.class);
    }

    @Transactional
    public List<Product> getFavoritesByUserEmail(String email) {
        Buyer buyer = getBuyerByEmail(email);
        return buyer.getFavoriteProducts().stream().toList();
    }

    @Transactional
    public void addFavoriteByProductId(String email, long productId) {
        Buyer buyer = getBuyerByEmail(email);
        Product product = productRepository.findById(productId).orElseThrow();
        buyer.addFavorite(product);
    }


    @Transactional
    public void removeFavoriteByProductId(String email, long productId) {
        Buyer buyer = getBuyerByEmail(email);

        Product product = productRepository.findById(productId).orElseThrow();
        buyer.removeFavorite(product);
    }

    @Transactional
    public List<BuyerAddress> getBuyerAddressesByUserEmail(String email){
        Buyer buyer = getBuyerByEmail(email);
        return buyer.getAddresses().stream().toList();
    }

    @Transactional
    public void updateFullAddress(String email, BuyerAddressDto shippingAddress, long addressId){

        Buyer buyer = getBuyerByEmail(email);

        Address address = shippingAddress.getAddress();
        String firstName = shippingAddress.getFirstName();
        String lastName = shippingAddress.getLastName();
        String telephone = shippingAddress.getTelephone();

        buyer.updateAddress(address, firstName, lastName, telephone, addressId);
    }

    @Transactional
    public void addBuyerAddress(String email, BuyerAddressDto shippingAddress){

        Buyer buyer = getBuyerByEmail(email);

        Address address = shippingAddress.getAddress();
        String firstName = shippingAddress.getFirstName();
        String lastName = shippingAddress.getLastName();
        String telephone = shippingAddress.getTelephone();

        buyer.addAddress(address, firstName, lastName, telephone);
    }
}
