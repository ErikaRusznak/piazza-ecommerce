package com.ozius.internship.project.entity.buyer;

import com.ozius.internship.project.entity.Address;
import com.ozius.internship.project.entity.BaseEntity;
import com.ozius.internship.project.entity.Product;
import com.ozius.internship.project.entity.UserAccount;
import com.ozius.internship.project.entity.exeption.IllegalItemException;
import jakarta.persistence.*;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = Buyer.TABLE_NAME)
public class Buyer extends BaseEntity {

    public static final String TABLE_NAME = "BUYER";
    public static final String JOIN_TABLE_NAME = "BUYER_FAVORITES";

    interface Columns{
        String ACCOUNT_ID = "ACCOUNT_ID";
        String BUYER_ID = "BUYER_ID";
        String PRODUCT_ID = "PRODUCT_ID";

    }

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = Columns.ACCOUNT_ID, nullable = false)
    private UserAccount account;

    @ManyToMany
    @JoinTable(
            name = JOIN_TABLE_NAME,
            joinColumns = @JoinColumn(name = Columns.BUYER_ID),
            inverseJoinColumns = @JoinColumn(name = Columns.PRODUCT_ID))
    private Set<Product> favoriteProducts;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @JoinColumn(name = BuyerAddress.Columns.BUYER_ID, nullable = false)
    private Set<BuyerAddress> addresses;

    protected Buyer() {
    }

    public Buyer(UserAccount account) {
        this.account = account;
        this.favoriteProducts = new HashSet<>();
        this.addresses = new HashSet<>();
    }

    public UserAccount getAccount() {
        return account;
    }

    public Set<Product> getFavoriteProducts() {
        return Collections.unmodifiableSet(favoriteProducts);
    }

    public Set<BuyerAddress> getAddresses() {
        return Collections.unmodifiableSet(addresses);
    }

    public void addFavorite(Product product){
        if(this.favoriteProducts.stream().anyMatch(item -> item.equals(product))){
            throw new IllegalItemException("can't add to favorites, items already exists");
        }
        this.favoriteProducts.add(product);
    }

    //TODO rm product by id or object
    public void removeFavorite(Product product){
        this.favoriteProducts.remove(product);
    }

    public void addAddress(Address address){
        BuyerAddress newBuyerAddress = new BuyerAddress(address);
        this.addresses.add(newBuyerAddress);
    }

    public void removeAddress(BuyerAddress address){
        this.addresses.remove(address);
    }

    public void updateBuyer(String firstName, String lastName, String email, String passwordHash, String image, String telephone){
        this.account.updateAccount(new UserAccount(firstName, lastName, email, passwordHash, image, telephone));
    }

    //TODO i cant move it because i dont know what to modify because id
    public void updateAddress(Address address, long id){
        BuyerAddress addressToUpdate = this.addresses.stream().filter(item -> item.getId() == id).findFirst().orElseThrow();

        addressToUpdate.updateAddress(address);
    }

    @Override
    public String toString() {
        return "Buyer{" +
                "account=" + account +
                '}';
    }
}
