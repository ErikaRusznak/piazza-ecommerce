package com.ozius.internship.project.entity.courier;

import com.ozius.internship.project.entity.BaseEntity;
import com.ozius.internship.project.entity.user.UserAccount;
import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Table(name = Courier.TABLE_NAME)
public class Courier extends BaseEntity {

    public static final String TABLE_NAME = "courier";

    interface Columns {
        String ACCOUNT_ID = "ACCOUNT_ID";
        String COURIER_ID = "COURIER_ID";
    }

    @Getter
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = Columns.ACCOUNT_ID, nullable = false)
    private UserAccount account;

    protected Courier() {
    }

    public Courier(UserAccount account) {
        this.account = account;
    }

    public String getFirstName() {
        return account.getFirstName();
    }

    public String getLastName() {
        return account.getLastName();
    }

    public String getImageName() {
        return account.getImageName();
    }

    public String getTelephone() {
        return account.getTelephone();
    }
    public String getEmail() { return account.getEmail(); }

    @Override
    public String toString() {
        return "Courier{" +
                "account=" + account +
                '}';
    }
}
