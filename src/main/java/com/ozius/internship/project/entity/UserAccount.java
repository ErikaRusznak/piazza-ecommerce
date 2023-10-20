package com.ozius.internship.project.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = UserAccount.TABLE_NAME)
public class UserAccount extends BaseEntity{

    public static final String TABLE_NAME = "user_account";

    interface Columns{
        String FIRST_NAME = "FIRST_NAME";
        String LAST_NAME = "LAST_NAME";
        String EMAIL = "EMAIL";
        String PASSWORD_HASH = "PASSWORD_HASH";
        String IMAGE_NAME = "IMAGE_NAME";
        String TELEPHONE = "TELEPHONE";
    }

    @Column(name = Columns.FIRST_NAME, nullable = false)
    private String firstName;

    @Column(name = Columns.LAST_NAME, nullable = false)
    private String lastName;

    @Column(name = Columns.EMAIL, nullable = false, unique = true)
    private String email;

    @Column(name = Columns.PASSWORD_HASH)
    private String passwordHash;

    @Column(name = Columns.IMAGE_NAME, nullable = false)
    private String imageName;

    @Column(name = Columns.TELEPHONE, length = 12, nullable = false)
    private String telephone;

    protected UserAccount() {
    }

    public UserAccount(String firstName, String lastName, String email, String imageName, String telephone) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.imageName = imageName;
        this.telephone = telephone;
    }

    public void updateAccount(String firstName, String lastName, String email, String image, String telephone){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.imageName = image;
        this.telephone = telephone;
    }

    public void setInitialPassword(String passwordHashed){
        this.passwordHash = passwordHashed;
    }

    public void updatePassword(String currentHashedPassword,String newHashedPassword){
        if(!this.passwordHash.equals(currentHashedPassword)){
            throw new IllegalArgumentException("passwords don't match, please check current password");
        }
        this.passwordHash = newHashedPassword;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public String getImageName() {
        return imageName;
    }

    public String getTelephone() {
        return telephone;
    }

    @Override
    public String toString() {
        return "UserAccount{" +
                "firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", imageName='" + imageName + '\'' +
                ", telephone='" + telephone + '\'' +
                '}';
    }
}
