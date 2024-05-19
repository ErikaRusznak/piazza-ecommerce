package com.ozius.internship.project;

import com.ozius.internship.project.entity.BaseEntity;
import com.ozius.internship.project.entity.product.Product;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.NonUniqueResultException;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;

import java.util.List;

public class EntityFinder {

    private final EntityManager em;


    public EntityFinder(EntityManager em) {
        this.em = em;
    }

    public <T extends BaseEntity> List<T> findAll(Class<T> entityClass){
        return em.createQuery("select b from " + entityClass.getSimpleName() + " b", entityClass).getResultList();
    }

    public <W> W getTheOne(Class<W> entityClass){
        List<W> entities = em.createQuery("select e from " + entityClass.getSimpleName() + " e", entityClass)
                .getResultList();

        if (entities.isEmpty()) {
            throw new NoResultException("Cannot find any records for given entity class " + entityClass.getSimpleName());
        } else if (entities.size() > 1) {
            throw new NonUniqueResultException("Expected one but found more than one record for entity class " + entityClass.getSimpleName());
        } else {
            return entities.get(0);
        }
    }

    public <E> E getById(Class<E> entityClass, Long id) {
        return new SimpleJpaRepository<>(entityClass, em).findById(id).orElseThrow();
    }

    public Product getProductByName(String name) {
        try {
            return em.createQuery(
                            "select p from Product p where p.name = :nameParam", Product.class)
                    .setParameter("nameParam", name)
                    .getSingleResult();
        } catch (NoResultException ex) {
            return null;
        }
    }

}
