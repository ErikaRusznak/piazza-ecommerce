package com.ozius.internship.project.entity.order;

public enum OrderStatus {

    PENDING, // set by seller
    PROCESSING, // set by seller
    READY_TO_SHIP, // set by seller
    SHIPPING, // should only be set by a COURIER
    DELIVERED, // should only be set by a COURIER
    CANCELED // by seller

}
