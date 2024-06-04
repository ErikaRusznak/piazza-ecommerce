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
@RequestMapping("/api/reports")
public class ReportController {

    public final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/{reportId}")
    public ResponseEntity<ReportDTO> getReportById(@PathVariable long reportId) {
        ReportDTO reportDTO = reportService.getReportById(reportId);
        return ResponseEntity.ok(reportDTO);
    }

    @PostMapping("/comments/{commentId}/{userId}")
    @PreAuthorize("hasRole('CLIENT') or hasRole('SELLER')")
    @ResponseStatus(code = HttpStatus.CREATED)
    public ResponseEntity<ReportDTO> reportComment(@PathVariable long commentId, @PathVariable long userId, @RequestBody String reason) {
        ReportDTO reportDTO = reportService.reportComment(commentId, userId, reason);
        return ResponseEntity.ok(reportDTO);
    }

    @PostMapping("/reviews/{reviewId}/{userId}")
    @PreAuthorize("hasRole('CLIENT') or hasRole('SELLER')")
    @ResponseStatus(code = HttpStatus.CREATED)
    public ResponseEntity<ReportDTO> reportReview(@PathVariable long reviewId, @PathVariable long userId, @RequestBody String reason) {
        ReportDTO reportDTO = reportService.reportReview(reviewId, userId, reason);
        return ResponseEntity.ok(reportDTO);
    }

    @GetMapping("/comments")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<CommentDTO>> getAllCommentsWithReports() {
        List<CommentDTO> commentDTOS = reportService.getCommentsWithReports();
        return ResponseEntity.ok(commentDTOS);
    }

    @GetMapping("/reviews")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ReviewDTO>> getAllReviewsWithReports() {
        List<ReviewDTO> reviewDTOS = reportService.getReviewsWithReports();
        return ResponseEntity.ok(reviewDTOS);
    }

    @GetMapping("/comments/{commentId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ReportDTO>> getReportsByCommentId(@PathVariable long commentId) {
        List<ReportDTO> reportDTOS = reportService.getReportsForComment(commentId);
        return ResponseEntity.ok(reportDTOS);
    }

    @GetMapping("/reviews/{reviewId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ReportDTO>> getReportsByReviewId(@PathVariable long reviewId) {
        List<ReportDTO> reportDTOS = reportService.getReportsForReview(reviewId);
        return ResponseEntity.ok(reportDTOS);
    }

    // these two happen when the admin takes into account the reports and wants to delete the comment or the review


    // these two happen when admin thinks the reports are unnecessary
    @DeleteMapping("/comments/{commentId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteReportsFromComment(@PathVariable long commentId) {
        reportService.deleteReportsForComment(commentId);
        return ResponseEntity.ok("Reports from comment deleted");
    }

    @DeleteMapping("/reviews/{reviewId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteReportsFromReview(@PathVariable long reviewId) {
        reportService.deleteReportsForReview(reviewId);
        return ResponseEntity.ok("Reports from review deleted");
    }
}
