package com.ozius.internship.project.service;

import com.ozius.internship.project.dto.UserAccountDto;
import com.ozius.internship.project.entity.user.UserAccount;
import com.ozius.internship.project.entity.user.UserStatus;
import com.ozius.internship.project.repository.UserAccountRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    public final UserAccountRepository userAccountRepository;
    public final ModelMapper modelMapper;

    public UserService(UserAccountRepository userAccountRepository, ModelMapper modelMapper) {
        this.userAccountRepository = userAccountRepository;
        this.modelMapper = modelMapper;
    }

    public void saveUser(UserAccount user) {
        user.setUserStatus(UserStatus.ONLINE);
        userAccountRepository.save(user);
    }

    public void disconnect(UserAccount user) {
        UserAccount userAccount = userAccountRepository.findById(user.getId()).orElse(null);
        if (userAccount != null) {
            userAccount.setUserStatus(UserStatus.OFFLINE);
            userAccountRepository.save(userAccount);
        }
    }

    public List<UserAccount> findConnectedUsers() {

        return userAccountRepository.findAllByUserStatus(UserStatus.ONLINE);
    }

    public List<UserAccountDto> getAllUsers() {
        List<UserAccount> userAccounts =  userAccountRepository.findAll();
        return userAccounts.stream()
                .map(acc -> modelMapper.map(acc, UserAccountDto.class))
                .collect(Collectors.toList());
    }

}

