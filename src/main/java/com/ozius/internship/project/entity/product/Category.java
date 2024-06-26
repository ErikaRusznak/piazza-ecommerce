package com.ozius.internship.project.entity.product;

import com.ozius.internship.project.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;

@Getter
@Entity
@Table(name = Category.TABLE_NAME)
public class Category extends BaseEntity {
    public static final String TABLE_NAME = "category";

    interface Columns {
        String NAME = "NAME";
        String IMAGE_NAME = "IMAGE_NAME";
    }

    @Column(name = Columns.NAME, nullable = false, unique = true)
    private String name;

    @Column(name = Columns.IMAGE_NAME, nullable = false)
    private String imageName;

    protected Category() {
    }

    public Category(String name, String imageName) {
        this.name = name;
        this.imageName = imageName;
    }

    public void updateCategory(String name, String imageName) {
        this.name = name;
        this.imageName = imageName;
    }

    @Override
    public String toString() {
        return "Category{" +
                "name='" + name + '\'' +
                ", imageName='" + imageName + '\'' +
                '}';
    }
}
