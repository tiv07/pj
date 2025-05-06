package com.example.hotel.service;

import com.example.hotel.model.Booking;
import com.example.hotel.model.Room;
import com.example.hotel.repository.BookingRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private RoomService roomService;

    public Booking bookRoom(String userId, String roomId, LocalDate checkIn, LocalDate checkOut, int guests) {
        Booking booking = new Booking();
        booking.setUserId(userId);
        booking.setRoomId(roomId);
        booking.setCheckInDate(checkIn); // Use correct field names
        booking.setCheckOutDate(checkOut);
        booking.setNumberOfGuests(guests);
        booking.setPaymentStatus(false);

        return bookingRepository.save(booking);
    }

    public List<Booking> getBookingsByUserId(String userId) {
        return bookingRepository.findByUserId(userId);
    }

    public void confirmPayment(String bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setPaymentStatus(true);
        bookingRepository.save(booking);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Optional<Booking> getBookingById(String id) {
        return bookingRepository.findById(id);
    }

}
