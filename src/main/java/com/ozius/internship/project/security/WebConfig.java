package com.ozius.internship.project.security;

import com.ozius.internship.project.security.jwt.FusedClaimConverter;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableMethodSecurity(jsr250Enabled = true, securedEnabled = true)
public class WebConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        return http
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(AntPathRequestMatcher.antMatcher("/")).permitAll()
                        .requestMatchers(AntPathRequestMatcher.antMatcher("/authenticate")).permitAll()
                        .requestMatchers(AntPathRequestMatcher.antMatcher("/register-client")).permitAll()
                        .requestMatchers(AntPathRequestMatcher.antMatcher("/register-seller")).permitAll()
                        .requestMatchers(AntPathRequestMatcher.antMatcher("/register-courier")).permitAll()
                        .requestMatchers(AntPathRequestMatcher.antMatcher("/images/**")).permitAll()
                        .requestMatchers(AntPathRequestMatcher.antMatcher("/api/categories/**")).permitAll()
                        .requestMatchers(AntPathRequestMatcher.antMatcher("/api/products/**")).permitAll()
                        .requestMatchers(AntPathRequestMatcher.antMatcher("/api/cities")).permitAll()
                        .requestMatchers(AntPathRequestMatcher.antMatcher("/products-test")).permitAll()
                        .requestMatchers(AntPathRequestMatcher.antMatcher("/api/reviews/**")).permitAll()
                        .requestMatchers(AntPathRequestMatcher.antMatcher("/api/seller/**")).permitAll()
                        .requestMatchers(AntPathRequestMatcher.antMatcher("/api/sellerAlias/**")).permitAll()
                        .requestMatchers(AntPathRequestMatcher.antMatcher("/api/sellers/**")).permitAll()
                        .requestMatchers(AntPathRequestMatcher.antMatcher("/api/users/**")).permitAll()
                        .requestMatchers(AntPathRequestMatcher.antMatcher("/ws/**")).permitAll()
                        .requestMatchers(AntPathRequestMatcher.antMatcher("/ws")).permitAll()
                        .requestMatchers(AntPathRequestMatcher.antMatcher("/ws/info")).permitAll()
                        .requestMatchers(AntPathRequestMatcher.antMatcher("/ws/info/**")).permitAll()
                        .requestMatchers(AntPathRequestMatcher.antMatcher("/api/forgot-password/**")).permitAll()
                        .requestMatchers(AntPathRequestMatcher.antMatcher("/api/users/reset-password")).permitAll()
                        .requestMatchers(AntPathRequestMatcher.antMatcher("/api/seller-request")).permitAll()
                        .requestMatchers(AntPathRequestMatcher.antMatcher(HttpMethod.OPTIONS, "/**")).permitAll()
                        .requestMatchers(PathRequest.toH2Console()).permitAll()
                        .anyRequest().authenticated()
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .httpBasic(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable)
                .csrf(AbstractHttpConfigurer::disable)
                .headers(header -> header
                        .frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin)
                )
                .oauth2ResourceServer(oauth -> oauth
                        .jwt(jwt -> jwt
                                .jwtAuthenticationConverter(new FusedClaimConverter())
                        )
                )
                .build();
    }

}
