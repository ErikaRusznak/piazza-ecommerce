package com.ozius.internship.project.controller;

import com.ozius.internship.project.entity.product.Category;
import com.ozius.internship.project.repository.CategoryRepository;
import com.ozius.internship.project.service.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    private final CategoryService categoryService;
    private final CategoryRepository categoryRepository;

    public CategoryController(CategoryService categoryService, CategoryRepository categoryRepository) {
        this.categoryService = categoryService;
        this.categoryRepository = categoryRepository;
    }

    @GetMapping
    public ApiResponse<List<Category>> getCategories() {
        int numberOfCategories = categoryService.getCategories().size();
        List<Category> categories = categoryService.getCategories();
        return new ApiResponse<>(numberOfCategories, categories);
    }

    @GetMapping("/categoryNames")
    public ResponseEntity<List<String>> getAllCategoryNames() {
        List<Category> categoryList = categoryRepository.findAll();
        List<String> categoryNames = categoryList.stream()
                .map(Category::getName)
                .collect(Collectors.toList());

        return ResponseEntity.ok(categoryNames);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Object> createCategory(@RequestBody Category category) {
        Category createdCategory = categoryService.createCategory(category);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCategory);
    }

    @PutMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Category> updateCategory(@RequestBody Category category) {
        Category updatedCategory = categoryService.updateCategory(category);
        return ResponseEntity.ok(updatedCategory);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteCategoryById(@PathVariable long id) {
        categoryService.deleteCategory(id);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable long id) {
        Category category = categoryService.getCategoryById(id);
        return ResponseEntity.ok(category);
    }

}
