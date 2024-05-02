package com.ozius.internship.project.entity.review;

public class ReviewUpdatedEvent {
    private final long productId;

    public ReviewUpdatedEvent(long productId) {
        this.productId = productId;
    }

    public long getProductId() {
        return productId;
    }

}
