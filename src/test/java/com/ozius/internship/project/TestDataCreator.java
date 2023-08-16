package com.ozius.internship.project;

import com.ozius.internship.project.entity.*;
import com.ozius.internship.project.entity.buyer.Buyer;
import com.ozius.internship.project.entity.order.Order;
import com.ozius.internship.project.entity.seller.LegalDetails;
import com.ozius.internship.project.entity.seller.Review;
import com.ozius.internship.project.entity.seller.Seller;
import com.ozius.internship.project.entity.seller.SellerType;
import jakarta.persistence.EntityManager;

public class TestDataCreator {

    public static void createBaseDataForProduct(EntityManager em) {
        createCategoriesBaseData(em);
        createSellerBaseData(em);
        createProductsBaseData(em);
    }

    public static void createBaseDataForReview(EntityManager em) {
        createBaseDataForProduct(em);
        createBuyerBaseData(em);
    }

    public static Buyer createBuyer(EntityManager em, UserAccount account){
        Buyer buyer = new Buyer(account);
        em.persist(buyer);

        return buyer;
    }

    public static void createBuyerBaseData(EntityManager em){
        Buyers.buyer2 = createBuyer(em,
                new UserAccount(
                        "Cosmina",
                        "Maria",
                        "cosminamaria@gmail.com",
                        "ozius1223423345",
                        "/src/image2",
                        "0735897635"));

        Buyers.buyer1 = createBuyer(em,
                new UserAccount(
                        "Marcel",
                        "Danila",
                        "marceldanila@gmail.com",
                        "ozius42",
                        "/src/image90",
                        "0777777635"));

    }

    public static Seller createSeller(EntityManager em, Address address, UserAccount account, String alias, SellerType sellerType, LegalDetails legalDetails){
        Seller seller = new Seller(address, account, alias, sellerType, legalDetails);
        em.persist(seller);

        return seller;
    }

    public static void  createSellerBaseData(EntityManager em){
        Sellers.seller2 = createSeller(em,
                new Address("Romania",
                        "Timis",
                        "Timisoara",
                        "Strada Circumvalatiunii nr 4",
                        "Bloc 3 Scara B Ap 12",
                        "303413"),
                new UserAccount("Vlad",
                        "Ciobotariu",
                        "vladciobotariu@gmail.com",
                        "ozius12345",
                        "/src/image1",
                        "0734896512"),
                "Mega Fresh SRL",
                SellerType.LOCAL_FARMER,
                null);

        Sellers.seller1 = createSeller(em,
                new Address("Spania",
                        "Granada",
                        "Barcelona",
                        "Strada Real Madrid nr 4",
                        "Bloc Cupa Romaniei",
                        "307773"),
                new UserAccount("Mihnea",
                        "Mondialu",
                        "mihneamondialu@gmail.com",
                        "ozius54",
                        "/src/image99",
                        "0734896777"),
                "FC BARCELONA",
                SellerType.LOCAL_FARMER,
                null);

    }

    private static Category createCategory(EntityManager em, String name, String image) {
        Category category = new Category(name, image);
        em.persist(category);
        return category;
    }

    public static void createCategoriesBaseData(EntityManager em){

        Categories.category2 = createCategory(em, "Cereale", "image09");
        Categories.category1 = createCategory(em, "Fructe", "image0008");
    }

    public static Product createProduct(EntityManager em, String name, String description, String image, float price, Category category , Seller seller){

        Product product = new Product(name, description, image, price, category, seller);
        em.persist(product);

        return product;
    }

    public static void createProductsBaseData(EntityManager em){

        Products.product3 = createProduct(em, "orez", "pentru fiert", "src/image4", 12.7f, Categories.category1, Sellers.seller1);
        Products.product2 = createProduct(em, "grau", "pentru paine", "src/image20", 8.2f, Categories.category1, Sellers.seller1);
        Products.product1 = createProduct(em, "mar", "pentru glucoza", "src/image77", 5f, Categories.category2, Sellers.seller2);

    }



    public static void createAddresses(){
        Addresses.address1 = new Address("Romania", "Timis", "Timisoara", "Strada Macilor 10", "Bloc 4, Scara F, ap 50", "300091");
    }

    public static void createOrder(EntityManager em, Address address, Buyer buyer, Seller seller){

        Order order = new Order(
                address,
                buyer,
                seller,
                buyer.getAccount().getTelephone());

        em.persist(order);
    }


    public static Review createReview(Buyer buyer, String description, float rating, Product product){

        Seller seller = product.getSeller();

        return seller.addReview(buyer, description, rating, product);
    }

    public static class Buyers{
        public static Buyer buyer1;
        public static Buyer buyer2;
    }

    public static class Sellers{
        public static Seller seller1;
        public static Seller seller2;
    }

    public static class Products{
        public static Product product1;
        public static Product product2;
        public static Product product3;
    }

    public static class Categories{
        public static Category category1;
        public static Category category2;
    }

    public static class Addresses{
        public static Address address1;
    }

}