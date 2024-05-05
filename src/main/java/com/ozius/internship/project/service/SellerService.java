package com.ozius.internship.project.service;

import com.amazonaws.services.kms.model.NotFoundException;
import com.ozius.internship.project.dto.SellerDTO;
import com.ozius.internship.project.entity.seller.LegalDetails;
import com.ozius.internship.project.entity.seller.Seller;
import com.ozius.internship.project.entity.user.Address;
import com.ozius.internship.project.repository.SellerRepository;
import com.ozius.internship.project.repository.UserAccountRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SellerService {
    
    public final SellerRepository sellerRepository;
    public final UserAccountRepository userAccountRepository;
    private final ModelMapper modelMapper;

    public SellerService(SellerRepository sellerRepository, UserAccountRepository userAccountRepository, ModelMapper modelMapper) {
        this.sellerRepository = sellerRepository;
        this.userAccountRepository = userAccountRepository;
        this.modelMapper = modelMapper;
    }
    
    @Transactional
    public SellerDTO getSellerByEmail(String email) {
        long userId = userAccountRepository.findByEmail(email).getId();
        Seller seller = sellerRepository.findSellerByAccount_Id(userId);
        return modelMapper.map(seller, SellerDTO.class);
    }

    @Transactional
    public SellerDTO getSellerByAlias(String alias) {
        Seller seller = sellerRepository.findSellerByAlias(alias);
        return modelMapper.map(seller, SellerDTO.class);
    }

    @Transactional
    public List<SellerDTO> getAllSellers() {
        List<Seller> sellers = sellerRepository.findAll();
        return sellers.stream()
                .map(seller -> modelMapper.map(seller, SellerDTO.class))
                .collect(Collectors.toList());
    }


    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    public void updateSellerLegalDetails(long id, LegalDetails legalDetails) {
        Seller seller = sellerRepository.findById(id).orElseThrow(() -> new NotFoundException("Seller not found"));

        seller.updateSellerLegalDetails(legalDetails);

        sellerRepository.save(seller);
    }

    @Transactional
    public void updateSellerAddress(long id, Address legalAddress) {
        Seller seller = sellerRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Seller not found with id: " + id));
        seller.updateSellerAddress(legalAddress);
    }


}
