package com.ozius.internship.project.entity;

import jakarta.persistence.*;

@Entity
@Table(name = BuyerAddress.TABLE_NAME)
public class BuyerAddress extends BaseEntity{

    public static final String TABLE_NAME = "BUYER_ADDRESS";

    interface Columns {
        String BUYER_ID = "BUYER_ID";
    }

    @Embedded
    @AttributeOverrides({
            @AttributeOverride( name = "country", column = @Column(name = "COUNTRY")), //TODO use column name constants for COUNTRY, state etc..
            @AttributeOverride( name = "state", column = @Column(name = "STATE")),//todo define NN constraints
            @AttributeOverride( name = "city", column = @Column(name = "CITY")),
            @AttributeOverride( name = "addressLine1", column = @Column(name = "ADDRESS_LINE_1")),
            @AttributeOverride( name = "addressLine2", column = @Column(name = "ADDRESS_LINE_2")),
            @AttributeOverride( name = "zipCode", column = @Column(name = "ZIP_CODE"))
    })
    private Address address;

    protected BuyerAddress() {
    }

    public BuyerAddress(Address address) {
        this.address = address;
    }

    public Address getAddress() {
        return address;
    }

    @Override
    public String toString() {
        return "BuyerAddress{" +
                "address=" + address +
                '}';
    }
}
