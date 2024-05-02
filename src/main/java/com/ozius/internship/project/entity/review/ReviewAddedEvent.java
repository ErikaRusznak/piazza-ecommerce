package com.ozius.internship.project.entity.review;

import lombok.Getter;

@Getter
public class ReviewAddedEvent {
    private final long productId;

    public ReviewAddedEvent(long productId) {
        this.productId = productId;
    }

}
