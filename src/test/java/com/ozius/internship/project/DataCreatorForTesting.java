package com.ozius.internship.project;

import com.ozius.internship.project.entity.buyer.Buyer;
import com.ozius.internship.project.entity.cart.Cart;
import com.ozius.internship.project.entity.courier.Courier;
import com.ozius.internship.project.entity.product.Category;
import com.ozius.internship.project.entity.product.Product;
import com.ozius.internship.project.entity.product.UnitOfMeasure;
import com.ozius.internship.project.entity.review.Review;
import com.ozius.internship.project.entity.seller.*;
import com.ozius.internship.project.entity.user.*;
import jakarta.persistence.EntityManager;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;

import static com.ozius.internship.project.DataCreatorForTesting.Products.product1;


public class DataCreatorForTesting {

    public static void createBaseDataForProduct(EntityManager em, PasswordEncoder passwordEncoder) {
        createCategoriesBaseData(em);
        createSellerBaseData(em, passwordEncoder);
        createProductsBaseData(em);
    }

    public static Buyer createBuyer(EntityManager em, UserAccount account){
        Buyer buyer = new Buyer(account);
        em.persist(buyer);

        return buyer;
    }

    public static Courier createCourier(EntityManager em, UserAccount account) {
        Courier courier = new Courier(account);
        em.persist(courier);

        return courier;
    }

