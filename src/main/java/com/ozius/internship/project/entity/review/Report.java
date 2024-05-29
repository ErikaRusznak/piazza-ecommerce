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

    protected Report(){
    }

    public Report(Review reportedReview, String reason) {
        this.reportedReview = reportedReview;
        this.reason = reason;
    }

    public Report(Comment reportedComment, String reason) {
        this.reportedComment = reportedComment;
        this.reason = reason;
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
