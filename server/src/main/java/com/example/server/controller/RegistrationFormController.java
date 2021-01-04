package com.example.server.controller;


import com.example.server.domain.User;
import com.example.server.exception.ValidationException;
import com.example.server.service.UserService;
import com.example.server.validator.UserCredentials;
import com.example.server.validator.UserCredentialsValidator;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class RegistrationFormController extends ApiController {

    private UserService userService;

    private final UserCredentialsValidator userCredentialsValidator;

    @InitBinder
    public void initRegisterFormBinder(WebDataBinder binder) {
        binder.addValidators(userCredentialsValidator);
    }

    public RegistrationFormController(UserService userService, UserCredentialsValidator userCredentialsValidator) {
        this.userService = userService;
        this.userCredentialsValidator = userCredentialsValidator;
    }

    @PostMapping("users")
    public User create(@Valid @RequestBody UserCredentials userCredentials,
                       BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new ValidationException(bindingResult.getAllErrors().get(0).getDefaultMessage());
        }
        return userService.create(userCredentials);
    }

}