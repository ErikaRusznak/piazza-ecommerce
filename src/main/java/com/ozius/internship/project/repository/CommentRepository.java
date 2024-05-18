package com.ozius.internship.project.repository;

import com.ozius.internship.project.entity.review.Comment;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CommentRepository extends JpaRepository<Comment, Long> {

}
