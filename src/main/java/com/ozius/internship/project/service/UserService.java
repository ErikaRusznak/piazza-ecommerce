package com.ozius.internship.project.service;

import com.ozius.internship.project.entity.user.UserAccount;
import com.ozius.internship.project.entity.user.UserStatus;
import com.ozius.internship.project.repository.UserAccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

//    public final UserAccountRepository userAccountRepository;
//
//    public UserService(UserAccountRepository userAccountRepository) {
//        this.userAccountRepository = userAccountRepository;
//    }
//
//    public void saveUser(UserAccount user) {
//        user.setUserStatus(UserStatus.ONLINE);
//        userAccountRepository.save(user);
//    }
//
//    public void disconnect(UserAccount user) {
//        UserAccount userAccount = userAccountRepository.findById(user.getId()).orElse(null);
//        if (userAccount != null) {
//            userAccount.setUserStatus(UserStatus.OFFLINE);
//            userAccountRepository.save(userAccount);
//        }
//    }
//
//    public List<UserAccount> findConnectedUsers() {
//        return userAccountRepository.findAllByStatus(UserStatus.ONLINE);
//    }

}

