package com.ozius.internship.project.service;

import com.ozius.internship.project.dto.CommentDTO;
import com.ozius.internship.project.dto.ReportDTO;
import com.ozius.internship.project.dto.ReviewDTO;
import com.ozius.internship.project.entity.review.Comment;
import com.ozius.internship.project.entity.review.Report;
import com.ozius.internship.project.entity.review.Review;
import com.ozius.internship.project.entity.user.UserAccount;
import com.ozius.internship.project.repository.CommentRepository;
import com.ozius.internship.project.repository.ReportRepository;
import com.ozius.internship.project.repository.ReviewRepository;
import com.ozius.internship.project.repository.UserAccountRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReportService {

    private final ReportRepository reportRepository;
    private final ReviewRepository reviewRepository;
    private final CommentRepository commentRepository;
    private final UserAccountRepository accountRepository;
    private final ModelMapper modelMapper;

    public ReportService(ReportRepository reportRepository, ReviewRepository reviewRepository, CommentRepository commentRepository, UserAccountRepository accountRepository, ModelMapper modelMapper) {
        this.reportRepository = reportRepository;
        this.reviewRepository = reviewRepository;
        this.commentRepository = commentRepository;
        this.accountRepository = accountRepository;
        this.modelMapper = modelMapper;
    }

    @Transactional
    public ReportDTO getReportById(long id) {
        Report report = reportRepository.findById(id).orElseThrow();
        return modelMapper.map(report, ReportDTO.class);
    }

    @Transactional
    public ReportDTO reportComment(long commentId, long userId, String reason) {
        Comment comment = commentRepository.findById(commentId).orElseThrow();
        UserAccount account = accountRepository.findById(userId).orElseThrow();
        Report report = new Report(comment, reason);
        account.addReportFromUserAccount(report);
        reportRepository.save(report);
        return modelMapper.map(report, ReportDTO.class);
    }

    @Transactional
    public ReportDTO reportReview(long reviewId, long userId, String reason) {
        Review review = reviewRepository.findById(reviewId).orElseThrow();
        UserAccount account = accountRepository.findById(userId).orElseThrow();
        Report report = new Report(review, reason);
        account.addReportFromUserAccount(report);
        reportRepository.save(report);
        return modelMapper.map(report, ReportDTO.class);
    }

    @Transactional
    public List<CommentDTO> getCommentsWithReports() {
        List<Comment> comments = reportRepository.findCommentsWithReports();
        return comments.stream()
                .map(comment -> modelMapper.map(comment, CommentDTO.class))
                .collect(Collectors.toList());
    }

    @Transactional
    public List<ReviewDTO> getReviewsWithReports() {
        List<Review> reviews = reportRepository.findReviewsWithReports();
        return reviews.stream()
                .map(review -> modelMapper.map(review, ReviewDTO.class))
                .collect(Collectors.toList());
    }

    @Transactional
    public List<ReportDTO> getReportsForComment(long commentId) {
        Comment comment = commentRepository.findById(commentId).orElseThrow();
        List<Report> reports = reportRepository.findByReportedComment(comment);
        return reports.stream()
                .map(report -> modelMapper.map(report, ReportDTO.class))
                .collect(Collectors.toList());
    }

    @Transactional
    public List<ReportDTO> getReportsForReview(long reviewId) {
        Review review = reviewRepository.findById(reviewId).orElseThrow();
        List<Report> reports = reportRepository.findByReportedReview(review);
        return reports.stream()
                .map(report -> modelMapper.map(report, ReportDTO.class))
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteReportedComment(long commentId) {
        boolean exists = commentRepository.existsById(commentId);
        if(!exists) {
            throw new IllegalStateException("Comment does not exist");
        }
        commentRepository.deleteById(commentId);
    }

    @Transactional
    public void deleteReportedReview(long reviewId) {
        boolean exists = reviewRepository.existsById(reviewId);
        if(!exists) {
            throw new IllegalStateException("Review does not exist");
        }
        reviewRepository.deleteById(reviewId);
    }

    @Transactional
    public void deleteReportsForComment(long commentId) {
        Comment comment = commentRepository.findById(commentId).orElseThrow();
        List<Report> reports = reportRepository.findByReportedComment(comment);
        reportRepository.deleteAll(reports);
    }

    @Transactional
    public void deleteReportsForReview(long reviewId) {
        Review review = reviewRepository.findById(reviewId).orElseThrow();
        List<Report> reports = reportRepository.findByReportedReview(review);
        reportRepository.deleteAll(reports);
    }
}
