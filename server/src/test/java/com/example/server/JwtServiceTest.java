package com.example.server;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.server.domain.User;
import com.example.server.repository.UserRepository;
import com.example.server.service.JwtService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;

@SpringBootTest
public class JwtServiceTest {
    @Configuration
    @Import(JwtService.class)
    static class TestConfig {
        @Bean
        UserRepository userRepository() {
            return mock(UserRepository.class);
        }
    }
    //Я понимаю, что приватные константы нельзя вставлять в другие классы.
    //Сделано исключительно с целью создания теста

    static String SECRET = "JwtSecret";

    @Test
    public void testGetJwt() {
        //given
        JwtService jwtService = new JwtService(null);

        User user = new User();
        user.setId(10);
        user.setName("tom");
        user.setEmail("fake");
        String token = jwtService.create(user);
        Algorithm algorithm = Algorithm.HMAC256(SECRET);
        assertEquals(token, JWT.create()
                .withClaim("userId", 10)
                .sign(algorithm));
    }


    @ParameterizedTest
    @ValueSource(ints = { 0, 1, 100, 100500})
    public void testJwt(int id) {
        JwtService jwtService = new JwtService(null);

        User user = new User();
        user.setId(id);
        user.setName("tom");
        user.setEmail("fake");
        String token = jwtService.create(user);
        Algorithm algorithm = Algorithm.HMAC256(SECRET);
        assertEquals(token, JWT.create()
                .withClaim("userId", id)
                .sign(algorithm));
    }
}
