package com.ozius.internship.project.infra.jpa;

import jakarta.persistence.EntityManager;

public interface JpaCallback<T> {

    T execute(EntityManager em);
}
