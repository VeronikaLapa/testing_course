package com.example.server;

import com.example.server.controller.JwtController;
import com.example.server.domain.User;
import com.example.server.interceptor.AuthorizationInterceptor;
import com.example.server.service.JwtService;
import com.example.server.service.UserService;
import com.example.server.validator.UserCredentials;
import com.example.server.validator.UserCredentialsValidator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.BDDMockito.given;

@WebMvcTest
public class JwtControllerComponentTest {

    @MockBean
    JwtService service;

    @MockBean
    UserService userService;

    @MockBean
    AuthorizationInterceptor authorizationInterceptor;

    @MockBean
    UserCredentialsValidator userCredentialsValidator;

    @Autowired
    JwtController controller;

    @Test
    public void testGreeting() {
        User user = new User();
        user.setId(1);
        user.setLogin("Login");
        user.setPassword("Pass");

        given(this.userService.findByLoginAndPassword("Login", "Pass")).willReturn(Optional.of(user));
        given(this.service.create(user)).willReturn("My token");
        Map res = controller.auth("Login", "Pass");

        assertEquals(res.get("token"), "My token");
    }
}
