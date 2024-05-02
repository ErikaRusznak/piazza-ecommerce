package com.ozius.internship.project.controller;

import com.ozius.internship.project.dto.GroupChatDTO;
import com.ozius.internship.project.entity.chat.GroupChatRoom;
import com.ozius.internship.project.repository.GroupChatRoomRepository;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class GroupChatController {

    public final GroupChatRoomRepository groupChatRoomRepository;
    public final ModelMapper modelMapper;

    public GroupChatController(GroupChatRoomRepository groupChatRoomRepository, ModelMapper modelMapper) {
        this.groupChatRoomRepository = groupChatRoomRepository;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/group-chat/courier/{email}")
    public ResponseEntity<List<GroupChatDTO>> groupChatDTOSForCourier(@PathVariable String email) {
        List<GroupChatRoom> groupChatRooms = groupChatRoomRepository.findAllByCourierEmail(email);

        List<GroupChatDTO> groupChatDTOS = groupChatRooms.stream()
                .map(groupChatRoom -> modelMapper.map(groupChatRoom, GroupChatDTO.class))
                .toList();

        return ResponseEntity.ok(groupChatDTOS);
    }

    @GetMapping("/group-chat/buyer/{email}")
    public ResponseEntity<List<GroupChatDTO>> groupChatDTOSForBuyer(@PathVariable String email) {
        List<GroupChatRoom> groupChatRooms = groupChatRoomRepository.findAllByBuyerEmail(email);

        List<GroupChatDTO> groupChatDTOS = groupChatRooms.stream()
                .map(groupChatRoom -> modelMapper.map(groupChatRoom, GroupChatDTO.class))
                .toList();

        return ResponseEntity.ok(groupChatDTOS);
    }

    @GetMapping("/group-chat/seller/{email}")
    public ResponseEntity<List<GroupChatDTO>> groupChatDTOSForSeller(@PathVariable String email) {
        List<GroupChatRoom> groupChatRooms = groupChatRoomRepository.findAllBySellerEmail(email);

        List<GroupChatDTO> groupChatDTOS = groupChatRooms.stream()
                .map(groupChatRoom -> modelMapper.map(groupChatRoom, GroupChatDTO.class))
                .toList();

        return ResponseEntity.ok(groupChatDTOS);
    }

}
