package com.example.server;


import com.example.server.domain.User;
import com.example.server.interceptor.AuthorizationInterceptor;
import com.example.server.repository.UserRepository;
import com.example.server.service.JwtService;
import com.example.server.service.UserService;
import com.example.server.validator.UserCredentialsValidator;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Optional;

import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;

@Configuration
public class TestConfig {
    @Bean
    UserRepository userRepository() {
        return mock(UserRepository.class);
    }
    @MockBean
    JwtService service;

    @MockBean
    UserService userService;

    @MockBean
    AuthorizationInterceptor authorizationInterceptor;

    @MockBean
    UserCredentialsValidator userCredentialsValidator;


}
