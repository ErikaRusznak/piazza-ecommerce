package com.ozius.internship.project.entity.seller;

import com.ozius.internship.project.TestDataCreator;
import com.ozius.internship.project.entity.*;
import com.ozius.internship.project.entity.exeption.IllegalSellerDetails;
import com.ozius.internship.project.entity.order.Order;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.Test;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;

import java.time.LocalDate;
import java.util.List;

import static com.ozius.internship.project.TestDataCreator.Addresses.address1;
import static com.ozius.internship.project.TestDataCreator.Buyers.buyer1;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;


public class SellerEntityTests extends EntityBaseTest {

    private JpaRepository<Seller, Long> sellerRepository;

    @Override
    public void createTestData(EntityManager em) {
        this.sellerRepository = new SimpleJpaRepository<>(Seller.class, emb);
    }

    @Test
    void test_add_seller(){

        //----Act
        Seller addedSeller = doTransaction(em -> {
            Address address = new Address(
                    "Romania",
                    "Timis",
                    "Timisoara",
                    "Strada Circumvalatiunii nr 4",
                    "Bloc 3 Scara B Ap 12",
                    "303413");

            Seller seller = new Seller(
                    address,
                    new UserAccount(
                            "Vlad",
                            "Ciobotariu",
                            "vladciobotariu@gmail.com",
                            "ozius12345",
                            "/src/image1",
                            "0734896512"
                    ),
                    "Mega Fresh SRL",
                    SellerType.LOCAL_FARMER,
                    null
            );
            em.persist(seller);

            return seller;
        });

        //----Assert
        Seller persistedSeller = entityFinder.getTheOne(Seller.class);

        assertThat(persistedSeller.getAccount().getFirstName()).isEqualTo("Vlad");
        assertThat(persistedSeller.getAccount().getLastName()).isEqualTo("Ciobotariu");
        assertThat(persistedSeller.getAccount().getEmail()).isEqualTo("vladciobotariu@gmail.com");
        assertThat(persistedSeller.getAccount().getPasswordHash()).isEqualTo("ozius12345");
        assertThat(persistedSeller.getAccount().getImageName()).isEqualTo("/src/image1");
        assertThat(persistedSeller.getAccount().getTelephone()).isEqualTo("0734896512");
        assertThat(persistedSeller.getAlias()).isEqualTo("Mega Fresh SRL");
        assertThat(persistedSeller.getLegalAddress().getCountry()).isEqualTo("Romania");
        assertThat(persistedSeller.getLegalAddress().getState()).isEqualTo("Timis");
        assertThat(persistedSeller.getLegalAddress().getCity()).isEqualTo("Timisoara");
        assertThat(persistedSeller.getLegalAddress().getAddressLine1()).isEqualTo("Strada Circumvalatiunii nr 4");
        assertThat(persistedSeller.getLegalAddress().getAddressLine2()).isEqualTo("Bloc 3 Scara B Ap 12");
        assertThat(persistedSeller.getLegalAddress().getZipCode()).isEqualTo("303413");
        assertThat(persistedSeller.getSellerType()).isEqualTo(SellerType.LOCAL_FARMER);
        assertThat(persistedSeller.getLegalDetails()).isNull();

        assertThat(persistedSeller).isEqualTo(addedSeller);
        assertThat(persistedSeller.getReviews()).isEmpty();
        assertThat(persistedSeller.calculateRating()).isEqualTo(0);
    }

