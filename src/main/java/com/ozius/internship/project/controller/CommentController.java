package com.ozius.internship.project.controller;

import com.ozius.internship.project.dto.CommentDTO;
import com.ozius.internship.project.service.CommentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CommentController {

    public final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping("/comments/{reviewId}/{userId}")
    public ResponseEntity<CommentDTO> addComment(@PathVariable long reviewId, @PathVariable long userId, @RequestBody String content) {
        CommentDTO commentDTO = commentService.addComment(reviewId, userId, content);
        return ResponseEntity.ok(commentDTO);
    }

    @GetMapping("/reviews/{reviewId}/comments")
    public ResponseEntity<List<CommentDTO>> getCommentsByReview(@PathVariable long reviewId) {
        List<CommentDTO> comments = commentService.getCommentsForReview(reviewId);
        return ResponseEntity.ok(comments);
    }

    @GetMapping("/comments/{commentId}")
    public ResponseEntity<CommentDTO> getCommentById(@PathVariable long commentId) {
        CommentDTO commentDTO = commentService.getCommentById(commentId);
        return ResponseEntity.ok(commentDTO);
    }
}
