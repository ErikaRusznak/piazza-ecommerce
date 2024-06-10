package com.ozius.internship.project.controller;

import com.ozius.internship.project.aspect.RequireApprovedSeller;
import com.ozius.internship.project.dto.ProductDTO;
import com.ozius.internship.project.dto.ReviewDTO;
import com.ozius.internship.project.entity.product.Product;
import com.ozius.internship.project.service.ProductService;
import com.ozius.internship.project.service.filtering.ProductPaginationSearchQuery;
import com.ozius.internship.project.service.filtering.filter.FilterSpecs;
import com.ozius.internship.project.service.filtering.sort.SortSpecs;
import jakarta.persistence.EntityManager;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ModelMapper modelMapper;
    private final EntityManager entityManager;
    private final ProductService productService;

    public ProductController(ModelMapper modelMapper, EntityManager entityManager, ProductService productService) {
        this.modelMapper = modelMapper;
        this.entityManager = entityManager;
        this.productService = productService;
    }

    @GetMapping
    public ApiPaginationResponse<List<ProductDTO>> getProductsByFilter(
            @RequestParam(name = "itemsPerPage", defaultValue = "10") int itemsPerPage,
            @RequestParam(name = "page", defaultValue = "1") int page,
            @RequestParam(name = "sort", required = false) SortSpecs sortSpecs,
            @RequestParam(name = "filter", required = false) FilterSpecs filterSpecs) {

        ProductPaginationSearchQuery query = new ProductPaginationSearchQuery(modelMapper, entityManager)
                .filterBy(filterSpecs)
                .orderBy(sortSpecs);
        int numOfTotalProds = query.getResultList().size();
        List<ProductDTO> productDTO = query.getPagingResultList(itemsPerPage, page-1);
        return new ApiPaginationResponse<>(page, itemsPerPage, numOfTotalProds, productDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductWithReviews(@PathVariable long id) {
        ProductDTO productWithRatingsDTO = productService.getProductWithReviews(id);
        return ResponseEntity.ok(productWithRatingsDTO);
    }

    @GetMapping("/{id}/reviews")
    public ResponseEntity<List<ReviewDTO>> getReviewsForProduct(@PathVariable long id) {
        List<ReviewDTO> reviews = productService.getReviewsForProduct(id);
        return ResponseEntity.ok(reviews);
    }

    @RequireApprovedSeller
    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public ResponseEntity<ProductDTO> createProduct(@RequestBody Product product) {
        ProductDTO createdProduct = productService.createProduct(product);
        return ResponseEntity.ok(createdProduct);
    }

    @DeleteMapping("/{id}")
    public void deleteProductById(@PathVariable long id) {
        productService.deleteProduct(id);
    }

    @PutMapping
    public ResponseEntity<Product> updateProduct(@RequestBody Product product) {
        Product updatedProduct = productService.updateProduct(product);
        return ResponseEntity.ok(updatedProduct);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> addProductsInStore(@PathVariable long id, @RequestBody float quantity) {
        ProductDTO updatedProduct = productService.addProductsInStore(id, quantity);
        return ResponseEntity.ok(updatedProduct);
    }

}