    @Test
    void test_update_seller(){

        //----Arrange
        Seller seller = doTransaction(em -> {

            Address address = new Address("Romania", "Timis", "Timisoara", "Strada Circumvalatiunii nr 4", "Bloc 3 Scara B Ap 12", "303413");
            UserAccount userAccount = new UserAccount("Vlad", "Ciobotariu", "vladciobotariu@gmail.com", "ozius12345", "/src/image1", "0734896512");

            return TestDataCreator.createSeller(em, address, userAccount, "honey srl", SellerType.LOCAL_FARMER, null);
        });

        //----Act
        doTransaction(em -> {
            Seller mergedSeller = em.merge(seller);
            UserAccount account = mergedSeller.getAccount();
            LegalDetails legalDetails = mergedSeller.getLegalDetails();
            Address legalAddress = mergedSeller.getLegalAddress();

            mergedSeller.updateSeller(
                    "Vlad Cristian",
                    account.getLastName(),
                    account.getEmail(),
                    account.getPasswordHash(),
                    account.getImageName(),
                    account.getTelephone(),
                    legalDetails.getName(),
                    legalDetails.getCui(),
                    legalDetails.getCaen(),
                    legalDetails.getDateOfEstablishment(),
                    legalAddress);
        });

        //----Assert
        Seller persistedSeller = entityFinder.getTheOne(Seller.class);
        assertThat(persistedSeller.getAccount().getFirstName()).isEqualTo("Vlad Cristian");

        assertThat(persistedSeller.getAccount().getLastName()).isEqualTo("Ciobotariu");
        assertThat(persistedSeller.getAccount().getEmail()).isEqualTo("vladciobotariu@gmail.com");
        assertThat(persistedSeller.getAccount().getPasswordHash()).isEqualTo("ozius12345");
        assertThat(persistedSeller.getAccount().getImageName()).isEqualTo("/src/image1");
        assertThat(persistedSeller.getAccount().getTelephone()).isEqualTo("0734896512");
        assertThat(persistedSeller.getAlias()).isEqualTo("honey srl");
        assertThat(persistedSeller.getLegalAddress().getCountry()).isEqualTo("Romania");
        assertThat(persistedSeller.getLegalAddress().getState()).isEqualTo("Timis");
        assertThat(persistedSeller.getLegalAddress().getCity()).isEqualTo("Timisoara");
        assertThat(persistedSeller.getLegalAddress().getAddressLine1()).isEqualTo("Strada Circumvalatiunii nr 4");
        assertThat(persistedSeller.getLegalAddress().getAddressLine2()).isEqualTo("Bloc 3 Scara B Ap 12");
        assertThat(persistedSeller.getLegalAddress().getZipCode()).isEqualTo("303413");

        assertThat(persistedSeller.getLegalDetails()).isNull();
    }

    @Test
    void test_remove_seller(){

        //----Arrange
        Seller sellerToAdd = doTransaction(em -> {
            Address addressSeller = new Address("Romania", "Timis", "Timisoara", "Strada Circumvalatiunii nr 4", "Bloc 3 Scara B Ap 12", "303413");
            UserAccount userAccount = new UserAccount("Vlad", "Ciobotariu", "vladciobotariu@gmail.com", "ozius12345", "/src/image1", "0734896512");

            Seller seller = TestDataCreator.createSeller(em, addressSeller, userAccount, "bio", SellerType.LOCAL_FARMER, null);

            TestDataCreator.createBuyerBaseData(em);
            Address addressBuyer = new Address("Romania", "Timis", "Timisoara", "Strada Macilor 10", "Bloc 4, Scara F, ap 50", "300091");

            TestDataCreator.createOrder(em,addressBuyer, buyer1, seller);

            return seller;
        });


        //----Act
        Seller removedSeller = doTransaction(em -> {

            Seller mergedSeller = em.merge(sellerToAdd);
            em.remove(mergedSeller);

            return mergedSeller;
        });

        //----Assert
        List<Product> persistedProducts = entityFinder.getProductsBySeller(removedSeller);
        Order persistedOrder = entityFinder.getTheOne(Order.class);

        assertThat(sellerRepository.findAll().contains(removedSeller)).isFalse();
        assertThat(persistedProducts).isEmpty();

        assertThat(persistedOrder).isNotNull();
        assertThat(persistedOrder.getSeller()).isNull();

        //TODO check reviews deleted? it has cascade.all and also is it necessary to check products deleted? it also has cascade.all
    }

    @Test
    void test_add_seller_pfa_with_legal_details_null(){

        //----Arrange
        doTransaction(em -> {
            TestDataCreator.createAddresses();
        });

        //----Act
        Exception exception = doTransaction(em -> {
            UserAccount account =  new UserAccount("Vlad", "Ciobotariu", "vladciobotariu@gmail.com", "ozius12345", "/src/image1", "0734896512");
            return assertThrows(IllegalSellerDetails.class, ()->{
                Seller seller = new Seller(address1, account, "Mega Fresh SRL", SellerType.PFA, null);
                em.persist(seller);
            });
        });

        //----Assert
        assertTrue(exception.getMessage().contains("legalDetails can't be null if company or pfa"));

    }

