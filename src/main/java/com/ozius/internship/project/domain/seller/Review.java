package com.ozius.internship.project.domain.seller;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ozius.internship.project.domain.BaseEntity;
import com.ozius.internship.project.domain.DomainEventPublisherProvider;
import com.ozius.internship.project.domain.buyer.Buyer;
import com.ozius.internship.project.domain.product.Product;
import com.ozius.internship.project.domain.exception.IllegalRatingException;
import jakarta.persistence.*;

import java.time.LocalDate;

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
        String PUBLISH_DATE = "PUBLISH_DATE";

    }
    @Column(name = Columns.DESCRIPTION, nullable = false)
    private String description;

    @Column(name = Columns.RATING, nullable = false)
    private float rating;

    @Column(name = Columns.PUBLISH_DATE, nullable = false, updatable = false)
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate publishDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = Columns.BUYER_ID, foreignKey = @ForeignKey(foreignKeyDefinition = "FOREIGN KEY (" + Columns.BUYER_ID + ") REFERENCES " + Buyer.TABLE_NAME + " (" + BaseEntity.ID + ")  ON DELETE SET NULL"))
    private Buyer buyer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = Columns.PRODUCT_ID, foreignKey = @ForeignKey(foreignKeyDefinition = "FOREIGN KEY (" + Columns.PRODUCT_ID + ") REFERENCES " + Product.TABLE_NAME + " (" + BaseEntity.ID + ")  ON DELETE SET NULL"))
    private Product product;

    protected Review() {
    }

    Review(String description, float rating, Buyer buyer, Product product) {
        this.description = description;
        this.rating = rating;
        this.buyer = buyer;
        this.product = product;
        this.publishDate = LocalDate.now();
    }

    public String getDescription() {
        return description;
    }

    public float getRating() {
        return rating;
    }

    public Buyer getBuyer() {
        return buyer;
    }

    public Product getProduct() {
        return product;
    }

    public LocalDate getPublishDate() {
        return publishDate;
    }

    public void updateReview(String description, float rating) {
        if(rating < 0 || rating > 5) {
            throw new IllegalRatingException("Rating must be between 0 and 5!");
        }
        this.description = description;
        this.rating = rating;
        this.publishDate = LocalDate.now();

        DomainEventPublisherProvider.getEventPublisher().publishEvent(new ReviewUpdatedEvent(product.getId()));
    }

    @Override
    public String toString() {
        return "Review{" +
                "description='" + description + '\'' +
                ", rating=" + rating +
                ", buyerInfo=" + buyer.getAccount().getFirstName() +
                ", seller=" + product.getSeller().getAlias() +
                ", product=" + product.getName() +
                ", publishDate=" + publishDate +
                '}';
    }
}
