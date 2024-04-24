package com.ozius.internship.project.entity.order;

public enum OrderStatus {

    PENDING,
    PROCESSING,
    SHIPPING,
    DELIVERED,
    CANCELED

    // TODO - change to this after Courier platform is added
//    PENDING, // by seller
//    PROCESSING, // by seller
//    READY_TO_SHIP, // by seller
//    SHIPPING, // should only be set by a COURIER
//    DELIVERED, // should only be set by a COURIER
//    CANCELED // by seller

}
