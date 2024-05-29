package com.ozius.internship.project.service;

import com.ozius.internship.project.dto.CommentDTO;
import com.ozius.internship.project.entity.review.Comment;
import com.ozius.internship.project.entity.review.Review;
import com.ozius.internship.project.entity.user.UserAccount;
import com.ozius.internship.project.repository.CommentRepository;
import com.ozius.internship.project.repository.ReviewRepository;
import com.ozius.internship.project.repository.UserAccountRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final ReviewRepository reviewRepository;
    private final UserAccountRepository userAccountRepository;
    private final ModelMapper modelMapper;

    public CommentService(CommentRepository commentRepository, ReviewRepository reviewRepository, UserAccountRepository userAccountRepository, ModelMapper modelMapper) {
        this.commentRepository = commentRepository;
        this.reviewRepository = reviewRepository;
        this.userAccountRepository = userAccountRepository;
        this.modelMapper = modelMapper;
    }

    @Transactional
    public CommentDTO getCommentById(long commentId) {
        Comment comment = commentRepository.findById(commentId).orElse(null);
        return modelMapper.map(comment, CommentDTO.class);
    }

    @Transactional
    public CommentDTO addComment(long reviewId, long userId, String content) {
        UserAccount userAccount = userAccountRepository.findById(userId).orElseThrow();
        Review review = reviewRepository.findById(reviewId).orElseThrow();

        Comment comment = review.addComment(content, userAccount);
        commentRepository.save(comment);
        reviewRepository.save(review);

        return modelMapper.map(comment, CommentDTO.class);
    }

    @Transactional
    public List<CommentDTO> getCommentsForReview(long id) {
        Review review = reviewRepository.findById(id).orElseThrow();
        return review.getComments().stream()
                .map(comment -> modelMapper.map(comment, CommentDTO.class))
                .collect(Collectors.toList());
    }
}
