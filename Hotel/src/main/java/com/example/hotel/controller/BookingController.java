package com.example.hotel.controller;

import com.example.hotel.model.Booking;
import com.example.hotel.model.User;
import com.example.hotel.service.BookingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Controller
@RequestMapping("/bookings")
public class BookingController {

    private static final Logger logger = LoggerFactory.getLogger(BookingController.class);

    @Autowired
    private BookingService bookingService;

    // View all bookings for the logged-in user
    @GetMapping
    public String viewBookings(HttpSession session, Model model) {
        User user = (User) session.getAttribute("user");
        if (user == null) {
            logger.error("No user found in session");
            return "redirect:/login";
        }

        List<Booking> bookings = bookingService.getBookingsByUserId(user.getId());
        if (bookings.isEmpty()) {
            logger.info("No bookings found for user with ID: {}", user.getId());
        }
        model.addAttribute("bookings", bookings);
        return "bookings";
    }

    @GetMapping("/{id}")
    @ResponseBody
    public ResponseEntity<?> getBookingById(@PathVariable String id) {
        Optional<Booking> booking = bookingService.getBookingById(id);
        if (booking.isPresent()) {
            return ResponseEntity.ok(booking.get());
        } else {
            logger.warn("Booking not found with ID: {}", id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Booking not found"));
        }
    }

    @PostMapping("/book")
    @ResponseBody
    public ResponseEntity<?> bookRoom(
            @RequestParam String roomId,
            @RequestParam String checkIn,
            @RequestParam String checkOut,
            @RequestParam int guests,
            HttpSession session) {

        User user = (User) session.getAttribute("user");
        if (user == null) {
            logger.error("No user found in session");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "User not logged in."));
        }

        try {
            LocalDate checkInDate = LocalDate.parse(checkIn);
            LocalDate checkOutDate = LocalDate.parse(checkOut);

            // Validate dates
            if (checkInDate.isAfter(checkOutDate)) {
                logger.error("Check-in date is after check-out date");
                return ResponseEntity.badRequest().body(Map.of("error", "Check-in date cannot be after check-out date."));
            }

            // Validate guests
            if (guests <= 0) {
                logger.error("Invalid guest count: {}", guests);
                return ResponseEntity.badRequest().body(Map.of("error", "Number of guests must be greater than 0."));
            }

            // Create booking
            Booking booking = bookingService.bookRoom(user.getId(), roomId, checkInDate, checkOutDate, guests);
            logger.info("Booking created for user {} with room ID: {}", user.getId(), roomId);
            return ResponseEntity.ok(Map.of("bookingId", booking.getId()));

        } catch (Exception e) {
            logger.error("Error during booking process", e);
            return ResponseEntity.internalServerError().body(Map.of("error", "An error occurred during the booking process."));
        }
    }

    // Confirm payment for a booking
    @PostMapping("/confirm/{id}")
    public String confirmPayment(@PathVariable String id, Model model) {
        Optional<Booking> booking = bookingService.getBookingById(id);
        if (booking.isPresent()) {
            bookingService.confirmPayment(id);
            logger.info("Payment confirmed for booking ID: {}", id);
        } else {
            logger.error("Booking not found for confirmation: {}", id);
            model.addAttribute("error", "Booking not found.");
        }
        return "redirect:/bookings"; // Redirect back to bookings list
    }

    // API endpoint to fetch bookings for the user
    @GetMapping("/user")
    @ResponseBody
    public ResponseEntity<?> getUserBookings(HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user == null) {
            logger.error("No user found in session");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "User not logged in."));
        }

        List<Booking> bookings = bookingService.getBookingsByUserId(user.getId());
        if (bookings.isEmpty()) {
            logger.info("No bookings found for user with ID: {}", user.getId());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "No bookings found"));
        }
        return ResponseEntity.ok(bookings);
    }
}
