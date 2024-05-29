package com.ozius.internship.project.repository;

import com.ozius.internship.project.entity.review.Comment;
import com.ozius.internship.project.entity.review.Report;
import com.ozius.internship.project.entity.review.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {

    @Query("SELECT DISTINCT r.reportedComment FROM Report r")
    List<Comment> findCommentsWithReports();

    @Query("SELECT DISTINCT r.reportedReview FROM Report r")
    List<Review> findReviewsWithReports();

    List<Report> findByReportedComment(Comment comment);

    List<Report> findByReportedReview(Review review);


    Optional<Report> findByReportedCommentAndReportedBy(Comment comment, String reportedBy);
    Optional<Report> findByReportedReviewAndReportedBy(Review review, String reportedBy);

}
