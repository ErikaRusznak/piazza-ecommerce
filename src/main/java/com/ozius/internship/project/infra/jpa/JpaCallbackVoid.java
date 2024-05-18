package com.ozius.internship.project.infra.jpa;

import jakarta.persistence.EntityManager;

public interface JpaCallbackVoid {
    void execute(EntityManager em);
}
