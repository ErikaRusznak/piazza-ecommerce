package com.ozius.internship.project.entity;

import com.ozius.internship.project.TestDataCreator;
import com.ozius.internship.project.entity.exeption.OrderAlreadyProcessedException;
import com.ozius.internship.project.entity.order.Order;
import com.ozius.internship.project.entity.order.OrderItem;
import com.ozius.internship.project.entity.order.OrderStatus;
import com.ozius.internship.project.entity.seller.Seller;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.Test;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;

import java.time.LocalDate;

import static com.ozius.internship.project.TestDataCreator.Addresses.address1;
import static com.ozius.internship.project.TestDataCreator.Buyers.buyer;
import static com.ozius.internship.project.TestDataCreator.Categories.category;
import static com.ozius.internship.project.TestDataCreator.Sellers.seller;
import static org.assertj.core.api.Assertions.*;

public class OrderEntityTests extends EntityBaseTest{

    private JpaRepository<Order, Long> orderRepository;

    @Override
    public void createTestData(EntityManager em) {
        //----Arrange
        TestDataCreator.createBuyerBaseData(em);
        TestDataCreator.createSellerBaseData(em);
//        TestDataCreator.createAddressBaseData(em);
        TestDataCreator.createCategoriesBaseData(em);

        this.orderRepository = new SimpleJpaRepository<>(Order.class, emb);
    }

    @Test
    void test_add_empty_order(){

        //----Act
        Order addedOrder = doTransaction(em -> {
            Buyer buyerMerged = em.merge(buyer);
            Seller sellerMerged = em.merge(seller);
            Address address = new Address("Romania", "Timis", "Timisoara", "Strada Macilor 10", "Bloc 4, Scara F, ap 50", "300091");

            Order order = new Order(address, buyerMerged, sellerMerged, buyer.getAccount().getTelephone());

            em.persist(order);

            return order;
        });
        Address addedAddress = addedOrder.getAddress();

        //----Assert
        Order persistedOrder = entityFinder.getTheOne(Order.class);

        assertThat(persistedOrder).isEqualTo(addedOrder);
        assertThat(persistedOrder.getTotalPrice()).isEqualTo(0f);
        assertThat(persistedOrder.getOrderStatus()).isEqualTo(OrderStatus.DRAFT);
        assertThat(persistedOrder.getOrderItems().size()).isEqualTo(0);
        assertThat(persistedOrder.getBuyer()).isEqualTo(buyer);
        assertThat(persistedOrder.getOrderDate().toLocalDate().isEqual(LocalDate.now())).isTrue();
        assertThat(persistedOrder.getBuyerEmail()).isEqualTo(buyer.getAccount().getEmail());
        assertThat(persistedOrder.getSeller()).isEqualTo(seller);
        assertThat(persistedOrder.getTelephone()).isEqualTo(buyer.getAccount().getTelephone());
        assertThat(persistedOrder.getAddress()).isEqualTo(addedAddress);
        assertThat(persistedOrder.getSellerEmail()).isEqualTo(seller.getAccount().getEmail());
    }

    @Test
    void test_add_items_to_order(){

        //----Act
        doTransaction(em -> {
            //TODO is it okay to add a address to a static field and use it?
            // so i dont have to create an address everytime but the address isn't added to the database
            TestDataCreator.createAddresses();

            Product product1 = TestDataCreator.createProduct(em, "orez", "pentru fiert", "src/image4", 12f, category, seller);
            Product product2 = TestDataCreator.createProduct(em, "grau", "pentru paine", "src/image20", 8f, category, seller);

            Buyer buyerMerged = em.merge(buyer);
            Seller sellerMerged = em.merge(seller);

            Order order = new Order(address1, buyerMerged, sellerMerged, buyer.getAccount().getTelephone());

            order.addProduct(product1, 1f);
            order.addProduct(product2, 2f);

            em.persist(order);
        });

        //----Assert
        Order persistedOrder = entityFinder.getTheOne(Order.class);

        assertThat(persistedOrder.getTotalPrice()).isEqualTo(28.0f);
        assertThat(persistedOrder.getOrderStatus()).isEqualTo(OrderStatus.READY_TO_BE_PROCESSED);
        assertThat(persistedOrder.getOrderItems().size()).isEqualTo(2);
    }

