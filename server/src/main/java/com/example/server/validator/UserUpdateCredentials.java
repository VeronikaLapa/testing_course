package com.example.server.validator;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

public class UserUpdateCredentials {
    @Size(min = 3, max = 16)
    @Pattern(regexp = "[a-zA-Z0-9]+", message = "In login expected Latin letters and numbers")
    private String login;

    @Size(min = 1, max = 64)
    private String password;

    @Email(message = "Wrong email format")
    private String email;

    @Pattern(regexp = "[a-zA-Z0-9]+", message = "In name expected Latin letters and numbers")
    @Size(min = 3, max = 16)
    private String name;

    private String confpassword;

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getConfpassword() {
        return confpassword;
    }

    public void setConfpassword(String confpassword) {
        this.confpassword = confpassword;
    }
}
