package com.ozius.internship.project.entity.review;

import com.ozius.internship.project.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Table(name = Report.TABLE_NAME)
@Getter
public class Report extends BaseEntity {

    public static final String TABLE_NAME = "report";

    public interface Columns {
        String REVIEW_ID = "REVIEW_ID";
        String COMMENT_ID = "COMMENT_ID";
        String REASON = "REASON";
        String REPORTED_BY = "REPORTED_BY";
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = Columns.REVIEW_ID,
            foreignKey = @ForeignKey(foreignKeyDefinition = "FOREIGN KEY (" + Columns.REVIEW_ID + ") REFERENCES " + Review.TABLE_NAME + " (" + BaseEntity.ID + ") ON DELETE CASCADE"))
    private Review reportedReview;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = Columns.COMMENT_ID,
            foreignKey = @ForeignKey(foreignKeyDefinition = "FOREIGN KEY (" + Columns.COMMENT_ID + ") REFERENCES " + Comment.TABLE_NAME + " (" + BaseEntity.ID + ") ON DELETE CASCADE"))
    private Comment reportedComment;


    @Column(name = Columns.REASON, nullable = false)
    private String reason;

    @Column(name = Columns.REPORTED_BY, nullable = false)
    private String reportedBy;

    protected Report(){
    }

    public Report(Review reportedReview, String reason, String reportedBy) {
        this.reportedReview = reportedReview;
        this.reason = reason;
        this.reportedBy = reportedBy;
    }

    public Report(Comment reportedComment, String reason, String reportedBy) {
        this.reportedComment = reportedComment;
        this.reason = reason;
        this.reportedBy = reportedBy;
    }

    @Override
    public String toString() {
        return "Report{" +
                "comment=" + reportedComment +
                ", reportedReview=" + reportedReview +
                ", reason='" + reason + '\'' +
                '}';
    }
}
