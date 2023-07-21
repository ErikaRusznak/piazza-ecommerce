package com.ozius.internship.project.entity;

import jakarta.persistence.*;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = Cart.TABLE_NAME)
public class Cart extends BaseEntity {
    public static final String TABLE_NAME = "cart";

    interface Columns {
    }

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = CartItem.Columns.PRODUCT_ID)
    private Set<CartItem> cartItems = new HashSet<>();

    public Cart() {
    }

//    public Cart() {
//        this.cartItems = new HashSet<>();
//    }

    public Set<CartItem> getCartItems() {
        return Collections.unmodifiableSet(cartItems);
    }

    public float calculateItemPrice(CartItem cartItem) {
        return cartItem.getQuantity() * cartItem.getProduct().getPrice();
    }

    public double calculateTotalPrice() {
        return cartItems.stream()
                .mapToDouble(cartItem -> this.calculateItemPrice(cartItem))
                .sum();
    }

    public void modifyItem(CartItem cartItem, float quantity) {
        cartItem.setQuantity(quantity);
    }

    public void addToCart(Product product, float quantity) {
        CartItem cartItem = new CartItem(quantity, product);
        this.cartItems.add(cartItem);
    }

}
