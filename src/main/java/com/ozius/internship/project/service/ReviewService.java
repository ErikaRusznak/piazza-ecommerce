package com.ozius.internship.project.service;

import com.ozius.internship.project.dto.ReviewDTO;
import com.ozius.internship.project.entity.review.Review;
import com.ozius.internship.project.repository.ReviewRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;


@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ModelMapper modelMapper;

    public ReviewService(ReviewRepository reviewRepository, ModelMapper modelMapper) {
        this.reviewRepository = reviewRepository;
        this.modelMapper = modelMapper;
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
}