    public static void createBuyerBaseData(EntityManager em, PasswordEncoder passwordEncoder){

        UserAccount account1 = new UserAccount(
                "Erika",
                "Rusznak",
                "erikarusznak@gmail.com",
                "/images/burger.jpg",
                "0747871208",
                UserRole.CLIENT);
        account1.setInitialPassword(passwordEncoder.encode("Ozius1234!"));
        Buyers.buyer1 = createBuyer(em, account1);

        UserAccount account2 = new UserAccount(
                "Andrei",
                "Dulfu",
                "alexdulfu@gmail.com",
                null,
                "0758418097",
                UserRole.CLIENT);
        account2.setInitialPassword(passwordEncoder.encode("Ozius1234!"));
        Buyers.buyer2 = createBuyer(em, account2);

        UserAccount account3 = new UserAccount(
                "Giulia",
                "Lucaciu",
                "giulialucaciu@gmail.com",
                null,
                "0796854752",
                UserRole.CLIENT);
        account3.setInitialPassword(passwordEncoder.encode("Ozius1234!"));
        Buyers.buyer3 = createBuyer(em, account3);

//        UserAccount account4 = new UserAccount(
//                "Erika",
//                "Rusznak",
//                "erika.rusznak@student.upt.ro",
//               null,
//                "0747871208",
//                UserRole.CLIENT);
//        account1.setInitialPassword(passwordEncoder.encode("Ozius1234!"));
//        Buyers.buyer4 = createBuyer(em, account4);

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

    public static void createCourierBaseData(EntityManager em, PasswordEncoder passwordEncoder){

        UserAccount account1 = new UserAccount(
                "Andrei",
                "Pop",
                "andreipop@gmail.com",
                null,
                "0787523948",
                UserRole.COURIER);
        account1.setInitialPassword(passwordEncoder.encode("Ozius1234!"));
        Couriers.courier1 = createCourier(em, account1);

        UserAccount account2 = new UserAccount(
                "Monica",
                "Rusznak",
                "monicarusznak@gmail.com",
                null,
                "0758418047",
                UserRole.COURIER);
        account2.setInitialPassword(passwordEncoder.encode("Ozius1234!"));
        Couriers.courier2 = createCourier(em, account2);

//        UserAccount account3 = new UserAccount(
//                "Mihai",
//                "Rusu",
//                "mihairusu@gmail.com",
//                null,
//                "0796859752",
//                UserRole.COURIER);
//        account3.setInitialPassword(passwordEncoder.encode("Ozius1234!"));
//        Couriers.courier3 = createCourier(em, account3);
//
//        UserAccount account4 = new UserAccount(
//                "Vlad",
//                "Popesescu",
//                "vladpopescu@gmail.com",
//                null,
//                "0736859752",
//                UserRole.COURIER);
//        account4.setInitialPassword(passwordEncoder.encode("Ozius1234!"));
//        Couriers.courier4 = createCourier(em, account4);
//
//        UserAccount account5 = new UserAccount(
//                "Stefania",
//                "Osan",
//                "stefiosan@gmail.com",
//                null,
//                "0776859752",
//                UserRole.COURIER);
//        account5.setInitialPassword(passwordEncoder.encode("Ozius1234!"));
//        Couriers.courier5 = createCourier(em, account5);

    }

    public static Seller createSellerFarmer(EntityManager em, Address address, UserAccount account, String alias){
        Seller seller = new Seller(alias, SellerType.LOCAL_FARMER, account, address);
        em.persist(seller);

        return seller;
    }

    public static Seller createSellerCompany(EntityManager em, Address address, UserAccount account, String alias, SellerType sellerType, LegalDetails legalDetails){
        Seller seller = new Seller(alias, sellerType, account, address, legalDetails);
        em.persist(seller);

        return seller;
    }


    public static void createSellerRequestForLocalFarmer(EntityManager em, String reason, String sellerEmail, SellerType sellerType) {
        SellerRequest sellerRequest = new SellerRequest(reason, sellerEmail, sellerType);
        sellerRequest.setStatus(RequestStatus.APPROVED);
        em.persist(sellerRequest);
    }

    public static void createSellerRequestForCompanyOrPfa(EntityManager em, String reason, String sellerEmail, String sellerCui, SellerType sellerType) {
        SellerRequest sellerRequest = new SellerRequest(reason, sellerEmail, sellerCui, sellerType);
        sellerRequest.setStatus(RequestStatus.APPROVED);
        em.persist(sellerRequest);
    }

    public static void createSellerBaseData(EntityManager em, PasswordEncoder passwordEncoder){

        UserAccount account1 = new UserAccount("Alex",
                "Dulfu",
                "alex.dulfu@gmail.com",
                "/images/magazine.jpg",
                "0734896512",
                UserRole.SELLER);
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
        createSellerRequestForLocalFarmer(em, "Reason", account1.getEmail(), SellerType.LOCAL_FARMER);

        UserAccount account2 = new UserAccount("Stefan",
                "Rusznak",
                "rusznak65@gmail.com",
                "/images/magazine.jpg",
                "0734896777",
                UserRole.SELLER);
        account2.setInitialPassword(passwordEncoder.encode("Ozius1234!"));
        Sellers.seller2 = createSellerFarmer(em,
                new Address("Romania",
                        "Maramures",
                        "Baia Mare",
                        "Str Tauti",
                        "nr 2",
                        "307773"),
                account2,
                "Bio Fruits"
        );
        createSellerRequestForLocalFarmer(em, "Reason", account2.getEmail(), SellerType.LOCAL_FARMER);

        UserAccount account3 = new UserAccount("Ozius",
                "Solutions",
                "ozius123@gmail.com",
                "/images/magazine.jpg",
                "0734896777",
                UserRole.SELLER);
        account3.setInitialPassword(passwordEncoder.encode("Ozius1234!"));
        Sellers.seller3 = createSellerCompany(em,
                new Address("Romania",
                        "Maramures",
                        "Baia Mare",
                        "Strada V Lucaciu",
                        "nr 2",
                        "300125"),
                account3,
                "Farmer Shop",
                SellerType.COMPANY,
                new LegalDetails("Mega Fresh SRL", "1023456",
                        new RegistrationNumber(CompanyType.J, 12, 254, LocalDate.now())));
        createSellerRequestForCompanyOrPfa(em, "Reason", account3.getEmail(), "1023456", SellerType.COMPANY);
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

    public static Product createProduct(EntityManager em, String name, String description, String image, float price, Category category , Seller seller, UnitOfMeasure unitOfMeasure, float quantity){

        Product product = new Product(name, description, image, price, category, seller, unitOfMeasure, quantity);
        em.persist(product);

        return product;
    }

    public static void createProductsBaseData(EntityManager em){

        product1 = createProduct(em, "Apple", "This is an apple! It is a fruit!", "/images/apple.jpg", 3f, Categories.category1, Sellers.seller1, UnitOfMeasure.KILOGRAM, 20);
        Products.product2 = createProduct(em, "Pear", "This is a pear! It is a fruit!", "/images/pear.jpg", 4.5f, Categories.category1, Sellers.seller2, UnitOfMeasure.KILOGRAM,5);
        Products.product3 = createProduct(em, "Cherry", "This are cherries! They are a fruit!", "/images/cherry.jpg", 3f, Categories.category1, Sellers.seller1, UnitOfMeasure.GRAM, 3);
        Products.product4 = createProduct(em, "Banana", "This is a banana! It is a fruit!", "/images/banana.jpeg", 2f, Categories.category1, Sellers.seller3, UnitOfMeasure.ONE_UNIT, 10);
        Products.product5 = createProduct(em, "Mango", "This is a mango! It is a fruit!", "/images/mango.jpg", 6f, Categories.category1, Sellers.seller1, UnitOfMeasure.KILOGRAM, 10);
        Products.product6 = createProduct(em, "Peach", "This is a peach! It is a fruit!", "/images/peach.jpg", 4f, Categories.category1, Sellers.seller1, UnitOfMeasure.KILOGRAM, 11);
        Products.product7 = createProduct(em, "Orange", "This is an orange! It is a fruit!", "/images/orange.jpg", 5f, Categories.category1, Sellers.seller1, UnitOfMeasure.KILOGRAM, 20);
        Products.product8 = createProduct(em, "Potato", "This is a potato! It is a vegetable!", "/images/potato.jpeg", 3f, Categories.category2, Sellers.seller1, UnitOfMeasure.KILOGRAM, 20);
        Products.product9 = createProduct(em, "Pepper", "This is a pepper! It is a vegetable!", "/images/pepper.jpg", 4.8f, Categories.category2, Sellers.seller1, UnitOfMeasure.KILOGRAM, 15);
    }

    public static void createAddresses(){
        Addresses.address1 = new Address("Romania", "Timis", "Timisoara", "Strada Macilor 10", "Bloc 4, Scara F, ap 50", "300091");
    }

    public static Review createReview(Buyer buyer, String description, float rating, Product product){

        return product.addReview(buyer, description, rating);
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

        createCart(em, Buyers.buyer3);

    }

    public static void createFavoritesBaseData(EntityManager em){
        Buyer buyer = em.merge(Buyers.buyer1);
        buyer.addFavorite(product1);
        buyer.addFavorite(Products.product2);
    }

    public static void createReviewsBaseData() {
        Reviews.review1 = createReview(Buyers.buyer2, "Acest produs este delicios! Il recomand", 5F, product1);
        Reviews.review2 = createReview(Buyers.buyer3, "Au existat bucati care erau batatorite", 3F, product1);
        Reviews.review3 = createReview(Buyers.buyer1, "Mi-ar fi placut sa fie mai dulci, dar in rest sunt bune", 4F, product1);
        Reviews.review4 = createReview(Buyers.buyer2, "review for product 2 from buyer 2", 4F, Products.product2);
        Reviews.review5 = createReview(Buyers.buyer3, "review for product 2 from buyer 3", 2F, Products.product2);
    }

    public static class Buyers{
        public static Buyer buyer1;
        public static Buyer buyer2;
        public static Buyer buyer3;
        public static Buyer buyer4;
    }

    public static class Couriers {
        public static Courier courier1;
        public static Courier courier2;
        public static Courier courier3;
        public static Courier courier4;
        public static Courier courier5;
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