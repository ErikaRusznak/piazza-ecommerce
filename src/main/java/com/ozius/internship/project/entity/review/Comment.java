package com.ozius.internship.project.entity.review;

import com.ozius.internship.project.entity.BaseEntity;
import com.ozius.internship.project.entity.user.UserAccount;
import jakarta.persistence.*;
import lombok.Getter;

@Getter
@Entity
@Table(name = Comment.TABLE_NAME)
public class Comment extends BaseEntity {

    public static final String TABLE_NAME = "comments";

    public interface Columns {
        String REVIEW_ID = "REVIEW_ID";
        String CONTENT = "CONTENT";
        String USER_ID = "USER_ID";
    }

    @Column(name = Columns.CONTENT, nullable = false)
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = Columns.USER_ID, foreignKey = @ForeignKey(foreignKeyDefinition = "FOREIGN KEY (" + Columns.USER_ID + ") REFERENCES " + UserAccount.TABLE_NAME + " (" + BaseEntity.ID + ")  ON DELETE SET NULL"))
    private UserAccount userAccount;

    protected Comment() {
    }

    public Comment(String content, UserAccount userAccount) {
        this.content = content;
        this.userAccount = userAccount;
    }

    @Override
    public String toString() {
        return "Comment{" +
                "content='" + content + '\'' +
                ", userAccount=" + userAccount +
                '}';
    }
}
