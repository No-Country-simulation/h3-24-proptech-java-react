package com.financial.config.security;

import com.financial.model.User;
import com.financial.repository.IUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;


@Configuration
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final IUserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository
                .findUserByEmail(email)
                .orElseThrow(
                        () -> new UsernameNotFoundException(String.format("User not found with email: %s.", email)));
    }
}
