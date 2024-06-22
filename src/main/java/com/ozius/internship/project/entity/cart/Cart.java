package com.ozius.internship.project.entity.cart;

import com.ozius.internship.project.entity.BaseEntity;
import com.ozius.internship.project.entity.buyer.Buyer;
import com.ozius.internship.project.entity.exception.IllegalItemException;
import com.ozius.internship.project.entity.exception.NotFoundException;
import com.ozius.internship.project.entity.product.Product;
import jakarta.persistence.*;
import lombok.Getter;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = Cart.TABLE_NAME)
public class Cart extends BaseEntity {
    public static final String TABLE_NAME = "cart";

    interface Columns {
        String BUYER_ID = "BUYER_ID";
        String TOTAL_PRICE = "TOTAL_PRICE";
    }

    @Getter
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = Cart.Columns.BUYER_ID, foreignKey = @ForeignKey(foreignKeyDefinition = "FOREIGN KEY (" + Columns.BUYER_ID + ") REFERENCES " + Buyer.TABLE_NAME + " (" + BaseEntity.ID + ")  ON DELETE CASCADE"))
    private Buyer buyer;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = CartItem.Columns.CART_ID, foreignKey = @ForeignKey(foreignKeyDefinition =
            "FOREIGN KEY (" + CartItem.Columns.CART_ID + ") REFERENCES " + Cart.TABLE_NAME + " (" + BaseEntity.ID + ")  ON DELETE CASCADE"))
    @OrderBy("id ASC")
    private Set<CartItem> cartItems;

    @Getter
    @Column(name = Columns.TOTAL_PRICE, nullable = false, scale = 2)
    private double totalCartPrice;

    @Deprecated()
    public Cart() {
        this.cartItems = new HashSet<>();
    }

    public Cart(Buyer buyer) {
        this.buyer = buyer;
        this.cartItems = new HashSet<>();
        this.totalCartPrice = 0f;
    }

    public Set<CartItem> getCartItems() {
        return Collections.unmodifiableSet(cartItems);
    }

    private float calculateItemPrice(CartItem cartItem) {
        return cartItem.getQuantity() * cartItem.getProduct().getPrice();
    }

    public double calculateTotalPrice() {
        double sum = cartItems.stream()
                .mapToDouble(this::calculateItemPrice)
                .sum();
        return BigDecimal.valueOf(sum).setScale(2, RoundingMode.HALF_UP).doubleValue();
    }

    private CartItem getCartItemByProduct(Product product) {
        return cartItems.stream()
                .filter(cartItem -> cartItem.getProduct().equals(product))
                .findFirst()
                .orElse(null);
    }

    public void addOrUpdateItem(Product product, float quantity) {

        CartItem existingCartItem = getCartItemByProduct(product);

        if(existingCartItem!=null && existingCartItem.getQuantity()+quantity == 0F) {
            removeFromCart(product);
        }
        if(product.getQuantity() >= quantity) {
            if (existingCartItem != null) {
                existingCartItem.setQuantity(existingCartItem.getQuantity() + quantity);
            } else {
                CartItem cartItem = new CartItem(quantity, product);
                this.cartItems.add(cartItem);
            }
            product.setQuantity(product.getQuantity() - quantity);
            product.setAvailability(product.getQuantity());
        } else {
            throw new IllegalItemException("Not enough items in the inventory!");
        }
        this.totalCartPrice = calculateTotalPrice();
    }

    public void removeFromCart(Product product) {
        CartItem cartItem = getCartItemByProduct(product);
        if(cartItem == null) {
            throw new NotFoundException("Cart item was not found in the list!");
        }
        product.setQuantity(product.getQuantity() + cartItem.getQuantity());
        product.setAvailability(product.getQuantity());
        this.cartItems.remove(cartItem);
        this.totalCartPrice = calculateTotalPrice();
    }

    public void clearCartFromAllCartItems() {
        this.cartItems.clear();
        this.totalCartPrice = 0f;
    }

    public void assignBuyerToCart(Buyer buyer) {
        this.buyer = buyer;
    }

    @Override
    public String toString() {
        return "Cart{" +
                ", cartItems=" + cartItems +
                '}';
    }
}