    @Test
    void test_add_seller_company_with_legal_details_null(){

        //----Arrange
        doTransaction(em -> {
            TestDataCreator.createAddresses();
        });

        //----Act
        Exception exception = doTransaction(em -> {
            UserAccount account =  new UserAccount("Vlad", "Ciobotariu", "vladciobotariu@gmail.com", "ozius12345", "/src/image1", "0734896512");
            return assertThrows(IllegalSellerDetails.class, ()->{
                Seller seller = new Seller(address1, account, "Mega Fresh SRL", SellerType.COMPANY, null);
                em.persist(seller);
            });
        });

        //----Assert
        assertTrue(exception.getMessage().contains("legalDetails can't be null if company or pfa"));

    }

    @Test
    void test_add_seller_legal_details(){

        //----Arrange
        doTransaction(em -> {
            TestDataCreator.createAddresses();
        });

        //----Act
        doTransaction(em -> {
            UserAccount account =  new UserAccount("Vlad", "Ciobotariu", "vladciobotariu@gmail.com", "ozius12345", "/src/image1", "0734896512");
            LegalDetails legalDetails = new LegalDetails("MEGA FRESH SA", "RO37745609", "8559", LocalDate.now());

            Seller seller = new Seller(address1, account, "Mega Fresh SRL", SellerType.PFA, legalDetails);
            em.persist(seller);
        });

        //----Assert
        LegalDetails persistedLegalDetails = entityFinder.getTheOne(Seller.class).getLegalDetails();

        assertThat(persistedLegalDetails.getName()).isEqualTo("MEGA FRESH SA");
        assertThat(persistedLegalDetails.getCui()).isEqualTo("RO37745609");
        assertThat(persistedLegalDetails.getCaen()).isEqualTo("8559");
        assertEquals(persistedLegalDetails.getDateOfEstablishment(), LocalDate.now());

    }

    @Test
    void test_update_seller_legal_details(){

        //----Arrange
        Seller sellerToUpdate = doTransaction(em -> {

            Address address = new Address("Romania", "Timis", "Timisoara", "Strada Circumvalatiunii nr 4", "Bloc 3 Scara B Ap 12", "303413");

            UserAccount account =  new UserAccount("Vlad", "Ciobotariu", "vladciobotariu@gmail.com", "ozius12345", "/src/image1", "0734896512");
            LegalDetails legalDetails = new LegalDetails("MEGA FRESH SA", "RO37745609", "8559", LocalDate.now());

            Seller seller = new Seller(address, account, "Mega Fresh SRL", SellerType.PFA, legalDetails);
            em.persist(seller);

            return seller;
        });

        //----Act
        doTransaction(em -> {
            Seller mergedSeller = em.merge(sellerToUpdate);
            UserAccount account = mergedSeller.getAccount();
            LegalDetails legalDetails = mergedSeller.getLegalDetails();
            Address legalAddress = mergedSeller.getLegalAddress();

            mergedSeller.updateSeller(
                    account.getFirstName(),
                    account.getLastName(),
                    account.getEmail(),
                    account.getPasswordHash(),
                    account.getImageName(),
                    account.getTelephone(),
                    legalDetails.getName(),
                    legalDetails.getCui(),
                    "3489",
                    legalDetails.getDateOfEstablishment(),
                    legalAddress
            );
        });

        //----Assert
        Seller persistedSeller = entityFinder.getTheOne(Seller.class);
        LegalDetails persistedLegalDetails = persistedSeller.getLegalDetails();

        assertThat(persistedSeller.getAccount().getFirstName()).isEqualTo("Vlad");
        assertThat(persistedSeller.getAccount().getLastName()).isEqualTo("Ciobotariu");
        assertThat(persistedSeller.getAccount().getEmail()).isEqualTo("vladciobotariu@gmail.com");
        assertThat(persistedSeller.getAccount().getPasswordHash()).isEqualTo("ozius12345");
        assertThat(persistedSeller.getAccount().getImageName()).isEqualTo("/src/image1");
        assertThat(persistedSeller.getAccount().getTelephone()).isEqualTo("0734896512");
        assertThat(persistedSeller.getAlias()).isEqualTo("Mega Fresh SRL");
        assertThat(persistedSeller.getLegalAddress().getCountry()).isEqualTo("Romania");
        assertThat(persistedSeller.getLegalAddress().getState()).isEqualTo("Timis");
        assertThat(persistedSeller.getLegalAddress().getCity()).isEqualTo("Timisoara");
        assertThat(persistedSeller.getLegalAddress().getAddressLine1()).isEqualTo("Strada Circumvalatiunii nr 4");
        assertThat(persistedSeller.getLegalAddress().getAddressLine2()).isEqualTo("Bloc 3 Scara B Ap 12");
        assertThat(persistedSeller.getLegalAddress().getZipCode()).isEqualTo("303413");

        assertThat(persistedSeller.getSellerType()).isEqualTo(SellerType.PFA);

        assertThat(persistedLegalDetails.getName()).isEqualTo("MEGA FRESH SA");
        assertThat(persistedLegalDetails.getCui()).isEqualTo("RO37745609");
        assertThat(persistedLegalDetails.getCaen()).isEqualTo("3489");
        assertEquals(persistedLegalDetails.getDateOfEstablishment(), LocalDate.now());

    }

