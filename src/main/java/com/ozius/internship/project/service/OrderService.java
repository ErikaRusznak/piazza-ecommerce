package com.ozius.internship.project.service;

import com.ozius.internship.project.dto.BuyerAddressDto;
import com.ozius.internship.project.dto.CheckoutItemDto;
import com.ozius.internship.project.dto.FullOrderDTO;
import com.ozius.internship.project.dto.OrderDTO;
import com.ozius.internship.project.entity.courier.Courier;
import com.ozius.internship.project.entity.order.OrderStatus;
import com.ozius.internship.project.entity.user.Address;
import com.ozius.internship.project.entity.buyer.Buyer;
import com.ozius.internship.project.entity.cart.Cart;
import com.ozius.internship.project.entity.order.FullOrder;
import com.ozius.internship.project.entity.order.Order;
import com.ozius.internship.project.entity.product.Product;
import com.ozius.internship.project.entity.seller.Seller;
import com.ozius.internship.project.repository.CourierRepository;
import com.ozius.internship.project.repository.FullOrderRepository;
import com.ozius.internship.project.repository.OrderRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @PersistenceContext
    private EntityManager em;
    private final BuyerService buyerService;
    private final CartService cartService;
    private final FullOrderRepository fullOrderRepository;
    private final OrderRepository orderRepository;
    private final CourierRepository courierRepository;
    private final ModelMapper modelMapper;

    public OrderService(BuyerService buyerService, CartService cartService, FullOrderRepository fullOrderRepository, OrderRepository orderRepository, CourierRepository courierRepository, ModelMapper modelMapper) {
        this.buyerService = buyerService;
        this.cartService = cartService;
        this.fullOrderRepository = fullOrderRepository;
        this.orderRepository = orderRepository;
        this.courierRepository = courierRepository;
        this.modelMapper = modelMapper;
    }

    public boolean canAccessOrder(String authenticatedUserEmail, long fullOrderId) {
        String orderBuyerEmail = getBuyerEmailFromOrder(fullOrderId);
        return authenticatedUserEmail.equals(orderBuyerEmail);
    }

    public String getBuyerEmailFromOrder(long id) {
        FullOrder fullOrder = fullOrderRepository.findById(id).orElseThrow();
        return fullOrder.getBuyerEmail();
    }

    public String getSellerEmailFromOrder(long id) {
        Order order = orderRepository.findById(id).orElseThrow();
        return order.getSellerEmail();
    }


    @Transactional
    public FullOrderDTO makeOrdersFromCheckout(String buyerEmail, BuyerAddressDto shippingAddress, List<CheckoutItemDto> products) {

        Address address = shippingAddress.getAddress();
        String buyerFirstName = shippingAddress.getFirstName();
        String buyerLastName = shippingAddress.getLastName();
        String buyerTelephone = shippingAddress.getTelephone();
        FullOrder fullOrder = new FullOrder(buyerEmail, address);

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
                Order order = new Order(address, buyer, k, buyerEmail, buyerFirstName, buyerLastName, buyerTelephone, fullOrder);
                order.assignRandomCourier(em);
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

        fullOrder.setTotalPrice();
        em.persist(fullOrder);
        return modelMapper.map(fullOrder, FullOrderDTO.class);

    }

    @Transactional
    public FullOrderDTO getFullOrderById(long id) {
        FullOrder fullOrder = fullOrderRepository.findById(id).orElseThrow();
        return modelMapper.map(fullOrder, FullOrderDTO.class);
    }

    @Transactional
    public List<FullOrderDTO> getFullOrdersForBuyerEmail(String email) {
        List<FullOrder> fullOrders = fullOrderRepository.findAllByBuyerEmail(email);
        return fullOrders.stream()
                .map(fullOrder -> modelMapper.map(fullOrder, FullOrderDTO.class))
                .collect(Collectors.toList());
    }

    @Transactional
    public List<OrderDTO> getAllOrdersForSeller(String sellerEmail) {
        List<Order> orders = orderRepository.findBySellerEmailOrderByOrderDateDesc(sellerEmail);
        return orders.stream()
                .map(order -> modelMapper.map(order, OrderDTO.class))
                .collect(Collectors.toList());
    }

    @Transactional
    public List<OrderDTO> getOrdersByCourier(String courierEmail) {

        Courier courier = courierRepository.findCourierByAccount_Email(courierEmail).orElseThrow();

        List<OrderStatus> allowedStatuses = Arrays.asList(OrderStatus.READY_TO_SHIP, OrderStatus.SHIPPING, OrderStatus.DELIVERED);
        List<Order> orders = orderRepository.findOrdersForCourierWithStatus(courier, allowedStatuses);

        return orders.stream()
                .map(order -> modelMapper.map(order, OrderDTO.class))
                .collect(Collectors.toList());
    }

    @Transactional
    public OrderDTO getOrderById(long id) {
        Order order = orderRepository.findById(id).orElseThrow();
        return modelMapper.map(order, OrderDTO.class);
    }

    @Transactional
    public void markOrderAsProcessing(long id) {
        Order order = orderRepository.findById(id).orElseThrow();
        order.markedAsProcessing();
    }

    @Transactional
    public void markOrderAsReadyToShip(long id) {
        Order order = orderRepository.findById(id).orElseThrow();
        order.markAsReadyToShip();;
    }

    @Transactional
    public void markOrderAsShipping(long id) {
        Order order = orderRepository.findById(id).orElseThrow();
        order.markedAsShipping();
    }

    @Transactional
    public void markOrderAsDelivered(long id) {
        Order order = orderRepository.findById(id).orElseThrow();
        order.markedAsDelivered();
    }

    @Transactional
    public void markOrderAsCanceled(long id) {
        Order order = orderRepository.findById(id).orElseThrow();
        order.markedAsCanceled();
    }

}
