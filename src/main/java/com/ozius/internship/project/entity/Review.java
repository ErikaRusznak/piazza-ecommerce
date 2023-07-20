package com.ozius.internship.project.entity;

import jakarta.persistence.*;

@Entity
@Table(name = Review.TABLE_NAME)
public class Review extends BaseEntity {
    public static final String TABLE_NAME = "review";

    interface Columns {
        String DESCRIPTION = "DESCRIPTION";
        String RATING = "RATING";
        String SELLER_ID = "SELLER_ID";
        String BUYER_ID = "BUYER_ID";
        String PRODUCT_ID = "PRODUCT_ID";

    }
    @Column(name = Columns.DESCRIPTION, length = 250, nullable = false)
    private String description;

    @Column(name = Columns.RATING, nullable = false)
    private float rating;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = Columns.BUYER_ID)
    private BuyerInfo buyerInfo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = Columns.SELLER_ID, nullable = false)
    private SellerInfo sellerInfo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = Columns.PRODUCT_ID)
    private Product product;
}
