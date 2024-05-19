package com.ozius.internship.project.service;

import com.ozius.internship.project.entity.Category;
import com.ozius.internship.project.entity.product.Product;
import com.ozius.internship.project.repository.CategoryRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> getCategories() {
        return categoryRepository.findAll();
    }

    public Category createCategory(Category category) {
        categoryRepository.save(category);
        return category;
    }

    public Category updateCategory(Category category) {
        Category updatedCategory = categoryRepository.findById(category.getId()).orElseThrow();
        updatedCategory.updateCategory(category.getName(), category.getImageName());
        return updatedCategory;
    }

    @Transactional
    public void deleteCategory(long categoryId) {
        boolean exists = categoryRepository.existsById(categoryId);
        if(!exists) {
            throw new IllegalStateException("category does not exist");
        }
        categoryRepository.deleteById(categoryId);
    }
}
