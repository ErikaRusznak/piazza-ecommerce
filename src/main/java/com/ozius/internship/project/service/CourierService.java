package com.ozius.internship.project.service;

import com.ozius.internship.project.dto.CourierDTO;
import com.ozius.internship.project.entity.courier.Courier;
import com.ozius.internship.project.repository.CourierRepository;
import com.ozius.internship.project.repository.UserAccountRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class CourierService {

    private final CourierRepository courierRepository;
    private final UserAccountRepository userAccountRepository;
    private final ModelMapper modelMapper;

    public CourierService(CourierRepository courierRepository, UserAccountRepository userAccountRepository, ModelMapper modelMapper) {
        this.courierRepository = courierRepository;
        this.userAccountRepository = userAccountRepository;
        this.modelMapper = modelMapper;
    }

    @Transactional
    public CourierDTO getCourierByEmailDTO(String email) {
        long userId = userAccountRepository.findByEmail(email).getId();
        Courier courier = courierRepository.findCouriersByAccount_Id(userId);
        return modelMapper.map(courier, CourierDTO.class);
    }
}
