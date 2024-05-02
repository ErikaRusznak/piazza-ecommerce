package com.ozius.internship.project.entity.product;

import com.ozius.internship.project.entity.BaseEntity;
import com.ozius.internship.project.entity.Category;
import com.ozius.internship.project.entity.DomainEventPublisherProvider;
import com.ozius.internship.project.entity.buyer.Buyer;
import com.ozius.internship.project.entity.exception.IllegalPriceException;
import com.ozius.internship.project.entity.exception.IllegalRatingException;
import com.ozius.internship.project.entity.review.Review;
import com.ozius.internship.project.entity.review.ReviewAddedEvent;
import com.ozius.internship.project.entity.seller.Seller;
import jakarta.persistence.*;
import lombok.Getter;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = Product.TABLE_NAME/*, uniqueConstraints = { @UniqueConstraint(columnNames = { Product.Columns.NAME, Product.Columns.SELLER_ID }) }*/)
public class Product extends BaseEntity {
    public static final String TABLE_NAME = "product";

    interface Columns {
        String NAME = "NAME";
        String DESCRIPTION = "DESCRIPTION";
        String IMAGE_NAME = "IMAGE_NAME";
        String PRICE = "PRICE";
        String CATEGORY_ID = "CATEGORY_ID";
        String SELLER_ID = "SELLER_ID";
        String UNIT_OF_MEASURE = "UNIT_OF_MEASURE";
        String PRODUCT_RATING = "PRODUCT_RATING";
        String NUMBER_REVIEWS = "NUMBER_REVIEWS";
        String IS_RATING_APPLICABLE = "IS_RATING_APPLICABLE";
    }

    @Getter
    @Column(name = Columns.NAME, nullable = false)
    private String name;

    @Getter
    @Column(name = Columns.DESCRIPTION, nullable = false)
    private String description;

    @Getter
    @Column(name = Columns.IMAGE_NAME, nullable = false)
    private String imageName;

    @Getter
    @Column(name = Columns.PRICE, nullable = false)
    private float price;

    @Getter
    @Column(name = Columns.UNIT_OF_MEASURE, nullable = false)
    private UnitOfMeasure unitOfMeasure;

    @Column(name = Columns.PRODUCT_RATING)
    private Double productRating;

    @Column(name = Columns.NUMBER_REVIEWS)
    private int numberReviews;

    @Column(name = Columns.IS_RATING_APPLICABLE)
    private boolean isRatingApplicable;

    @Getter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = Columns.CATEGORY_ID, nullable = false)
    private Category category;

    @Getter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = Columns.SELLER_ID, nullable = false, foreignKey = @ForeignKey(foreignKeyDefinition = "FOREIGN KEY (" + Columns.SELLER_ID + ") REFERENCES " + Seller.TABLE_NAME + " (" + BaseEntity.ID + ")  ON DELETE CASCADE"))
    private Seller seller;

    @Getter
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = Review.Columns.PRODUCT_ID, nullable = false, foreignKey = @ForeignKey(foreignKeyDefinition =
            "FOREIGN KEY (" + Review.Columns.PRODUCT_ID + ") REFERENCES " + Product.TABLE_NAME + " (" + BaseEntity.ID + ")  ON DELETE CASCADE"))
    private Set<Review> reviews;


    protected Product() {
    }

    public Product(String name, String description, String imageName, float price, Category category, Seller seller, UnitOfMeasure unitOfMeasure) {
        this.name = name;
        this.description = description;
        this.imageName = imageName;
        if (price < 0) {
            throw new IllegalPriceException("Price cannot be negative!");
        }
        this.price = price;
        this.category = category;
        this.seller = seller;
        this.unitOfMeasure = unitOfMeasure;
        this.productRating = 0.0;
        this.numberReviews = 0;
        this.isRatingApplicable = false;
        this.reviews = new HashSet<>();
    }

    public Double getProductRating() {
        return productRating;
    }

    public long getNumberReviews() {
        return numberReviews;
    }

    public boolean isRatingApplicable() {
        return isRatingApplicable;
    }

    public Review addReview(Buyer buyer, String description, float rating){

        if(rating < 0 || rating > 5) {
            throw new IllegalRatingException("Rating must be between 0 and 5!");
        }

        Review reviewNew = new Review(description, rating, buyer);
        this.reviews.add(reviewNew);

        DomainEventPublisherProvider.getEventPublisher().publishEvent(new ReviewAddedEvent(this.getId()));

        return reviewNew;
    }

    public Double calculateProductRating(List<Review> reviews) {
        return reviews.stream()
                .mapToDouble(Review::getRating)
                .average()
                .orElse(0.0);
    }

    public void updateRatingInformation(List<Review> reviews) {
        this.productRating = calculateProductRating(reviews);
        this.numberReviews = reviews.size();
        this.isRatingApplicable = numberReviews > 2;
    }

    public void updateProduct(String name, String description, String imageName, float price, Category category, Seller seller, UnitOfMeasure unitOfMeasure) {
        this.name = name;
        this.description = description;
        this.imageName = imageName;
        if (price < 0) {
            throw new IllegalPriceException("Price cannot be negative!");
        }
        this.price = price;
        this.category = category;
        this.seller = seller;
        this.unitOfMeasure = unitOfMeasure;
    }

    @Override
    public String toString() {
        return "Product{" +
                "name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", imageName='" + imageName + '\'' +
                ", price=" + price +
                ", category=" + category.getName() +
                ", sellerInfo=" + seller.getAlias() +
                '}';
    }
}
