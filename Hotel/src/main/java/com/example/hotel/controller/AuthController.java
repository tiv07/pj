package com.example.hotel.controller;

import com.example.hotel.model.User;
import com.example.hotel.service.AuthService;

import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class AuthController {

    @Autowired
    private AuthService authService;

    @GetMapping("/login")
    public String loginPage() {
        return "login"; // ต้องมี login.html อยู่ใน templates
    }

    @PostMapping("/login")
    @ResponseBody
    public ResponseEntity<?> loginUser(@RequestBody User user, HttpSession session) {
        return authService.authenticate(user.getUsername(), user.getPassword())
                .map(u -> {
                    session.setAttribute("user", u);
                    return ResponseEntity.ok("Login success");
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password"));
    }

    @GetMapping("/register")
    public String registerPage() {
        return "register"; // register.html
    }

    @PostMapping("/register")
    @ResponseBody
    public String registerUser(@RequestBody User user, Model model) {
        try {
            authService.registerUser(user.getUsername(), user.getPassword(), user.getEmail(), "USER");
            return "Registration successful";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @GetMapping("/api/auth/me")
    @ResponseBody
    public User currentUser(HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user == null) {
            throw new RuntimeException("User not authenticated");
        }
        return user;
    }

    @GetMapping("/auth/check")
    @ResponseBody
    public ResponseEntity<?> checkLogin(HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not logged in");
    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/login";
    }
}