    @Test
    void test_update_seller_legal_address(){

        //----Arrange
        Seller sellerToUpdate = doTransaction(em -> {

            Address address = new Address("Romania", "Timis", "Timisoara", "Strada Circumvalatiunii nr 4", "Bloc 3 Scara B Ap 12", "303413");

            UserAccount account =  new UserAccount("Vlad", "Ciobotariu", "vladciobotariu@gmail.com", "ozius12345", "/src/image1", "0734896512");
            LegalDetails legalDetails = new LegalDetails("MEGA FRESH SA", "RO37745609", "8559", LocalDate.now());

            Seller seller = new Seller(address, account, "Mega Fresh SRL", SellerType.PFA, legalDetails);
            em.persist(seller);

            return seller;
        });

        //----Act
        doTransaction(em -> {
            Seller mergedSeller = em.merge(sellerToUpdate);
            UserAccount account = mergedSeller.getAccount();
            LegalDetails legalDetails = mergedSeller.getLegalDetails();

            //TODO how to do this better? like in BuyerEntityTests.java in line 100
            Address legalAddress = new Address("Italy", "Timis", "Timisoara", "Strada Circumvalatiunii nr 4", "Bloc 3 Scara B Ap 12", "303413");

            mergedSeller.updateSeller(
                    account.getFirstName(),
                    account.getLastName(),
                    account.getEmail(),
                    account.getPasswordHash(),
                    account.getImageName(),
                    account.getTelephone(),
                    legalDetails.getName(),
                    legalDetails.getCui(),
                    legalDetails.getCaen(),
                    legalDetails.getDateOfEstablishment(),
                    legalAddress
            );
        });

        //----Assert
        Seller persistedSeller = entityFinder.getTheOne(Seller.class);
        LegalDetails persistedLegalDetails = persistedSeller.getLegalDetails();

        assertThat(persistedSeller.getAccount().getFirstName()).isEqualTo("Vlad");
        assertThat(persistedSeller.getAccount().getLastName()).isEqualTo("Ciobotariu");
        assertThat(persistedSeller.getAccount().getEmail()).isEqualTo("vladciobotariu@gmail.com");
        assertThat(persistedSeller.getAccount().getPasswordHash()).isEqualTo("ozius12345");
        assertThat(persistedSeller.getAccount().getImageName()).isEqualTo("/src/image1");
        assertThat(persistedSeller.getAccount().getTelephone()).isEqualTo("0734896512");
        assertThat(persistedSeller.getAlias()).isEqualTo("Mega Fresh SRL");
        assertThat(persistedSeller.getLegalAddress().getCountry()).isEqualTo("Italy");
        assertThat(persistedSeller.getLegalAddress().getState()).isEqualTo("Timis");
        assertThat(persistedSeller.getLegalAddress().getCity()).isEqualTo("Timisoara");
        assertThat(persistedSeller.getLegalAddress().getAddressLine1()).isEqualTo("Strada Circumvalatiunii nr 4");
        assertThat(persistedSeller.getLegalAddress().getAddressLine2()).isEqualTo("Bloc 3 Scara B Ap 12");
        assertThat(persistedSeller.getLegalAddress().getZipCode()).isEqualTo("303413");

        assertThat(persistedSeller.getSellerType()).isEqualTo(SellerType.PFA);

        assertThat(persistedLegalDetails.getName()).isEqualTo("MEGA FRESH SA");
        assertThat(persistedLegalDetails.getCui()).isEqualTo("RO37745609");
        assertThat(persistedLegalDetails.getCaen()).isEqualTo("8559");
        assertEquals(persistedLegalDetails.getDateOfEstablishment(), LocalDate.now());

    }

}
