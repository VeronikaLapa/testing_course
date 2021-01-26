package com.example.server.controller;

import com.example.server.domain.User;
import com.example.server.exception.ValidationException;
import com.example.server.service.JwtService;
import com.example.server.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class JwtController extends ApiController {
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(ValidationException.class)
    public void handleConflict(HttpServletResponse response) throws IOException {
        response.sendError(400, "wrong name or password");
    }
    private final JwtService jwtService;

    private final UserService userService;

    public JwtController(JwtService jwtService, UserService userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }

    @GetMapping("jwt")
    public Map auth(@RequestParam String login, @RequestParam String password) {
        User user = userService.findByLoginAndPassword(login, password).orElseThrow(() -> new ValidationException("Wrong name or password"));
        Map<String, String> res = new HashMap<String, String>();
        res.put("token", jwtService.create(user));
        return res;
    }
}
