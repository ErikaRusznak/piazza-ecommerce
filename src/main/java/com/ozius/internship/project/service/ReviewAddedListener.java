package com.ozius.internship.project.service;

import com.ozius.internship.project.entity.seller.ReviewAddedEvent;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
public class ReviewAddedListener {

    private final ProductService productService;

    public ReviewAddedListener(ProductService productService) {
        this.productService = productService;
    }

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handleAddReview(ReviewAddedEvent event) {
        productService.recalculateProductRating(event.getProductId());
    }
}
