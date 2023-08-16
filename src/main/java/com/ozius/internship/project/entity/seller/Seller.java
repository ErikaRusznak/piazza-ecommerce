package com.ozius.internship.project.entity.seller;

import com.ozius.internship.project.entity.*;
import com.ozius.internship.project.entity.buyer.Buyer;
import com.ozius.internship.project.entity.exeption.IllegalISellerDetails;
import com.ozius.internship.project.entity.exeption.IllegalItemException;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = Seller.TABLE_NAME)
public class Seller extends BaseEntity {

    public static final String TABLE_NAME = "SELLER";

    interface Columns{
        String ACCOUNT_ID = "ACCOUNT_ID";
        String ALIAS = "ALIAS";
        String COUNTRY = "COUNTRY";
        String STATE = "STATE";
        String CITY = "CITY";
        String ADDRESS_LINE_1 = "ADDRESS_LINE_1";
        String ADDRESS_LINE_2 = "ADDRESS_LINE_2";
        String ZIP_CODE = "ZIP_CODE";
        String COMPANY_NAME = "COMPANY_NAME";
        String CUI = "CUI";
        String CAEN = "CAEN";
        String DATE_OF_ESTABLISHMENT = "DATE_OF_ESTABLISHMENT";
        String SELLER_TYPE = "SELLER_TYPE";
    }

    @Embedded
    @AttributeOverrides({
            @AttributeOverride( name = "country", column = @Column(name = Columns.COUNTRY, nullable = false)),
            @AttributeOverride( name = "state", column = @Column(name = Columns.STATE, nullable = false)),
            @AttributeOverride( name = "city", column = @Column(name = Columns.CITY, nullable = false)),
            @AttributeOverride( name = "addressLine1", column = @Column(name = Columns.ADDRESS_LINE_1, nullable = false)),
            @AttributeOverride( name = "addressLine2", column = @Column(name = Columns.ADDRESS_LINE_2)),
            @AttributeOverride( name = "zipCode", column = @Column(name = Columns.ZIP_CODE, length = 6, nullable = false))
    })
    private Address legalAddress;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "name", column = @Column(name = Columns.COMPANY_NAME)),
            @AttributeOverride(name = "cui", column = @Column(name = Columns.CUI)),
            @AttributeOverride(name = "caen", column = @Column(name = Columns.CAEN)),
            @AttributeOverride(name = "dateOfEstablishment", column = @Column(name = Columns.DATE_OF_ESTABLISHMENT))
    })
    private LegalDetails legalDetails;

    @Enumerated(EnumType.STRING)
    @Column(name = Columns.SELLER_TYPE, nullable = false)
    private SellerType sellerType;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = Columns.ACCOUNT_ID, nullable = false)
    private UserAccount account;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = Review.Columns.SELLER_ID)
    private Set<Review> reviews;

    @Column(name = Columns.ALIAS, nullable = false)
    private String alias;

    protected Seller() {
    }

    public Seller(Address legalAddress, UserAccount account, String alias, SellerType sellerType, LegalDetails legalDetails) {
        this.legalAddress = legalAddress;
        this.account = account;
        this.reviews = new HashSet<>();
        this.alias = alias;
        this.sellerType = sellerType;
        if(sellerType == SellerType.PFA || sellerType == SellerType.COMPANY){
            if(legalDetails==null) throw new IllegalISellerDetails("legalDetails can't be null if company or pfa");
            this.legalDetails = legalDetails;
        }
    }

    public Address getLegalAddress() {
        return legalAddress;
    }

    public UserAccount getAccount() {
        return account;
    }

    public Set<Review> getReviews() {
        return reviews;
    }

    public String getAlias() {
        return alias;
    }

    public LegalDetails getLegalDetails() {
        return legalDetails;
    }

    public SellerType getSellerType() {
        return sellerType;
    }

    public double calculateRating(){
        return this.reviews.stream().mapToDouble(Review::getRating).average().orElse(0.0);
    }

    public Review addReview(Buyer buyer, String description, float rating, Product product){

        if(!product.getSeller().equals(this)){
            throw new IllegalItemException("can't add review, product must correspond to this seller");
        }

        Review reviewNew = new Review(description, rating, buyer, product);
        this.reviews.add(reviewNew);

        return reviewNew;
    }


    public void updateSeller(String firstName, String lastName, String email, String passwordHash, String image, String telephone){
        this.account.updateAccount(new UserAccount(firstName, lastName, email, passwordHash, image, telephone));
    }

    @Override
    public String toString() {
        return "Seller{" +
                "alias='" + alias + '\'' +
                '}';
    }

}
