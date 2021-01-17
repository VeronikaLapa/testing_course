package com.example.server.service;


import com.example.server.domain.User;
import com.example.server.repository.UserRepository;
import com.example.server.validator.UserCredentials;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean isLoginVacant(String login) {
        return userRepository.countByLogin(login) == 0;
    }

    public Optional<User> findByLoginAndPassword(String login, String password) {
        return userRepository.findByLoginAndPassword(login, password);
    }

    public List findAll() {
        return userRepository.findAll();
    }

    public List findAll(User user) {
        return userRepository.findAll(String.valueOf(user.getId()));
    }


    public User create(UserCredentials userCredentials) {
        User user = new User();
        user.setLogin(userCredentials.getLogin());
        user.setName(userCredentials.getName());
        user.setPassword(userCredentials.getPassword());
        user.setEmail(userCredentials.getEmail());
        return userRepository.save(user);
    }
}

