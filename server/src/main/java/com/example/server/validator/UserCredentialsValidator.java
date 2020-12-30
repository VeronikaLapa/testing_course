package com.example.server.validator;

import com.example.server.service.UserService;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import javax.validation.ConstraintViolation;
import java.util.Set;

@Component
public class UserCredentialsValidator implements Validator {
    private final UserService userService;

    public UserCredentialsValidator(UserService userService) {
        this.userService = userService;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return UserCredentials.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {

        if (!errors.hasErrors()) {
            UserCredentials registerForm = (UserCredentials) target;
            if (!userService.isLoginVacant(registerForm.getLogin())) {
                errors.rejectValue("login", "login.is.in.use", "login is in use");
            }
            if (!registerForm.getPassword().equals(registerForm.getConfpassword())) {
                errors.rejectValue("confpassword", "wrong.confirm.password", "wrong confirm password");
            }
        }
    }
}
