package com.ozius.internship.project;

import com.ozius.internship.project.infra.jpa.JpaHelper;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.PersistenceUnit;
import org.springframework.context.annotation.DependsOn;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@DependsOn(value = {"reviewAddedListener", "domainEventPublisherProvider"})
@Profile(SpringProfiles.TEST_DATA_SEED)
public class DataSeedForTesting {

    @PersistenceUnit
    private EntityManagerFactory emf;
    private final PasswordEncoder passwordEncoder;

    public DataSeedForTesting(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @PostConstruct
    public void createTestData(){

        new JpaHelper(emf).doTransaction(em -> {

            DataCreatorForTesting.createBuyerBaseData(em, passwordEncoder);
            DataCreatorForTesting.createSellerBaseData(em, passwordEncoder);
            DataCreatorForTesting.createCourierBaseData(em, passwordEncoder);
            DataCreatorForTesting.createCategoriesBaseData(em);
            DataCreatorForTesting.createProductsBaseData(em);
            DataCreatorForTesting.createReviewsBaseData();

            DataCreatorForTesting.createCartBaseData(em);
            DataCreatorForTesting.createFavoritesBaseData(em);

            DataCreatorForTesting.createBuyerAddressBaseData(em);

        });
    }
}
