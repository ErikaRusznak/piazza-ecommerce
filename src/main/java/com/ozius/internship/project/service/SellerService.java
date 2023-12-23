package com.ozius.internship.project.service;

import com.ozius.internship.project.dto.SellerDTO;
import com.ozius.internship.project.entity.seller.Seller;
import com.ozius.internship.project.repository.SellerRepository;
import com.ozius.internship.project.repository.UserAccountRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

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
}