    @Test
    void test_add_order_item_to_order(){

        //----Arrange
        Product product = doTransaction(em -> {
            TestDataCreator.createAddresses();
            return TestDataCreator.createProduct(em, "orez", "pentru fiert", "src/image4", 12f, category, seller);
        });

        //----Act
        OrderItem item = doTransaction(em -> {

            Buyer buyerMerged = em.merge(buyer);
            Seller sellerMerged = em.merge(seller);

            Order order = new Order(address1, buyerMerged, sellerMerged, buyer.getAccount().getTelephone());

            OrderItem addedItem = order.addProduct(product, 2f);

            em.persist(order);

            return addedItem;
        });

        //----Assert
        Order persistedOrder = entityFinder.getTheOne(Order.class);
        OrderItem persistedOrderItem = persistedOrder.getOrderItems().stream().findFirst().orElseThrow();

        assertThat(persistedOrderItem).isEqualTo(item);
        assertThat(persistedOrderItem.getProduct()).isEqualTo(product);
        assertThat(persistedOrderItem.getItemName()).isEqualTo(product.getName());
        assertThat(persistedOrderItem.getDescription()).isEqualTo(product.getDescription());
    }

    @Test
    void test_update_product_details(){

        //----Arrange
        Product productToUpdate = doTransaction(em -> {
            TestDataCreator.createAddresses();

            Product product = TestDataCreator.createProduct(em, "orez", "pentru fiert", "src/image4", 12f, category, seller);

            Buyer buyerMerged = em.merge(buyer);
            Seller sellerMerged = em.merge(seller);

            Order order = new Order(address1, buyerMerged, sellerMerged, buyer.getAccount().getTelephone());

            order.addProduct(product, 2f);

            em.persist(order);

            return product;
        });

        //----Act
        doTransaction(em -> {
            Product productMerged = em.merge(productToUpdate);
            productMerged.setPrice(50f);
        });

        //----Assert
        Order persistedOrder = entityFinder.getTheOne(Order.class);
        OrderItem persistedOrderItem = persistedOrder.getOrderItems().stream().findFirst().orElseThrow();
        Product persistedProduct = persistedOrderItem.getProduct();

        assertThat(persistedOrderItem.getItemPrice()).isEqualTo(12f);
        assertThat(persistedProduct.getPrice()).isEqualTo(50f);
    }

    @Test
    void test_remove_order(){

        //----Arrange
        Order addedOrder = doTransaction(em -> {
            TestDataCreator.createAddresses();

            Product product = TestDataCreator.createProduct(em, "orez", "pentru fiert", "src/image4", 12f, category, seller);

            Buyer buyerMerged = em.merge(buyer);
            Seller sellerMerged = em.merge(seller);

            Order order = new Order(address1, buyerMerged, sellerMerged, buyer.getAccount().getTelephone());

            order.addProduct(product, 2f);

            em.persist(order);

            return order;
        });

        //----Act
        doTransaction(em -> {
            Order orderMerged = em.merge(addedOrder);
            em.remove(orderMerged);
        });

        //----Assert
        assertThat(orderRepository.findAll().contains(addedOrder)).isFalse();
    }

    @Test
    void test_update_order_status(){

        //----Arrange
        Order addedOrder = doTransaction(em -> {
            TestDataCreator.createAddresses();

            Product product = TestDataCreator.createProduct(em, "orez", "pentru fiert", "src/image4", 12f, category, seller);

            Buyer buyerMerged = em.merge(buyer);
            Seller sellerMerged = em.merge(seller);

            Order order = new Order(address1, buyerMerged, sellerMerged, buyer.getAccount().getTelephone());

            order.addProduct(product, 2f);

            em.persist(order);

            return order;
        });

        //----Act
        Product addedProduct = doTransaction(em -> {
            Order orderMerged = em.merge(addedOrder);
            orderMerged.setOrderStatus(OrderStatus.PROCESSED);
            Product product = TestDataCreator.createProduct(em, "grau", "pentru paine", "src/image20", 8f, category, seller);

            try {
                orderMerged.addProduct(product, 2f);
                fail("supposed to fail");
            }catch (OrderAlreadyProcessedException exception){
                //nothing to do, supposed to fail
            }

            return product;
        });

        //----Assert
        Order persistedOrder = entityFinder.getTheOne(Order.class);

        assertThat(persistedOrder.getOrderStatus()).isEqualTo(OrderStatus.PROCESSED);
        assertThat(persistedOrder.getOrderItems().stream().map(OrderItem::getProduct)).doesNotContain(addedProduct);
    }
}
