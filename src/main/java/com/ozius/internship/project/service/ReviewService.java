package com.ozius.internship.project.service;

import com.ozius.internship.project.dto.ReviewDTO;
import com.ozius.internship.project.entity.buyer.Buyer;
import com.ozius.internship.project.entity.product.Product;
import com.ozius.internship.project.entity.review.Review;
import com.ozius.internship.project.repository.BuyerRepository;
import com.ozius.internship.project.repository.ProductRepository;
import com.ozius.internship.project.repository.ReviewRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;


@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ModelMapper modelMapper;
    private final BuyerRepository buyerRepository;
    private final ProductRepository productRepository;

    public ReviewService(ReviewRepository reviewRepository, ModelMapper modelMapper, BuyerRepository buyerRepository, ProductRepository productRepository) {
        this.reviewRepository = reviewRepository;
        this.modelMapper = modelMapper;
        this.buyerRepository = buyerRepository;
        this.productRepository = productRepository;
    }

    @Transactional
    public ReviewDTO getReviewById(long id) {
        Review review = reviewRepository.findById(id).orElseThrow();
        return modelMapper.map(review, ReviewDTO.class);
    }

    @Transactional
    public ReviewDTO updateReview(long id, String description, float rating) {
        Review review = reviewRepository.findById(id).orElseThrow();
        review.updateReview(description, rating);

        return modelMapper.map(review, ReviewDTO.class);
    }

    @Transactional
    public ReviewDTO addReview(long productId, long userId, String description, float rating) {
        Buyer buyer = buyerRepository.findBuyerByAccount_Id(userId);
        Product product = productRepository.findById(productId).orElseThrow();

        Review review = product.addReview(buyer, description, rating);
        reviewRepository.save(review);
        productRepository.save(product);

        return modelMapper.map(review, ReviewDTO.class);
    }

//    @Transactional(readOnly = true)
//    private boolean hasUserBoughtProduct(long productId, long userId) {
//        Buyer buyer = buyerRepository.findBuyerByAccount_Id(userId);
//        Product product = productService.getProductById(productId);
//
//        return buyer.getOrders().stream()
//                .anyMatch(order -> order.getItems().stream()
//                        .anyMatch(item -> item.getProduct().equals(product)));
//    }
}
