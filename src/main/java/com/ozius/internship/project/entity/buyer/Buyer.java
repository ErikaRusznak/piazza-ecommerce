package com.ozius.internship.project.entity.buyer;

import com.ozius.internship.project.entity.user.Address;
import com.ozius.internship.project.entity.BaseEntity;
import com.ozius.internship.project.entity.product.Product;
import com.ozius.internship.project.entity.user.UserAccount;
import com.ozius.internship.project.entity.exception.IllegalAddressException;
import com.ozius.internship.project.entity.exception.IllegalItemException;
import jakarta.persistence.*;
import lombok.Getter;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = Buyer.TABLE_NAME)
public class Buyer extends BaseEntity {

    public static final String TABLE_NAME = "buyer";
    public static final String JOIN_TABLE_NAME = "buyer_favorites";

    interface Columns{
        String ACCOUNT_ID = "ACCOUNT_ID";
        String BUYER_ID = "BUYER_ID";
        String PRODUCT_ID = "PRODUCT_ID";

    }

    @Getter
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = Columns.ACCOUNT_ID, nullable = false)
    private UserAccount account;

    @ManyToMany//dont put cascade all here because if buyer deleted it deletes products
    @JoinTable(
            name = JOIN_TABLE_NAME,
            joinColumns = @JoinColumn(name = Columns.BUYER_ID),
            inverseJoinColumns = @JoinColumn(name = Columns.PRODUCT_ID))
    private Set<Product> favoriteProducts;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @JoinColumn(name = BuyerAddress.Columns.BUYER_ID, nullable = false, foreignKey = @ForeignKey(foreignKeyDefinition =
            "FOREIGN KEY (" + BuyerAddress.Columns.BUYER_ID + ") REFERENCES " + Buyer.TABLE_NAME + " (" + BaseEntity.ID + ")  ON DELETE CASCADE"))
    private Set<BuyerAddress> addresses;

    protected Buyer() {
    }

    public Buyer(UserAccount account) {
        this.account = account;
        this.favoriteProducts = new HashSet<>();
        this.addresses = new HashSet<>();
    }

    public Set<Product> getFavoriteProducts() {
        return Collections.unmodifiableSet(favoriteProducts);
    }

    public Set<BuyerAddress> getAddresses() {
        return Collections.unmodifiableSet(addresses);
    }

    public String getFirstName() {
        return account.getFirstName();
    }

    public String getLastName() {
        return account.getLastName();
    }

    public String getImageName() {
        return account.getImageName();
    }

    public String getTelephone() {
        return account.getTelephone();
    }
    public String getEmail() { return account.getEmail(); }


    public void addFavorite(Product product){
        if(this.favoriteProducts.stream().anyMatch(item -> item.equals(product))){
            throw new IllegalItemException("can't add to favorites, items already exists");
        }
        this.favoriteProducts.add(product);
    }

    public void removeFavorite(Product product){
        this.favoriteProducts.remove(product);
    }

    public void addAddress(Address address, String firstName, String lastName, String telephone){
        if(this.addresses.stream().map(BuyerAddress::getAddress).anyMatch(item->item.equals(address))){
            throw new IllegalAddressException("this address already exists");
        }
        BuyerAddress newBuyerAddress = new BuyerAddress(address, firstName, lastName, telephone);
        this.addresses.add(newBuyerAddress);
    }

    public void removeAddress(long id){
        BuyerAddress addressToRemove = this.addresses.stream().filter(item -> item.getId() == id).findFirst().orElseThrow();
        this.addresses.remove(addressToRemove);
    }

    public void updateAddress(Address address, String firstName, String lastName, String telephone, long id){
        BuyerAddress addressToUpdate = this.addresses.stream().filter(item -> item.getId() == id).findFirst().orElseThrow();

        addressToUpdate.updateAddress(address, firstName, lastName, telephone);
    }

    @Override
    public String toString() {
        return "Buyer{" +
                "account=" + account +
                '}';
    }
}
