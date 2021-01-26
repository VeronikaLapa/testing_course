package com.example.server;

import com.example.server.controller.JwtController;
import com.example.server.domain.User;
import com.example.server.interceptor.AuthorizationInterceptor;
import com.example.server.repository.UserRepository;
import com.example.server.service.JwtService;
import com.example.server.service.UserService;
import com.example.server.validator.UserCredentials;
import com.example.server.validator.UserCredentialsValidator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.restdocs.RestDocumentationContextProvider;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.hamcrest.CoreMatchers.containsString;
import static org.mockito.Mockito.mock;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.documentationConfiguration;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.BDDMockito.given;

@WebMvcTest(value=JwtController.class)
@ExtendWith({RestDocumentationExtension.class, SpringExtension.class})
@AutoConfigureRestDocs(outputDir = "target/snippets")
public class JwtControllerComponentTest {
    @BeforeEach
    public void setUp(WebApplicationContext webApplicationContext,
                      RestDocumentationContextProvider restDocumentation) {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext)
                .apply(documentationConfiguration(restDocumentation))
                .build();
    }
    @Autowired
    private MockMvc mockMvc;

    @Configuration
    @Import(JwtController.class)
    static class TestConfig {
        @Bean
        UserRepository userRepository() {
            return mock(UserRepository.class);
        }
    }

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
    @Test
    public void testBadLogin() throws Exception {
        this.mockMvc.perform(get("/api/jwt?login=\"Login\"&password=\"Pass\"")).andDo(print())
                .andExpect(status().isBadRequest())
                .andDo(document("login"));
    }
}
