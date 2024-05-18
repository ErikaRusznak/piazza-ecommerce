package com.ozius.internship.project;

import com.ozius.internship.project.entity.user.UserAccount;
import com.ozius.internship.project.entity.user.UserRole;
import com.ozius.internship.project.repository.UserAccountRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Configuration
@Component
public class AdminInitializer implements ApplicationRunner {

    private final UserAccountRepository userAccountRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${admin.firstName}")
    private String firstName;

    @Value("${admin.lastName}")
    private String lastName;

    @Value("${admin.email}")
    private String email;

    @Value("${admin.telephone}")
    private String telephone;

    @Value("${admin.password}")
    private String password;

    public AdminInitializer(UserAccountRepository userAccountRepository, PasswordEncoder passwordEncoder) {
        this.userAccountRepository = userAccountRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        UserAccount userAccount = userAccountRepository.findByEmail("erika.rusznak@gmail.com");
        if (userAccount == null) {
            UserAccount admin = new UserAccount(
                    firstName,
                    lastName,
                    email,
                    null,
                    telephone,
                    UserRole.ADMIN
            );
            admin.setInitialPassword(passwordEncoder.encode(password));
            userAccountRepository.save(admin);
        }
    }
}
