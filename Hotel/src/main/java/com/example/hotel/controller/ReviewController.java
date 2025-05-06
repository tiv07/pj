package com.example.hotel.controller;

import com.example.hotel.model.User;
import com.example.hotel.service.ReviewService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping("/add")
    public String addReview(@RequestParam String hotelId,
                            @RequestParam int rating,
                            @RequestParam String comment,
                            HttpSession session) {
        User user = (User) session.getAttribute("user");

        if (user != null) {
            reviewService.addReview(hotelId, user.getId(), rating, comment);
        }

        return "redirect:/hotels/" + hotelId;
    }
}
