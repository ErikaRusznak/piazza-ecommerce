package com.ozius.internship.project;

import com.ozius.internship.project.entity.*;
import com.ozius.internship.project.entity.buyer.Buyer;
import com.ozius.internship.project.entity.cart.Cart;
import com.ozius.internship.project.entity.order.Order;
import com.ozius.internship.project.entity.product.Product;
import com.ozius.internship.project.entity.product.UnitOfMeasure;
import com.ozius.internship.project.entity.seller.*;
import jakarta.persistence.EntityManager;
import jakarta.servlet.Registration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;

import static com.ozius.internship.project.TestDataCreator.Products.product1;

public class TestDataCreator {

    public static void createBaseDataForProduct(EntityManager em, PasswordEncoder passwordEncoder) {
        createCategoriesBaseData(em);
        createSellerBaseData(em, passwordEncoder);
        createProductsBaseData(em);
    }

    public static void createBaseDataForReview(EntityManager em, PasswordEncoder passwordEncoder) {
        createBaseDataForProduct(em, passwordEncoder);
        createBuyerBaseData(em, passwordEncoder);
    }

    public static Buyer createBuyer(EntityManager em, UserAccount account){
        Buyer buyer = new Buyer(account);
        em.persist(buyer);

        return buyer;
    }

    public static void createBuyerBaseData(EntityManager em, PasswordEncoder passwordEncoder){

        UserAccount account1 = new UserAccount(
                "Erika",
                "Rusznak",
                "erikarusznak@gmail.com",
                "none",
                "0747871208",
                UserStatus.CLIENT);
        account1.setInitialPassword(passwordEncoder.encode("Ozius1234!"));
        Buyers.buyer1 = createBuyer(em, account1);

        UserAccount account2 = new UserAccount(
                "Alex",
                "Dulfu",
                "alexdulfu@gmail.com",
                "none",
                "0758418097",
                UserStatus.CLIENT);
        account2.setInitialPassword(passwordEncoder.encode("Ozius1234!"));
        Buyers.buyer2 = createBuyer(em, account2);

        UserAccount account3 = new UserAccount(
                "Giulia",
                "Lucaciu",
                "giulialucaciu@gmail.com",
                "none",
                "0796854752",
                UserStatus.CLIENT);
        account3.setInitialPassword(passwordEncoder.encode("Ozius1234!"));
        Buyers.buyer3 = createBuyer(em, account3);

    }

    public static void createBuyerAddressBaseData(EntityManager em){
        Buyer mergedBuyer = em.merge(Buyers.buyer1);
        Address address1 = new Address("Romania", "Maramures", "Baia Mare", "Strada Vasile Lucaciu", "nr 6/8", "300091");
        mergedBuyer.addAddress(address1, "Erika", "Rusznak", "+40747871208");

        Address address2 = new Address("Romania", "Timis", "Timisoara", "Aleea Minis", "Sc 2B", "300999");
        mergedBuyer.addAddress(address2, "Erika", "Rusznak", "+40747871208");


        Buyer mergedBuyer2 = em.merge(Buyers.buyer2);
        Address address3 = new Address("Romania", "Maramures", "Baia Mare", "Strada Ferastraului", "nr 58", "300091");
        mergedBuyer2.addAddress(address3, "Alex", "Dulfu", "+40758418097");

        Buyer mergedBuyer3 = em.merge(Buyers.buyer3);
        Address address4 = new Address("Romania", "Bucuresti", "Bucuresti", "Strada Luceafarului", "nr 4", "300012");
        mergedBuyer3.addAddress(address4, "Giulia", "Lucaciu", "+40796854752");
    }

    public static Seller createSellerFarmer(EntityManager em, Address address, UserAccount account, String alias){
        Seller seller = new Seller(address, account, alias, SellerType.LOCAL_FARMER);
        em.persist(seller);

        return seller;
    }

    public static Seller createSellerCompany(EntityManager em, Address address, UserAccount account, String alias, SellerType sellerType, LegalDetails legalDetails){
        Seller seller = new Seller(address, account, alias, sellerType, legalDetails);
        em.persist(seller);

        return seller;
    }

