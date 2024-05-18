package com.ozius.internship.project.controller;

import com.ozius.internship.project.dto.ReviewDTO;
import com.ozius.internship.project.entity.review.Review;
import com.ozius.internship.project.service.ReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/reviews/{id}")
    public ResponseEntity<ReviewDTO> getReviewById(@PathVariable long id) {
        ReviewDTO review = reviewService.getReviewById(id);
        return ResponseEntity.ok(review);
    }

    @PutMapping("/reviews/{id}")
    public ResponseEntity<ReviewDTO> updateReview(@PathVariable long id, @RequestBody Review review) {
        ReviewDTO newReview = reviewService.updateReview(id, review.getDescription(), review.getRating());
        return ResponseEntity.ok(newReview);
    }

    @PostMapping("/reviews/{productId}/{userId}")
    public ResponseEntity<ReviewDTO> addReview(@PathVariable long productId, @PathVariable long userId, @RequestBody Review review) {
        ReviewDTO reviewDTO = reviewService.addReview(productId, userId, review.getDescription(), review.getRating());
        return ResponseEntity.ok(reviewDTO);
    }

}
