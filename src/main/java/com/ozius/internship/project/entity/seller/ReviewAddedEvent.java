package com.ozius.internship.project.entity.seller;

public class ReviewAddedEvent {
    private final long productId;

    public ReviewAddedEvent(long productId) {
        this.productId = productId;
    }

    public long getProductId() {
        return productId;
    }

}
