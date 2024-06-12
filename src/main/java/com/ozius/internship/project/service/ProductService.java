package com.ozius.internship.project.service;

import com.ozius.internship.project.dto.CategoryDTO;
import com.ozius.internship.project.dto.ProductDTO;
import com.ozius.internship.project.dto.ReviewDTO;
import com.ozius.internship.project.dto.SellerDTO;
import com.ozius.internship.project.entity.product.Category;
import com.ozius.internship.project.entity.product.Product;
import com.ozius.internship.project.entity.review.Review;
import com.ozius.internship.project.entity.seller.Seller;
import com.ozius.internship.project.repository.CategoryRepository;
import com.ozius.internship.project.repository.ProductRepository;
import com.ozius.internship.project.repository.SellerRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final SellerRepository sellerRepository;
    private final ModelMapper modelMapper;

    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository, SellerRepository sellerRepository, ModelMapper modelMapper) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.sellerRepository = sellerRepository;
        this.modelMapper = modelMapper;
    }

    public ProductDTO getProductWithReviews(long id) {
        Product product = productRepository.findById(id).orElseThrow();
        return modelMapper.map(product, ProductDTO.class);
    }

    public List<ReviewDTO> getReviewsForProduct(long id) {
        List<Review> reviews = productRepository.getReviewsForProduct(id);

        return reviews.stream()
                .map(review -> modelMapper.map(review, ReviewDTO.class))
                .collect(Collectors.toList());
    }

    @Transactional
    public void recalculateProductRating(long productId) {
        Product product = productRepository.findById(productId).orElseThrow();
        List<Review> reviews = productRepository.getReviewsForProduct(productId);
        product.updateRatingInformation(reviews);
    }

    @Transactional
    public ProductDTO createProduct(ProductDTO productDTO) {
        Category category = categoryRepository.findById(productDTO.getCategory().getId()).orElseThrow();
        Seller seller = sellerRepository.findById(productDTO.getSeller().getId()).orElseThrow();
        Product product = new Product(productDTO.getName(), productDTO.getDescription(), productDTO.getImageName(), productDTO.getPrice(), category, seller, productDTO.getUnitOfMeasure(), productDTO.getQuantity());
        productRepository.save(product);
        return modelMapper.map(product, ProductDTO.class);
    }

    @Transactional
    public void deleteProduct(long productId) {
        boolean exists = productRepository.existsById(productId);
        if(!exists) {
            throw new IllegalStateException("product does not exist");
        }
        productRepository.deleteById(productId);
    }

    @Transactional
    public Product updateProduct(Product product) {
        Product updatedProduct = productRepository.findById(product.getId()).orElseThrow();
        updatedProduct.updateProduct(product.getName(), product.getDescription(), product.getImageName(), product.getPrice(), product.getCategory(), product.getSeller(), product.getUnitOfMeasure(), product.getQuantity());
        return updatedProduct;
    }

    @Transactional
    public ProductDTO addProductsInStore(long id, float quantity) {
        Product updatedProduct = productRepository.findById(id).orElseThrow();
        updatedProduct.addProductsInStore(quantity);
        return modelMapper.map(updatedProduct, ProductDTO.class);
    }

}
