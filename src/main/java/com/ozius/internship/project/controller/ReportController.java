package com.ozius.internship.project.controller;

import com.ozius.internship.project.dto.CommentDTO;
import com.ozius.internship.project.dto.ReportDTO;
import com.ozius.internship.project.dto.ReviewDTO;
import com.ozius.internship.project.service.ReportService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ReportController {

    public final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/reports/{reportId}")
    public ResponseEntity<ReportDTO> getReportById(@PathVariable long reportId) {
        ReportDTO reportDTO = reportService.getReportById(reportId);
        return ResponseEntity.ok(reportDTO);
    }

    @PostMapping("/reports/comments/{commentId}/{userId}")
    @PreAuthorize("hasRole('CLIENT') and hasRole('SELLER')")
    @ResponseStatus(code = HttpStatus.CREATED)
    public ResponseEntity<ReportDTO> reportComment(@PathVariable long commentId, @PathVariable long userId, @RequestBody String reason) {
        ReportDTO reportDTO = reportService.reportComment(commentId, userId, reason);
        return ResponseEntity.ok(reportDTO);
    }

    @PostMapping("/reports/reviews/{reviewId}/{userId}")
    @PreAuthorize("hasRole('CLIENT') and hasRole('SELLER')")
    @ResponseStatus(code = HttpStatus.CREATED)
    public ResponseEntity<ReportDTO> reportReview(@PathVariable long reviewId, @PathVariable long userId, @RequestBody String reason) {
        ReportDTO reportDTO = reportService.reportReview(reviewId, userId, reason);
        return ResponseEntity.ok(reportDTO);
    }

    @GetMapping("/reports/comments")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<CommentDTO>> getAllCommentsWithReports() {
        List<CommentDTO> commentDTOS = reportService.getCommentsWithReports();
        return ResponseEntity.ok(commentDTOS);
    }

    @GetMapping("/reports/reviews")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ReviewDTO>> getAllReviewsWithReports() {
        List<ReviewDTO> reviewDTOS = reportService.getReviewsWithReports();
        return ResponseEntity.ok(reviewDTOS);
    }

    @GetMapping("/reports/comments/{commentId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ReportDTO>> getReportsByCommentId(@PathVariable long commentId) {
        List<ReportDTO> reportDTOS = reportService.getReportsForComment(commentId);
        return ResponseEntity.ok(reportDTOS);
    }

    @GetMapping("/reports/reviews/{reviewId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ReportDTO>> getReportsByReviewId(@PathVariable long reviewId) {
        List<ReportDTO> reportDTOS = reportService.getReportsForReview(reviewId);
        return ResponseEntity.ok(reportDTOS);
    }

    // these two happen when the admin takes into account the reports and wants to delete the comment or the review
    @DeleteMapping("/comments/{commentId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteComment(@PathVariable long commentId) {
        reportService.deleteReportedComment(commentId);
        return ResponseEntity.ok("Comment deleted");
    }

    @DeleteMapping("/reviews/{reviewId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteReview(@PathVariable long reviewId) {
        reportService.deleteReportedReview(reviewId);
        return ResponseEntity.ok("Review deleted");
    }

    // these two happen when admin thinks the reports are unnecessary
    @DeleteMapping("/reports/comments/{commentId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteReportsFromComment(@PathVariable long commentId) {
        reportService.deleteReportsForComment(commentId);
        return ResponseEntity.ok("Reports from comment deleted");
    }

    @DeleteMapping("/reports/reviews/{reviewId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteReportsFromReview(@PathVariable long reviewId) {
        reportService.deleteReportsForReview(reviewId);
        return ResponseEntity.ok("Reports from review deleted");
    }
}
