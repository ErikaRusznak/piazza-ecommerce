package com.ozius.internship.project.entity.user;

import com.ozius.internship.project.entity.BaseEntity;
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

    protected SellerRequest(){
    }

    public SellerRequest(String reason, String sellerEmail) {
        this.reason = reason;
        this.sellerEmail = sellerEmail;
        this.date = LocalDateTime.now();
        this.status = RequestStatus.PENDING;
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
