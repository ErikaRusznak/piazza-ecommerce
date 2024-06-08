package com.ozius.internship.project.controller;

import com.ozius.internship.project.dto.ReviewDTO;
import com.ozius.internship.project.entity.review.Review;
import com.ozius.internship.project.service.ReportService;
import com.ozius.internship.project.service.ReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;
    private final ReportService reportService;

    public ReviewController(ReviewService reviewService, ReportService reportService) {
        this.reviewService = reviewService;
        this.reportService = reportService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReviewDTO> getReviewById(@PathVariable long id) {
        ReviewDTO review = reviewService.getReviewById(id);
        return ResponseEntity.ok(review);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReviewDTO> updateReview(@PathVariable long id, @RequestBody Review review) {
        ReviewDTO newReview = reviewService.updateReview(id, review.getDescription(), review.getRating());
        return ResponseEntity.ok(newReview);
    }

    @PostMapping("/{productId}/{userId}")
    public ResponseEntity<ReviewDTO> addReview(@PathVariable long productId, @PathVariable long userId, @RequestBody Review review) {
        ReviewDTO reviewDTO = reviewService.addReview(productId, userId, review.getDescription(), review.getRating());
        return ResponseEntity.ok(reviewDTO);
    }

    @DeleteMapping("/{reviewId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteReview(@PathVariable long reviewId) {
        reportService.deleteReportedReview(reviewId);
        return ResponseEntity.ok("Review deleted");
    }


}
