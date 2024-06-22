package com.ozius.internship.project.entity;

import com.ozius.internship.project.JpaBaseEntity;
import com.ozius.internship.project.DataCreatorForTesting;
import com.ozius.internship.project.entity.buyer.Buyer;
import com.ozius.internship.project.entity.exception.IllegalItemException;
import com.ozius.internship.project.entity.exception.IllegalOrderState;
import com.ozius.internship.project.entity.order.*;
import com.ozius.internship.project.entity.product.Category;
import com.ozius.internship.project.entity.product.Product;
import com.ozius.internship.project.entity.product.UnitOfMeasure;
import com.ozius.internship.project.entity.seller.Seller;
import com.ozius.internship.project.entity.user.Address;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.util.List;

import static com.ozius.internship.project.DataCreatorForTesting.Addresses.address1;
import static com.ozius.internship.project.DataCreatorForTesting.Buyers.buyer1;
import static com.ozius.internship.project.DataCreatorForTesting.Categories.category1;
import static com.ozius.internship.project.DataCreatorForTesting.Sellers.seller1;
import static com.ozius.internship.project.DataCreatorForTesting.Sellers.seller2;
import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class OrderEntityTests extends JpaBaseEntity {

    private JpaRepository<Order, Long> orderRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void createTestData(EntityManager em) {
        //----Arrange
        DataCreatorForTesting.createBuyerBaseData(em, passwordEncoder);
        DataCreatorForTesting.createSellerBaseData(em, passwordEncoder);
        DataCreatorForTesting.createCategoriesBaseData(em);

        this.orderRepository = new SimpleJpaRepository<>(Order.class, emb);
    }

    @Test
    void test_add_empty_order(){

        //----Act
        Order addedOrder = doTransaction(em -> {
            Buyer buyerMerged = em.merge(buyer1);
            Seller sellerMerged = em.merge(seller1);
            Address address = new Address("Romania", "Timis", "Timisoara", "Strada Macilor 10", "Bloc 4, Scara F, ap 50", "300091");
            FullOrder fullOrder = DataCreatorForTesting.createFullOrder(em, buyerMerged.getAccount().getEmail(), address, PaymentType.CASH);

            Order order = new Order(address, buyerMerged, sellerMerged, buyerMerged.getAccount().getEmail(), buyerMerged.getAccount().getFirstName(), buyerMerged.getAccount().getLastName(), buyer1.getAccount().getTelephone(), fullOrder);

            em.persist(order);

            return order;
        });
        Address addedAddress = addedOrder.getShippingAddress();

        //----Assert
        Order persistedOrder = entityFinder.getTheOne(Order.class);
        Seller addedSeller = addedOrder.getSeller();
        assertThat(persistedOrder).isEqualTo(addedOrder);
        assertThat(persistedOrder.getTotalPrice()).isEqualTo(0f);
        assertThat(persistedOrder.getOrderStatus()).isEqualTo(OrderStatus.PENDING);
        assertThat(persistedOrder.getOrderItems().size()).isEqualTo(0);
        assertThat(persistedOrder.getOrderDate().toLocalDate().isEqual(LocalDate.now())).isTrue();
        assertThat(persistedOrder.getSeller()).isEqualTo(addedSeller);
        assertThat(persistedOrder.getShippingAddress()).isEqualTo(addedAddress);
        assertThat(persistedOrder.getSellerEmail()).isEqualTo(addedSeller.getAccount().getEmail());
        assertThat(persistedOrder.getSellerAlias()).isEqualTo(addedSeller.getAlias());
        assertThat(persistedOrder.getSellerType()).isEqualTo(addedSeller.getSellerType());
    }

    @Test
    void test_add_items_to_order(){

        //----Act
        doTransaction(em -> {

            DataCreatorForTesting.createAddresses();

            Product product1 = DataCreatorForTesting.createProduct(em, "orez", "pentru fiert", "src/image4", 12f, category1, seller1, UnitOfMeasure.KILOGRAM, 5);
            Product product2 = DataCreatorForTesting.createProduct(em, "grau", "pentru paine", "src/image20", 8f, category1, seller1, UnitOfMeasure.KILOGRAM, 7);

            Buyer buyerMerged = em.merge(buyer1);
            Seller sellerMerged = em.merge(seller1);

            FullOrder fullOrder = DataCreatorForTesting.createFullOrder(em, buyerMerged.getAccount().getEmail(), address1, PaymentType.CASH);

            Order order = new Order(address1, buyerMerged, sellerMerged, buyerMerged.getAccount().getEmail(), buyerMerged.getAccount().getFirstName(), buyerMerged.getAccount().getLastName(), buyer1.getAccount().getTelephone(), fullOrder);

            order.addProduct(product1, 1f);
            order.addProduct(product2, 2f);

            em.persist(order);
        });

        //----Assert
        Order persistedOrder = entityFinder.getTheOne(Order.class);

        assertThat(persistedOrder.getTotalPrice()).isEqualTo(28.0f);
        assertThat(persistedOrder.getOrderItems().size()).isEqualTo(2);
    }

    @Test
    void test_add_order_item_to_order(){

        //----Arrange
        Product product = doTransaction(em -> {
            DataCreatorForTesting.createAddresses();
            return DataCreatorForTesting.createProduct(em, "orez", "pentru fiert", "src/image4", 12f, category1, seller1, UnitOfMeasure.KILOGRAM, 10);
        });

        //----Act
        OrderItem item = doTransaction(em -> {

            Buyer buyerMerged = em.merge(buyer1);
            Seller sellerMerged = em.merge(seller1);

            FullOrder fullOrder = DataCreatorForTesting.createFullOrder(em, buyerMerged.getAccount().getEmail(), address1, PaymentType.CASH);

            Order order = new Order(address1, buyerMerged, sellerMerged, buyerMerged.getAccount().getEmail(), buyerMerged.getAccount().getFirstName(), buyerMerged.getAccount().getLastName(), buyer1.getAccount().getTelephone(), fullOrder);

            OrderItem addedItem = order.addProduct(product, 2f);

            em.persist(order);

            return addedItem;
        });

        //----Assert
        Order persistedOrder = entityFinder.getTheOne(Order.class);
        OrderItem persistedOrderItem = persistedOrder.getOrderItems().stream().findFirst().orElseThrow();

        assertThat(persistedOrderItem).isEqualTo(item);
        assertThat(persistedOrderItem.getProduct()).isEqualTo(product);
        assertThat(persistedOrderItem.getOrderItemName()).isEqualTo(product.getName());
        assertThat(persistedOrderItem.getDescription()).isEqualTo(product.getDescription());
    }

    @Test
    void test_update_product_details(){

        //----Arrange
        Product productToUpdate = doTransaction(em -> {
            DataCreatorForTesting.createAddresses();

            Product product = DataCreatorForTesting.createProduct(em, "orez", "pentru fiert", "src/image4", 12f, category1, seller1, UnitOfMeasure.KILOGRAM, 10);

            Buyer buyerMerged = em.merge(buyer1);
            Seller sellerMerged = em.merge(seller1);

            FullOrder fullOrder = DataCreatorForTesting.createFullOrder(em, buyerMerged.getAccount().getEmail(), address1, PaymentType.CASH);

            Order order = new Order(address1, buyerMerged, sellerMerged, buyerMerged.getAccount().getEmail(), buyerMerged.getAccount().getFirstName(), buyerMerged.getAccount().getLastName(), buyer1.getAccount().getTelephone(), fullOrder);

            order.addProduct(product, 2f);

            em.persist(order);

            return product;
        });

        //----Act
        doTransaction(em -> {
            Product productMerged = em.merge(productToUpdate);
            productMerged.updateProduct(productMerged.getName(), productMerged.getDescription(), productMerged.getImageName(), 50f, productMerged.getCategory(), productMerged.getSeller(), productMerged.getUnitOfMeasure(), productMerged.getQuantity());
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
            DataCreatorForTesting.createAddresses();

            Product product = DataCreatorForTesting.createProduct(em, "orez", "pentru fiert", "src/image4", 12f, category1, seller1, UnitOfMeasure.KILOGRAM,10);

            Buyer buyerMerged = em.merge(buyer1);
            Seller sellerMerged = em.merge(seller1);

            FullOrder fullOrder = DataCreatorForTesting.createFullOrder(em, buyerMerged.getAccount().getEmail(), address1, PaymentType.CASH);

            Order order = new Order(address1, buyerMerged, sellerMerged, buyerMerged.getAccount().getEmail(), buyerMerged.getAccount().getFirstName(), buyerMerged.getAccount().getLastName(), buyer1.getAccount().getTelephone(), fullOrder);

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
    void test_submit_order_if_order_not_pending(){

        //----Arrange
        Order addedOrder = doTransaction(em -> {

            DataCreatorForTesting.createAddresses();
            Product product = DataCreatorForTesting.createProduct(em, "orez", "pentru fiert", "src/image4", 12f, category1, seller1, UnitOfMeasure.KILOGRAM, 10);

            Buyer buyerMerged = em.merge(buyer1);
            Seller sellerMerged = em.merge(seller1);

            FullOrder fullOrder = DataCreatorForTesting.createFullOrder(em, buyerMerged.getAccount().getEmail(), address1, PaymentType.CASH);

            Order order = new Order(address1, buyerMerged, sellerMerged, buyerMerged.getAccount().getEmail(), buyerMerged.getAccount().getFirstName(), buyerMerged.getAccount().getLastName(), buyer1.getAccount().getTelephone(), fullOrder);
            order.addProduct(product, 2f);
            em.persist(order);

            return order;
        });

        //----Act
        Exception exception = doTransaction(em -> {

            Order orderMerged = em.merge(addedOrder);

            orderMerged.markedAsProcessing();
            orderMerged.markAsReadyToShip();

            return assertThrows(IllegalOrderState.class, orderMerged::markedAsProcessing);
        });

        //----Assert
        assertTrue(exception.getMessage().contains("order state can only be pending if you want to submit"));
    }

    @Test
    void test_submit_order_if_not_added_item(){

        //----Arrange
        Order addedOrder = doTransaction(em -> {

            DataCreatorForTesting.createAddresses();

            Buyer buyerMerged = em.merge(buyer1);
            Seller sellerMerged = em.merge(seller1);

            FullOrder fullOrder = DataCreatorForTesting.createFullOrder(em, buyerMerged.getAccount().getEmail(), address1, PaymentType.CASH);

            Order order = new Order(address1, buyerMerged, sellerMerged, buyerMerged.getAccount().getEmail(), buyerMerged.getAccount().getFirstName(), buyerMerged.getAccount().getLastName(), buyer1.getAccount().getTelephone(), fullOrder);

            em.persist(order);

            return order;
        });

        //----Act
        Exception exception = doTransaction(em -> {

            Order orderMerged = em.merge(addedOrder);

            return assertThrows(IllegalOrderState.class, orderMerged::markedAsProcessing);
        });

        //----Assert
        assertTrue(exception.getMessage().contains("order doesn't have any items, please add items to submit"));
    }

    @Test
    void test_check_submit_order(){

        //----Arrange
        Order addedOrder = doTransaction(em -> {

            DataCreatorForTesting.createAddresses();
            Product product = DataCreatorForTesting.createProduct(em, "orez", "pentru fiert", "src/image4", 12f, category1, seller1, UnitOfMeasure.KILOGRAM, 10);

            Buyer buyerMerged = em.merge(buyer1);
            Seller sellerMerged = em.merge(seller1);

            FullOrder fullOrder = DataCreatorForTesting.createFullOrder(em, buyerMerged.getAccount().getEmail(), address1, PaymentType.CASH);

            Order order = new Order(address1, buyerMerged, sellerMerged, buyerMerged.getAccount().getEmail(), buyerMerged.getAccount().getFirstName(), buyerMerged.getAccount().getLastName(), buyer1.getAccount().getTelephone(), fullOrder);
            order.addProduct(product, 2f);
            em.persist(order);

            return order;
        });

        //----Act
        doTransaction(em -> {
            Order orderMerged = em.merge(addedOrder);
            orderMerged.markedAsProcessing();
        });

        //----Assert
        Order persistedOrder = entityFinder.getTheOne(Order.class);

        assertThat(persistedOrder.getOrderStatus()).isEqualTo(OrderStatus.PROCESSING);
    }

    @Test
    void test_marked_delivered_if_order_not_processed(){

        //----Arrange
        Order addedOrder = doTransaction(em -> {

            DataCreatorForTesting.createAddresses();
            Product product = DataCreatorForTesting.createProduct(em, "orez", "pentru fiert", "src/image4", 12f, category1, seller1, UnitOfMeasure.KILOGRAM, 10);

            Buyer buyerMerged = em.merge(buyer1);
            Seller sellerMerged = em.merge(seller1);

            FullOrder fullOrder = DataCreatorForTesting.createFullOrder(em, buyerMerged.getAccount().getEmail(), address1, PaymentType.CASH);

            Order order = new Order(address1, buyerMerged, sellerMerged, buyerMerged.getAccount().getEmail(), buyerMerged.getAccount().getFirstName(), buyerMerged.getAccount().getLastName(), buyer1.getAccount().getTelephone(), fullOrder);
            order.addProduct(product, 2f);
            em.persist(order);

            return order;
        });

        //----Act
        Exception exception = doTransaction(em -> {

            Order orderMerged = em.merge(addedOrder);

            return assertThrows(IllegalOrderState.class, orderMerged::markedAsDelivered);
        });

        //----Assert
        assertTrue(exception.getMessage().contains("order state can only be shipped if you want to deliver"));
    }

    @Test
    void test_marked_delivered_if_order_not_shipped(){

        //----Arrange
        Order addedOrder = doTransaction(em -> {

            DataCreatorForTesting.createAddresses();
            Product product = DataCreatorForTesting.createProduct(em, "orez", "pentru fiert", "src/image4", 12f, category1, seller1, UnitOfMeasure.KILOGRAM, 10);

            Buyer buyerMerged = em.merge(buyer1);
            Seller sellerMerged = em.merge(seller1);

            FullOrder fullOrder = DataCreatorForTesting.createFullOrder(em, buyerMerged.getAccount().getEmail(), address1, PaymentType.CASH);

            Order order = new Order(address1, buyerMerged, sellerMerged, buyerMerged.getAccount().getEmail(), buyerMerged.getAccount().getFirstName(), buyerMerged.getAccount().getLastName(), buyer1.getAccount().getTelephone(), fullOrder);
            order.addProduct(product, 2f);
            em.persist(order);

            return order;
        });

        //----Act
        Exception exception = doTransaction(em -> {

            Order orderMerged = em.merge(addedOrder);
            orderMerged.markedAsProcessing();

            return assertThrows(IllegalOrderState.class, orderMerged::markedAsDelivered);
        });

        //----Assert
        assertTrue(exception.getMessage().contains("order state can only be shipped if you want to deliver"));
    }

    @Test
    void test_check_ready_to_process(){

        //----Arrange
        Order addedOrder = doTransaction(em -> {

            DataCreatorForTesting.createAddresses();
            Product product = DataCreatorForTesting.createProduct(em, "orez", "pentru fiert", "src/image4", 12f, category1, seller1, UnitOfMeasure.KILOGRAM, 10);

            Buyer buyerMerged = em.merge(buyer1);
            Seller sellerMerged = em.merge(seller1);

            FullOrder fullOrder = DataCreatorForTesting.createFullOrder(em, buyerMerged.getAccount().getEmail(), address1, PaymentType.CASH);
            Order order = new Order(address1, buyerMerged, sellerMerged, buyerMerged.getAccount().getEmail(), buyerMerged.getAccount().getFirstName(), buyerMerged.getAccount().getLastName(), buyer1.getAccount().getTelephone(), fullOrder);
            order.addProduct(product, 2f);
            em.persist(order);

            return order;
        });

        //----Act
        doTransaction(em -> {
            Order orderMerged = em.merge(addedOrder);
            orderMerged.markedAsProcessing();
            orderMerged.markAsReadyToShip();
        });

        //----Assert
        Order persistedOrder = entityFinder.getTheOne(Order.class);

        assertThat(persistedOrder.getOrderStatus()).isEqualTo(OrderStatus.READY_TO_SHIP);
    }

    @Test
    void test_add_order_item_if_order_processed(){

        //----Arrange
        Order addedOrder = doTransaction(em -> {
            DataCreatorForTesting.createAddresses();

            Buyer buyerMerged = em.merge(buyer1);
            Seller sellerMerged = em.merge(seller1);
            Category categoryMerged = em.merge(category1);

            FullOrder fullOrder = DataCreatorForTesting.createFullOrder(em, buyerMerged.getAccount().getEmail(), address1, PaymentType.CASH);

            Product product = DataCreatorForTesting.createProduct(em, "orez",
                    "pentru fiert", "src/image4", 12f, categoryMerged, sellerMerged, UnitOfMeasure.KILOGRAM, 10);

            Order order = new Order(address1, buyerMerged, sellerMerged, buyerMerged.getAccount().getEmail(), buyerMerged.getAccount().getFirstName(), buyerMerged.getAccount().getLastName(), buyer1.getAccount().getTelephone(), fullOrder);
            order.addProduct(product, 2f);
            em.persist(order);

            return order;
        });

        //----Act
        Exception exception = doTransaction(em -> {

            Order orderMerged = em.merge(addedOrder);
            orderMerged.markedAsProcessing();

            Seller sellerMerged = em.merge(seller1);
            Category categoryMerged = em.merge(category1);

            Product product = DataCreatorForTesting.createProduct(em, "grau", "pentru paine",
                    "src/image20", 8f, categoryMerged, sellerMerged, UnitOfMeasure.KILOGRAM, 10);

            return assertThrows(IllegalOrderState.class, () -> orderMerged.addProduct(product, 2f));
        });

        //----Assert
        assertTrue(exception.getMessage().contains("can't add item, order already processed"));
    }

    @Test
    void test_add_order_item_if_item_belongs_to_other_seller(){

        //----Arrange
        Order addedOrder = doTransaction(em -> {
            DataCreatorForTesting.createAddresses();

            Buyer buyerMerged = em.merge(buyer1);
            Seller sellerMerged = em.merge(seller1);
            Category categoryMerged = em.merge(category1);

            Product product = DataCreatorForTesting.createProduct(em, "orez",
                    "pentru fiert", "src/image4", 12f, categoryMerged, sellerMerged, UnitOfMeasure.KILOGRAM, 10);

            FullOrder fullOrder = DataCreatorForTesting.createFullOrder(em, buyerMerged.getAccount().getEmail(), address1, PaymentType.CASH);

            Order order = new Order(address1, buyerMerged, sellerMerged, buyerMerged.getAccount().getEmail(), buyerMerged.getAccount().getFirstName(), buyerMerged.getAccount().getLastName(), buyer1.getAccount().getTelephone(), fullOrder);
            order.addProduct(product, 2f);
            em.persist(order);

            return order;
        });

        //----Act
        Exception exception = doTransaction(em -> {

            Order orderMerged = em.merge(addedOrder);
            orderMerged.markedAsProcessing();

            Seller sellerMerged = em.merge(seller2);//added other seller and creates a new product
            Category categoryMerged = em.merge(category1);

            Product product = DataCreatorForTesting.createProduct(em, "grau", "pentru paine",
                    "src/image20", 8f, categoryMerged, sellerMerged, UnitOfMeasure.KILOGRAM, 10);

            return assertThrows(IllegalItemException.class, () -> orderMerged.addProduct(product, 2f));
        });

        //----Assert
        assertTrue(exception.getMessage().contains("can't add this item, it belongs to different seller"));
    }

    @Test
    void test_add_order_item_if_item_already_added(){

        //----Arrange
        Product addedProduct = doTransaction(em -> {
            DataCreatorForTesting.createAddresses();

            Buyer buyerMerged = em.merge(buyer1);
            Seller sellerMerged = em.merge(seller1);

            Product product = DataCreatorForTesting.createProduct(em, "orez", "pentru fiert", "src/image4", 12f, category1, sellerMerged, UnitOfMeasure.KILOGRAM, 10);

            FullOrder fullOrder = DataCreatorForTesting.createFullOrder(em, buyerMerged.getAccount().getEmail(), address1, PaymentType.CASH);

            Order order = new Order(address1, buyerMerged, sellerMerged, buyerMerged.getAccount().getEmail(), buyerMerged.getAccount().getFirstName(), buyerMerged.getAccount().getLastName(), buyer1.getAccount().getTelephone(), fullOrder);
            order.addProduct(product, 2f);
            em.persist(order);

            return product;
        });

        //----Act
        Exception exception = doTransaction(em -> {

            Order orderMerged = entityFinder.getTheOne(Order.class);

            return assertThrows(IllegalItemException.class, () -> orderMerged.addProduct(addedProduct, 1f));
        });

        //----Assert
        assertTrue(exception.getMessage().contains("can't add this item, already added"));
    }

    @Test
    void test_add_multiple_order_with_same_seller_same_buyer(){

        //----Arrange
        doTransaction(em -> {
            DataCreatorForTesting.createAddresses();
        });

        //----Act
        doTransaction(em -> {

            Buyer buyerMerged = em.merge(buyer1);
            Seller sellerMerged = em.merge(seller1);

            Product product = DataCreatorForTesting.createProduct(em, "orez", "pentru fiert", "src/image4", 12f, category1, sellerMerged, UnitOfMeasure.KILOGRAM, 10);

            FullOrder fullOrder = DataCreatorForTesting.createFullOrder(em, buyerMerged.getAccount().getEmail(), address1, PaymentType.CASH);

            Order order1 = new Order(address1, buyerMerged, sellerMerged, buyerMerged.getAccount().getEmail(), buyerMerged.getAccount().getFirstName(), buyerMerged.getAccount().getLastName(), buyer1.getAccount().getTelephone(), fullOrder);
            Order order2 = new Order(address1, buyerMerged, sellerMerged, buyerMerged.getAccount().getEmail(), buyerMerged.getAccount().getFirstName(), buyerMerged.getAccount().getLastName(), buyer1.getAccount().getTelephone(), fullOrder);
            order1.addProduct(product, 2f);
            order2.addProduct(product, 2f);
            em.persist(order1);
            em.persist(order2);

        });

        //----Assert
        List<Order> orders = entityFinder.findAll(Order.class);

        assertThat(orders.size()).isEqualTo(2);
    }

    @Test
    void search_by_status(){
        emb.createQuery("select o from Order o where o.orderStatus = :orderStatus", Order.class)
                .setParameter("orderStatus", OrderStatus.PROCESSING)
                .getResultList();
    }
}
