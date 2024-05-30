package com.ozius.internship.project.aspect;

import com.ozius.internship.project.entity.seller.Seller;
import com.ozius.internship.project.entity.user.RequestStatus;
import com.ozius.internship.project.entity.user.SellerRequest;
import com.ozius.internship.project.repository.SellerRepository;
import com.ozius.internship.project.repository.SellerRequestRepository;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Aspect
@Component
public class SellerApprovalAspect {

    private final SellerRepository sellerRepository;
    private final SellerRequestRepository sellerRequestRepository;

    public SellerApprovalAspect(SellerRepository sellerRepository, SellerRequestRepository sellerRequestRepository) {
        this.sellerRepository = sellerRepository;
        this.sellerRequestRepository = sellerRequestRepository;
    }

    @Before("@annotation(RequireApprovedSeller)")
    public void checkSellerApproval() throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        Optional<Seller> seller = sellerRepository.findSellerByAccount_Email(email);
        if (seller.isEmpty()) {
            throw new Exception("Seller not found");
        }

        SellerRequest sellerRequest = sellerRequestRepository.findBySellerEmailAndStatus(email, RequestStatus.APPROVED);
        if (sellerRequest == null) {
            throw new Exception("Admin has not approved the request");
        }
    }
}
