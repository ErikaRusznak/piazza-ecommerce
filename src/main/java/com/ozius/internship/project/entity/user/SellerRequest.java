package com.ozius.internship.project.entity.user;

import com.ozius.internship.project.entity.BaseEntity;
import com.ozius.internship.project.entity.seller.SellerType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Entity
@Table(name = SellerRequest.TABLE_NAME)
public class SellerRequest extends BaseEntity {

    public static final String TABLE_NAME = "seller_request";

    interface Columns{
        String DATE = "DATE";
        String STATUS = "STATUS";
        String REASON = "REASON";
        String SELLER_EMAIL = "SELLER_EMAIL";
        String SELLER_CUI = "SELLER_CUI";
        String SELLER_TYPE = "SELLER_TYPE";
    }

    @Column(name = Columns.DATE, nullable = false)
    private LocalDateTime date;

    @Setter
    @Enumerated(EnumType.STRING)
    @Column(name = Columns.STATUS, nullable = false)
    private RequestStatus status;

    @Column(name = Columns.REASON, nullable = false)
    private String reason;

    @Column(name = Columns.SELLER_EMAIL, nullable = false)
    private String sellerEmail;

    @Column(name = Columns.SELLER_CUI)
    private String sellerCui;

    @Column(name = Columns.SELLER_TYPE, nullable = false)
    @Enumerated(EnumType.STRING)
    private SellerType sellerType;

    protected SellerRequest(){
    }

    public SellerRequest(String reason, String sellerEmail, SellerType sellerType) {
        this.reason = reason;
        this.sellerEmail = sellerEmail;
        this.date = LocalDateTime.now();
        this.status = RequestStatus.PENDING;
        this.sellerType = sellerType;
    }

    public SellerRequest(String reason, String sellerEmail, String sellerCui, SellerType sellerType) {
        this.reason = reason;
        this.sellerEmail = sellerEmail;
        this.date = LocalDateTime.now();
        this.status = RequestStatus.PENDING;
        this.sellerCui = sellerCui;
        this.sellerType = sellerType;
    }

    @Override
    public String toString() {
        return "SellerRequest{" +
                "date=" + date +
                ", status=" + status +
                ", reason='" + reason + '\'' +
                ", sellerEmail='" + sellerEmail + '\'' +
                '}';
    }
}
