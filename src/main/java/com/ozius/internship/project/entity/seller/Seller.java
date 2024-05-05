package com.ozius.internship.project.entity.seller;

import com.ozius.internship.project.entity.user.Address;
import com.ozius.internship.project.entity.BaseEntity;
import com.ozius.internship.project.entity.user.UserAccount;
import com.ozius.internship.project.entity.exception.IllegalSellerDetails;
import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDate;

@Entity
@Table(name = Seller.TABLE_NAME, uniqueConstraints = {
        @UniqueConstraint(columnNames =
            { Seller.Columns.COMPANY_NAME, Seller.Columns.CUI, Seller.Columns.COMPANY_TYPE, Seller.Columns.NUMERIC_CODE_BY_STATE, Seller.Columns.SERIAL_NUMBER, Seller.Columns.DATE_OF_REGISTRATION }),
        @UniqueConstraint(columnNames =
            { Seller.Columns.COUNTRY, Seller.Columns.STATE, Seller.Columns.CITY, Seller.Columns.ADDRESS_LINE_1, Seller.Columns.ADDRESS_LINE_2, Seller.Columns.ZIP_CODE})})
public class Seller extends BaseEntity {

    public static final String TABLE_NAME = "seller";

    interface Columns{
        String ACCOUNT_ID = "ACCOUNT_ID";
        String ALIAS = "ALIAS";
        String COUNTRY = "COUNTRY";
        String STATE = "STATE";
        String CITY = "CITY";
        String ADDRESS_LINE_1 = "ADDRESS_LINE_1";
        String ADDRESS_LINE_2 = "ADDRESS_LINE_2";
        String ZIP_CODE = "ZIP_CODE";
        String SELLER_TYPE = "SELLER_TYPE";
        String COMPANY_NAME = "COMPANY_NAME";
        String CUI = "CUI";
        String COMPANY_TYPE = "COMPANY_TYPE";
        String NUMERIC_CODE_BY_STATE = "NUMERIC_CODE_BY_STATE";
        String SERIAL_NUMBER = "SERIAL_NUMBER";
        String DATE_OF_REGISTRATION = "DATE_OF_REGISTRATION";
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

    @Getter
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "name", column = @Column(name = Columns.COMPANY_NAME)),
            @AttributeOverride(name = "cui", column = @Column(name = Columns.CUI, length = 10, unique = true)),
            @AttributeOverride(name = "registrationNumber.companyType", column = @Column(name = Columns.COMPANY_TYPE)),
            @AttributeOverride(name = "registrationNumber.numericCodeByState", column = @Column(name = Columns.NUMERIC_CODE_BY_STATE)),
            @AttributeOverride(name = "registrationNumber.serialNumber", column = @Column(name = Columns.SERIAL_NUMBER)),
            @AttributeOverride(name = "registrationNumber.dateOfRegistration", column = @Column(name = Columns.DATE_OF_REGISTRATION))
    })
    private LegalDetails legalDetails;

    @Getter
    @Enumerated(EnumType.STRING)
    @Column(name = Columns.SELLER_TYPE, nullable = false)
    private SellerType sellerType;

    @Getter
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = Columns.ACCOUNT_ID, nullable = false)
    private UserAccount account;


    @Getter
    @Column(name = Columns.ALIAS, nullable = false, unique = true)
    private String alias;

    protected Seller() {
    }

    public Seller(String alias, SellerType sellerType, UserAccount account, Address legalAddress, LegalDetails legalDetails) {
        this.legalAddress = legalAddress;
        this.account = account;
        this.alias = alias;
        this.sellerType = sellerType;
        if(sellerType != SellerType.LOCAL_FARMER){
            if(legalDetails==null) throw new IllegalSellerDetails("legalDetails can't be null if company or pfa");
            this.legalDetails = legalDetails;
        }
    }

    public Seller(String alias, SellerType sellerType, UserAccount account, Address legalAddress) {
        this.legalAddress = legalAddress;
        this.account = account;
        this.alias = alias;
        this.sellerType = sellerType;
    }

    public Address getLegalAddress() {
        return legalAddress != null ? legalAddress : null;
    }

    public String getCity() {
        return legalAddress != null ? legalAddress.getCity() : null;
    }

    public String getCountry() { return legalAddress != null ? legalAddress.getCountry() : null; }

    public String getState() { return legalAddress != null ? legalAddress.getState() : null;}

    public String getAddressLine1() { return legalAddress != null ? legalAddress.getAddressLine1() : null; }

    public String getAddressLine2() { return legalAddress != null ? legalAddress.getAddressLine2() : null; }

    public String getZipCode() { return legalAddress != null ? legalAddress.getZipCode() : null; }

    public String getCompanyName() {
        return legalDetails != null ? legalDetails.getName() : null;
    }

    public String getCui() {
        return legalDetails != null ? legalDetails.getCui() : null;
    }

    public CompanyType getCompanyType() {
        return legalDetails != null && legalDetails.getRegistrationNumber() != null
                ? legalDetails.getRegistrationNumber().getCompanyType()
                : null;
    }

    public Integer getNumericCodeByState() {
        return legalDetails != null && legalDetails.getRegistrationNumber() != null
                ? legalDetails.getRegistrationNumber().getNumericCodeByState()
                : null;
    }

    public Integer getSerialNumber() {
        return legalDetails != null && legalDetails.getRegistrationNumber() != null
                ? legalDetails.getRegistrationNumber().getSerialNumber()
                : null;
    }

    public LocalDate getDateOfRegistration() {
        return legalDetails != null && legalDetails.getRegistrationNumber() != null
                ? legalDetails.getRegistrationNumber().getDateOfRegistration()
                : null;
    }


    public void updateSeller(LegalDetails legalDetails, Address legalAddress) {
        this.legalAddress = legalAddress;
        this.legalDetails = legalDetails;
    }
    public void updateSellerLegalDetails(LegalDetails legalDetails){
        this.legalDetails = legalDetails;
    }
    public void updateSellerAddress(Address legalAddress) {
        this.legalAddress = legalAddress;
    }

    @Override
    public String toString() {
        return "Seller{" +
                "alias='" + alias + '\'' +
                '}';
    }

}
