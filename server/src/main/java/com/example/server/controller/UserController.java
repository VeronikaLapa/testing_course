package com.example.server.controller;

import com.example.server.domain.User;
import com.example.server.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/api/users")
public class UserController extends ApiController {

    private UserService userService;


    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("authenticated")
    public User getAuthenticatedUser(User user) {
        return user;
    }


    @GetMapping("")
    public List getAllUsers(User user) {
        return userService.findAll(user);
    }

    @GetMapping("/filtered")
    public List getUsers(User user, @RequestParam String login, @RequestParam String name, @RequestParam String email) {
        List<User> users = getAllUsers(user);
        return users.
                stream().
                filter(usr -> login.equals("") || usr.getLogin().equals(login)).
                filter(usr -> name.equals("") || usr.getName().equals(name)).
                filter(usr -> email.equals("") || usr.getEmail().equals(email)).
                collect(Collectors.toList());
    }
}