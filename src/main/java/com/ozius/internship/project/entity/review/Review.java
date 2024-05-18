package com.ozius.internship.project.entity.review;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ozius.internship.project.entity.BaseEntity;
import com.ozius.internship.project.entity.DomainEventPublisherProvider;
import com.ozius.internship.project.entity.buyer.Buyer;
import com.ozius.internship.project.entity.product.Product;
import com.ozius.internship.project.entity.exception.IllegalRatingException;
import com.ozius.internship.project.entity.user.UserAccount;
import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Getter
@Entity
@Table(name = Review.TABLE_NAME)
public class Review extends BaseEntity {
    public static final String TABLE_NAME = "review";

    public interface Columns {
        String DESCRIPTION = "DESCRIPTION";
        String RATING = "RATING";
        String BUYER_ID = "BUYER_ID";
        String PRODUCT_ID = "PRODUCT_ID";
        String PUBLISH_DATE = "PUBLISH_DATE";
        String LIKES = "LIKES";
        String DISLIKES = "DISLIKES";
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

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = Comment.Columns.REVIEW_ID, nullable = false, foreignKey = @ForeignKey(foreignKeyDefinition =
            "FOREIGN KEY (" + Comment.Columns.REVIEW_ID + ") REFERENCES " + Review.TABLE_NAME + " (" + BaseEntity.ID + ")  ON DELETE CASCADE"))
    private Set<Comment> comments;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = Columns.PRODUCT_ID, nullable = false, insertable = false, updatable = false, foreignKey = @ForeignKey(foreignKeyDefinition = "FOREIGN KEY (" + Columns.PRODUCT_ID + ") REFERENCES " + Product.TABLE_NAME + " (" + BaseEntity.ID + ")  ON DELETE CASCADE"))
    private Product product;

    @Column(name = Columns.LIKES)
    private int likes;

    @Column(name = Columns.DISLIKES)
    private int dislikes;

    protected Review() {
    }

    public Review(String description, float rating, Buyer buyer) {
        this.description = description;
        this.rating = rating;
        this.buyer = buyer;
        this.publishDate = LocalDate.now();
        this.comments = new HashSet<>();
        this.likes = 0;
        this.dislikes = 0;
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

    public Comment addComment(String content, UserAccount userAccount){
        Comment comment = new Comment(content, userAccount);
        this.comments.add(comment);
        return comment;
    }

    @Override
    public String toString() {
        return "Review{" +
                "description='" + description + '\'' +
                ", rating=" + rating +
                ", buyerInfo=" + buyer.getAccount().getFirstName() +
                ", publishDate=" + publishDate +
                '}';
    }
}
