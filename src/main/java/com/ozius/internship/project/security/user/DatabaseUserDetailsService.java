package com.ozius.internship.project.security.user;

import com.ozius.internship.project.entity.user.UserAccount;
import com.ozius.internship.project.repository.UserAccountRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class DatabaseUserDetailsService implements UserDetailsService {

    private final UserAccountRepository userAccountRepository;
    private final ClientDetailsMapper userDetailsMapper;

    public DatabaseUserDetailsService(UserAccountRepository userAccountRepository, ClientDetailsMapper clientDetailsMapper) {
        this.userAccountRepository = userAccountRepository;
        this.userDetailsMapper = clientDetailsMapper;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserAccount userAccount = userAccountRepository.findByEmail(email);
        return userDetailsMapper.toUserDetails(userAccount);
    }
}
