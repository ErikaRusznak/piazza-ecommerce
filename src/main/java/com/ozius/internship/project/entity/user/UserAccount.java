package com.ozius.internship.project.entity.user;

import com.ozius.internship.project.entity.BaseEntity;
import com.ozius.internship.project.entity.exception.IllegalItemException;
import com.ozius.internship.project.entity.review.Report;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Entity
@Table(name = UserAccount.TABLE_NAME)
public class UserAccount extends BaseEntity {

    public static final String TABLE_NAME = "user_account";
    public static final String JOIN_TABLE_NAME = "report_user";

    interface Columns{
        String FIRST_NAME = "FIRST_NAME";
        String LAST_NAME = "LAST_NAME";
        String EMAIL = "EMAIL";
        String PASSWORD_HASH = "PASSWORD_HASH";
        String IMAGE_NAME = "IMAGE_NAME";
        String TELEPHONE = "TELEPHONE";
        String USER_ROLE = "USER_ROLE";
        String RESET_TOKEN = "RESET_TOKEN";
        String USER_ID = "USER_ID";
        String REPORT_ID = "REPORT_ID";
    }

    @ManyToMany
    @JoinTable(
            name = JOIN_TABLE_NAME,
            joinColumns = @JoinColumn(name = Columns.USER_ID),
            inverseJoinColumns = @JoinColumn(name = Columns.REPORT_ID))
    private Set<Report> reportsCreated;

    @Column(name = Columns.FIRST_NAME, nullable = false)
    private String firstName;

    @Column(name = Columns.LAST_NAME, nullable = false)
    private String lastName;

    @Column(name = Columns.EMAIL, nullable = false, unique = true)
    private String email;

    @Column(name = Columns.PASSWORD_HASH)
    private String passwordHash;

    @Column(name = Columns.IMAGE_NAME)
    private String imageName;

    @Column(name = Columns.TELEPHONE, length = 12, nullable = false)
    private String telephone;

    @Enumerated(EnumType.STRING)
    @Column(name=Columns.USER_ROLE, nullable = false)
    private UserRole userRole;

    @Getter
    @Setter
    @Column(name = Columns.RESET_TOKEN)
    private String resetToken;

    protected UserAccount() {
    }

    public UserAccount(String firstName, String lastName, String email, String imageName, String telephone, UserRole userRole) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.imageName = imageName;
        this.telephone = telephone;
        this.userRole = userRole;
        this.reportsCreated = new HashSet<>();
    }

    public void updateAccount(String firstName, String lastName, String email, String image, String telephone){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.imageName = image;
        this.telephone = telephone;
        this.reportsCreated = new HashSet<>();
    }

    public void setInitialPassword(String passwordHashed){
        this.passwordHash = passwordHashed;
    }

    public void updatePassword(String currentHashedPassword,String newHashedPassword){
        if(!this.passwordHash.equals(currentHashedPassword)){
            throw new IllegalArgumentException("passwords don't match, please check current password");
        }
        this.passwordHash = newHashedPassword;
    }

    public void addReportFromUserAccount(Report report) {
        for (Report existingReport : this.reportsCreated) {
            if (existingReport.getReportedComment() != null && existingReport.getReportedComment().equals(report.getReportedComment())) {
                throw new IllegalItemException("User has already reported this comment.");
            }
            if (existingReport.getReportedReview() != null && existingReport.getReportedReview().equals(report.getReportedReview())) {
                throw new IllegalItemException("User has already reported this review.");
            }
        }
        this.reportsCreated.add(report);
    }

    @Override
    public String toString() {
        return "UserAccount{" +
                "firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", imageName='" + imageName + '\'' +
                ", telephone='" + telephone + '\'' +
                '}';
    }
}
