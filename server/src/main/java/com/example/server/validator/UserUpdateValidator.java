package com.example.server.validator;

import com.example.server.domain.User;
import com.example.server.service.UserService;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class UserUpdateValidator implements Validator {
    private final UserService userService;

    public UserUpdateValidator(UserService userService) {
        this.userService = userService;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return UserUpdateCredentials.class.equals(clazz) || User.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {

        if (!errors.hasErrors()) {
            UserUpdateCredentials  updateForm = (UserUpdateCredentials) target;
            if (!userService.isLoginVacant(updateForm.getLogin())) {
                errors.rejectValue("login", "login.is.in.use", "login is in use");
            }
            if (updateForm.getPassword() != null && !updateForm.getPassword().equals(updateForm.getConfpassword())) {
                errors.rejectValue("confpassword", "wrong.confirm.password", "wrong confirm password");
            }
        }
    }
}
