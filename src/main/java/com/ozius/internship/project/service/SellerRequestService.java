package com.ozius.internship.project.service;

import com.ozius.internship.project.entity.user.RequestStatus;
import com.ozius.internship.project.entity.user.SellerRequest;
import com.ozius.internship.project.repository.SellerRequestRepository;
import com.ozius.internship.project.service.email.EmailService;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class SellerRequestService {

    private final SellerRequestRepository sellerRequestRepository;
    private final EmailService emailService;

    public SellerRequestService(SellerRequestRepository sellerRequestRepository, EmailService emailService) {
        this.sellerRequestRepository = sellerRequestRepository;
        this.emailService = emailService;
    }

    @Transactional
    public SellerRequest createSellerRequest(SellerRequest sellerRequest){
        SellerRequest createdSellerRequest = new SellerRequest(sellerRequest.getReason(), sellerRequest.getSellerEmail());
        sellerRequestRepository.save(createdSellerRequest);
        return createdSellerRequest;
    }

    @Transactional
    public Page<SellerRequest> getSellerRequests(int page, int itemsPerPage) {
        Pageable pageable = PageRequest.of(page, itemsPerPage);
        return sellerRequestRepository.findAll(pageable);
    }

    @Transactional
    public SellerRequest approveSellerRequest(long id) {
        SellerRequest sellerRequest = sellerRequestRepository.findById(id).orElseThrow();
        sellerRequest.setStatus(RequestStatus.APPROVED);
        sellerRequestRepository.save(sellerRequest);
        emailService.sendApprovalEmailToUser(sellerRequest);
        return sellerRequest;
    }

    @Transactional
    public SellerRequest rejectSellerRequest(long id) {
        SellerRequest sellerRequest = sellerRequestRepository.findById(id).orElseThrow();
        sellerRequest.setStatus(RequestStatus.REJECTED);
        sellerRequestRepository.save(sellerRequest);
        emailService.sendRejectionEmailToUser(sellerRequest);
        return sellerRequest;
    }
}
