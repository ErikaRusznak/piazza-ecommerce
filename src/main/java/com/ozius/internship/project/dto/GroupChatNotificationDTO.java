package com.ozius.internship.project.dto;

import com.ozius.internship.project.entity.user.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GroupChatNotificationDTO {
    private long id;
    private String content;
    private long buyerId;
    private long courierId;
    private long sellerId;
    private UserRole senderRole;
}
