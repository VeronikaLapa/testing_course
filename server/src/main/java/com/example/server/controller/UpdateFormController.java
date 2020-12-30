package com.example.server.controller;

import com.example.server.domain.User;
import com.example.server.exception.ValidationException;
import com.example.server.service.UserService;
import com.example.server.validator.UserUpdateCredentials;
import com.example.server.validator.UserUpdateValidator;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UpdateFormController extends ApiController {

    private UserService userService;

    private final UserUpdateValidator userUpdateValidator;

    @InitBinder
    public void initUpdateFormBinder(WebDataBinder binder) {
        binder.addValidators(userUpdateValidator);
    }

    public UpdateFormController(UserService userService, UserUpdateValidator userUpdateValidator) {
        this.userService = userService;
        this.userUpdateValidator = userUpdateValidator;
    }

    @PostMapping("update")
    public User create(User user, @Valid @RequestBody UserUpdateCredentials userCredentials,
                       BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new ValidationException(bindingResult.getAllErrors().get(0).getDefaultMessage());
        }

        return userService.update(userCredentials, user);
    }

}