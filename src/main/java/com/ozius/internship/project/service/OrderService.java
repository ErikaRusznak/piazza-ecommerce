package com.ozius.internship.project.service;

import com.ozius.internship.project.dto.BuyerAddressDto;
import com.ozius.internship.project.dto.CheckoutItemDto;
import com.ozius.internship.project.dto.FullOrderDTO;
import com.ozius.internship.project.dto.ProductDTO;
import com.ozius.internship.project.entity.Address;
import com.ozius.internship.project.entity.buyer.Buyer;
import com.ozius.internship.project.entity.cart.Cart;
import com.ozius.internship.project.entity.order.FullOrder;
import com.ozius.internship.project.entity.order.Order;
import com.ozius.internship.project.entity.product.Product;
import com.ozius.internship.project.entity.seller.Seller;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OrderService {

    @PersistenceContext
    private EntityManager em;
    private final BuyerService buyerService;
    private final CartService cartService;
    private final ModelMapper modelMapper;

    public OrderService(BuyerService buyerService, CartService cartService, ModelMapper modelMapper) {
        this.buyerService = buyerService;
        this.cartService = cartService;
        this.modelMapper = modelMapper;
    }

    @Transactional
    public FullOrderDTO makeOrdersFromCheckout(String buyerEmail, BuyerAddressDto shippingAddress, List<CheckoutItemDto> products) {

        FullOrder fullOrder = new FullOrder();
        Address address = shippingAddress.getAddress();
        String buyerFirstName = shippingAddress.getFirstName();
        String buyerLastName = shippingAddress.getLastName();
        String buyerTelephone = shippingAddress.getTelephone();

        Buyer buyer = buyerService.getBuyerByEmail(buyerEmail);
        if(buyer==null){
            throw new IllegalArgumentException("buyer doesn't exits");
        }

        Map<Seller, Order> sellersToOrder = new HashMap<>();
        for(CheckoutItemDto checkoutItemDto : products){

            //retrieve product and throw exception if not found
            Product product = em.find(Product.class, checkoutItemDto.getProductId());
            if(product == null){
                throw new IllegalArgumentException("product with id: " + checkoutItemDto.getProductId() + " doesn't exits");
            }

            //retrieve seller
            Seller seller = product.getSeller();

            //retrieve order or create order if not found one in the map
            Order orderPersisted = sellersToOrder.computeIfAbsent(seller, k -> {
                Order order = new Order(address, buyer, k, buyerEmail, buyerFirstName, buyerLastName, buyerTelephone);
                em.persist(order);
                fullOrder.addOrder(order);
                return order;
            });

            //add product to the retrieved order
            orderPersisted.addProduct(product, checkoutItemDto.getQuantity());
        }

        //remove products from cart
        Cart buyerCart = cartService.getCartByUserEmail(buyerEmail);
        buyerCart.clearCartFromAllCartItems();

        em.persist(fullOrder);
        return modelMapper.map(fullOrder, FullOrderDTO.class);

    }
}
