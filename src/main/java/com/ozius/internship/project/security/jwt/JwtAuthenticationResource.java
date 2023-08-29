package com.ozius.internship.project.security.jwt;

import com.ozius.internship.project.security.user.DatabaseUserDetailsService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.stream.Collectors;

@RestController
public class JwtAuthenticationResource {

    private final JwtEncoder jwtEncoder;
    private final AuthenticationManager authenticationManager;

    private final DatabaseUserDetailsService databaseUserDetailsService;

    public JwtAuthenticationResource(JwtEncoder jwtEncoder, AuthenticationManager authenticationManager, DatabaseUserDetailsService databaseUserDetailsService) {
        this.jwtEncoder = jwtEncoder;
        this.authenticationManager = authenticationManager;
        this.databaseUserDetailsService = databaseUserDetailsService;
    }

    @PostMapping("/authenticate")
    public JwtTokenResponse authenticate(@RequestBody JwtTokenRequest jwtTokenRequest){

//        UserDetails userDetails = databaseUserDetailsService.loadUserByUsername(jwtTokenRequest.username()); //not needed, just for future to create scopes

        var authenticationToken =
                new UsernamePasswordAuthenticationToken(
                        jwtTokenRequest.username(),
                        jwtTokenRequest.password());

        var authentication =
                authenticationManager.authenticate(authenticationToken);

        return new JwtTokenResponse(createToken(authentication));
    }

    private String createToken(Authentication authentication) {
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(Instant.now())
                .expiresAt(Instant.now().plusSeconds(60*30))
                .subject(authentication.getName())
                .claim("scope", createScope(authentication))
                .build();

        return jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }

    private String createScope(Authentication authentication) {
        return authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.joining(" "));
    }
}