    public static void createSellerBaseData(EntityManager em, PasswordEncoder passwordEncoder){

        UserAccount account1 = new UserAccount("Alex",
                "Dulfu",
                "alex.dulfu@gmail.com",
                "/images/magazine.jpg",
                "0734896512",
                UserStatus.ADMIN);
        account1.setInitialPassword(passwordEncoder.encode("Ozius1234!"));
        Sellers.seller1 = createSellerFarmer(em,
                new Address("Romania",
                        "Timis",
                        "Timisoara",
                        "Strada Circumvalatiunii nr 4",
                        "Bloc 3 Scara B Ap 12",
                        "303413"),
                account1,
                "Mega Fresh"
        );

        UserAccount account2 = new UserAccount("Stefan",
                "Rusznak",
                "rusznak65@gmail.com",
                "/images/magazine.jpg",
                "0734896777",
                UserStatus.ADMIN);
        account2.setInitialPassword(passwordEncoder.encode("Ozius1234!"));
        Sellers.seller2 = createSellerFarmer(em,
                new Address("Romania",
                        "Maramures",
                        "Baia Mare",
                        "Str Tauti",
                        "nr 2",
                        "307773"),
                account2,
                "Eco Tech"
        );

        UserAccount account3 = new UserAccount("Ozius",
                "Solutions",
                "ozius123@gmail.com",
                "/images/magazine.jpg",
                "0734896777",
                UserStatus.ADMIN);
        account3.setInitialPassword(passwordEncoder.encode("Ozius1234!"));
        Sellers.seller3 = createSellerCompany(em,
                new Address("Romania",
                        "Maramures",
                        "Baia Mare",
                        "Strada V Lucaciu",
                        "nr 2",
                        "300125"),
                account3,
                "Ozius Solutions",
                SellerType.COMPANY,
                new LegalDetails("Mega Fresh SRL", "10234567",
                    new RegistrationNumber(CompanyType.J, 12, 254, LocalDate.now())));

    }

    public static Category createCategory(EntityManager em, String name, String image) {
        Category category = new Category(name, image);
        em.persist(category);
        return category;
    }

    public static void createCategoriesBaseData(EntityManager em){

        Categories.category1 = createCategory(em, "Fruits", "/images/fruits.svg");
        Categories.category2 = createCategory(em, "Vegetables", "/images/vegetables.svg");
        Categories.category3 = createCategory(em, "Dairy", "/images/dairy.svg");
        Categories.category4 = createCategory(em, "Nuts", "/images/nuts.svg");
        Categories.category5 = createCategory(em, "Honey", "/images/honey.svg");
        Categories.category6 = createCategory(em, "Sweets", "/images/sweets.svg");
        Categories.category7 = createCategory(em, "Oil", "/images/oil.svg");
        Categories.category8 = createCategory(em, "Tea", "/images/tea.svg");
    }

    public static Product createProduct(EntityManager em, String name, String description, String image, float price, Category category , Seller seller, UnitOfMeasure unitOfMeasure){

        Product product = new Product(name, description, image, price, category, seller, unitOfMeasure);
        em.persist(product);

        return product;
    }

    public static void createProductsBaseData(EntityManager em){

        Products.product1 = createProduct(em, "Apple", "This is an apple! It is a fruit!", "/images/apple.jpg", 12.7f, Categories.category1, Sellers.seller1, UnitOfMeasure.KILOGRAM);
        Products.product2 = createProduct(em, "Pear", "This is a pear! It is a fruit!", "/images/pear.jpg", 8.2f, Categories.category1, Sellers.seller2, UnitOfMeasure.KILOGRAM);
        Products.product3 = createProduct(em, "Cherry", "This are cherries! They are a fruit!", "/images/cherry.jpg", 5f, Categories.category1, Sellers.seller1, UnitOfMeasure.ONE_UNIT);
        Products.product4 = createProduct(em, "Banana", "This is a banana! It is a fruit!", "/images/banana.jpeg", 5f, Categories.category1, Sellers.seller1, UnitOfMeasure.GRAM);
        Products.product5 = createProduct(em, "Mango", "This is a mango! It is a fruit!", "/images/mango.jpg", 5f, Categories.category1, Sellers.seller1, UnitOfMeasure.KILOGRAM);
        Products.product6 = createProduct(em, "Peach", "This is a peach! It is a fruit!", "/images/peach.jpg", 5f, Categories.category1, Sellers.seller1, UnitOfMeasure.KILOGRAM);
        Products.product7 = createProduct(em, "Orange", "This is an orange! It is a fruit!", "/images/orange.jpg", 5f, Categories.category1, Sellers.seller1, UnitOfMeasure.KILOGRAM);
        Products.product8 = createProduct(em, "Potato", "This is a potato! It is a vegetable!", "/images/potato.jpeg", 5f, Categories.category2, Sellers.seller1, UnitOfMeasure.KILOGRAM);
        Products.product9 = createProduct(em, "Pepper", "This is a pepper! It is a vegetable!", "/images/pepper.jpg", 5f, Categories.category2, Sellers.seller1, UnitOfMeasure.KILOGRAM);
    }

