package com.ozius.internship.project.entity.review;

import com.ozius.internship.project.entity.BaseEntity;
import com.ozius.internship.project.entity.exception.IllegalItemException;
import com.ozius.internship.project.entity.user.UserAccount;
import jakarta.persistence.*;
import lombok.Getter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = Report.TABLE_NAME)
@Getter
public class Report extends BaseEntity {

    public static final String TABLE_NAME = "report";
    public static final String JOIN_TABLE_NAME = "report_user";

    public interface Columns {
        String REVIEW_ID = "REVIEW_ID";
        String COMMENT_ID = "COMMENT_ID";
        String USER_ID = "USER_ID";
        String REPORT_ID = "REPORT_ID";
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

    @ManyToMany
    @JoinTable(
            name = JOIN_TABLE_NAME,
            joinColumns = @JoinColumn(name = Columns.REPORT_ID),
            inverseJoinColumns = @JoinColumn(name = Columns.USER_ID))
    private Set<UserAccount> reportedByUsers;

    @Column(name = Columns.REASON, nullable = false)
    private String reason;

    protected Report(){
    }

    public Report(Review reportedReview, String reason) {
        this.reportedByUsers = new HashSet<>();
        this.reportedReview = reportedReview;
        this.reason = reason;
    }

    public Report(Comment reportedComment, String reason) {
        this.reportedByUsers = new HashSet<>();
        this.reportedComment = reportedComment;
        this.reason = reason;
    }

    public void addReportFromUserAccount(UserAccount userAccount) {
        if(this.reportedByUsers.stream().anyMatch(item -> item.equals(userAccount))) {
            throw new IllegalItemException("Can't report again.");
        }
        this.reportedByUsers.add(userAccount);
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
