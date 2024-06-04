package com.ozius.internship.project.entity.buyer;

import com.ozius.internship.project.entity.user.Address;
import com.ozius.internship.project.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;

@Getter
@Entity
@Table(name = BuyerAddress.TABLE_NAME)
public class BuyerAddress extends BaseEntity {

    public static final String TABLE_NAME = "buyer_address";

    interface Columns {
        String BUYER_ID = "BUYER_ID";
        String COUNTRY = "COUNTRY";
        String STATE = "STATE";
        String CITY = "CITY";
        String ADDRESS_LINE_1 = "ADDRESS_LINE_1";
        String ADDRESS_LINE_2 = "ADDRESS_LINE_2";
        String ZIP_CODE = "ZIP_CODE";
        String FIRST_NAME = "FIRST_NAME";
        String LAST_NAME = "LAST_NAME";
        String TELEPHONE = "TELEPHONE";
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
    private Address address;

    @Column(name = Columns.FIRST_NAME, nullable = false)
    private String firstName;

    @Column(name = Columns.LAST_NAME, nullable = false)
    private String lastName;

    @Column(name = Columns.TELEPHONE, nullable = false, length = 12)
    private String telephone;

    protected BuyerAddress() {
    }

    public BuyerAddress(Address address, String firstName, String lastName, String telephone) {
        this.address = address;
        this.firstName = firstName;
        this.lastName = lastName;
        this.telephone = telephone;
    }

    void updateAddress(Address address, String firstName, String lastName, String telephone) {
        this.address = address;
        this.firstName = firstName;
        this.lastName = lastName;
        this.telephone = telephone;
    }

    @Override
    public String toString() {
        return "BuyerAddress{" +
                "address=" + address +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", telephone='" + telephone + '\'' +
                '}';
    }
}
