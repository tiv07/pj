package com.example.hotel.controller;

import com.example.hotel.model.Hotel;
import com.example.hotel.model.Review;
import com.example.hotel.model.Room;
import com.example.hotel.service.HotelService;
import com.example.hotel.service.ReviewService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/hotels")
public class HotelController {

    @Autowired
    private HotelService hotelService;

    @Autowired
    private ReviewService reviewService;

    @GetMapping
    public String showHotels(@RequestParam(value = "keyword", required = false) String keyword, Model model, HttpSession session) {
        List<Hotel> hotels = (keyword != null && !keyword.isEmpty())
                ? hotelService.searchHotels(keyword)
                : hotelService.getAllHotels();

        model.addAttribute("hotels", hotels);
        model.addAttribute("user", session.getAttribute("user"));
        return "hotels"; // hotels.html
    }

    @GetMapping("/{hotelId}")
    public String viewHotel(@PathVariable String hotelId, Model model) {
        Hotel hotel = hotelService.getHotelById(hotelId);
        List<Room> rooms = hotelService.getRoomsByHotelId(hotelId);
        List<Review> reviews = reviewService.getReviewsByHotel(hotelId);

        model.addAttribute("hotel", hotel);
        model.addAttribute("rooms", rooms);
        model.addAttribute("reviews", reviews);
        return "hotel-details"; // คุณสามารถสร้าง html นี้เพิ่ม
    }
}