    public static void createAddresses(){
        Addresses.address1 = new Address("Romania", "Timis", "Timisoara", "Strada Macilor 10", "Bloc 4, Scara F, ap 50", "300091");
    }

    public static void createOrder(EntityManager em, Address address, Buyer buyer, Seller seller){

        Order order = new Order(
                address,
                buyer,
                seller,
                buyer.getAccount().getEmail(),
                buyer.getAccount().getFirstName(),
                buyer.getAccount().getLastName(),
                buyer.getAccount().getTelephone());

        em.persist(order);
    }


    public static Review createReview(EntityManager em, Buyer buyer, String description, float rating, Product product){

        Seller seller = product.getSeller();
        return seller.addReview(buyer, description, rating, product);
    }

    private static Cart createCart(EntityManager em, Buyer buyer){
        Cart cart = new Cart(buyer);
        em.persist(cart);

        return cart;
    }

    private static void addItemToCart(EntityManager em, Cart cart, Product product, float quantity){
        Cart cartMerged = em.merge(cart);
        cartMerged.addOrUpdateItem(product, quantity);
    }

    public static void createCartBaseData(EntityManager em){
        Cart cart1 = createCart(em, Buyers.buyer1);
        addItemToCart(em, cart1, product1, 2F);
        addItemToCart(em, cart1, Products.product2, 5F);

        Cart cart2 = createCart(em, Buyers.buyer2);
        addItemToCart(em, cart2, product1, 2F);

    }

    public static void createFavoritesBaseData(EntityManager em){
        Buyer buyer = em.merge(Buyers.buyer1);
        buyer.addFavorite(product1);
        buyer.addFavorite(Products.product2);
    }

    public static void createReviewsBaseData(EntityManager em) {
        Reviews.review1 = createReview(em, Buyers.buyer2, "Acest produs este delicios! Il recomand", 5F, Products.product1);
        Reviews.review2 = createReview(em, Buyers.buyer3, "Au existat bucati care erau batatorite", 3F, Products.product1);
        Reviews.review3 = createReview(em, Buyers.buyer1, "Mi-ar fi placut sa fie mai dulci, dar in rest sunt bune", 4F, Products.product1);
        Reviews.review4 = createReview(em, Buyers.buyer2, "review for product 2 from buyer 2", 4F, Products.product2);
        Reviews.review5 = createReview(em, Buyers.buyer3, "review for product 2 from buyer 3", 2F, Products.product2);
    }

    public static class Buyers{
        public static Buyer buyer1;
        public static Buyer buyer2;
        public static Buyer buyer3;
    }

    public static class Sellers{
        public static Seller seller1;
        public static Seller seller2;
        public static Seller seller3;
    }

    public static class Products{
        public static Product product1;
        public static Product product2;
        public static Product product3;
        public static Product product4;
        public static Product product5;
        public static Product product6;
        public static Product product7;
        public static Product product8;
        public static Product product9;
    }

    public static class Categories{
        public static Category category1;
        public static Category category2;
        public static Category category3;
        public static Category category4;
        public static Category category5;
        public static Category category6;
        public static Category category7;
        public static Category category8;
    }

    public static class Addresses{
        public static Address address1;
    }

    public static class Reviews {
        public static Review review1;
        public static Review review2;
        public static Review review3;
        public static Review review4;
        public static Review review5;
    }

}