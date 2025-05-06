package com.example.hotel.service;

import com.example.hotel.model.Hotel;
import com.example.hotel.model.Room;
import com.example.hotel.repository.HotelRepository;
import com.example.hotel.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HotelService {

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private RoomRepository roomRepository;

    public List<Hotel> getAllHotels() {
        return hotelRepository.findAll();
    }

    public Hotel getHotelById(String id) {
        return hotelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hotel not found"));
    }

    public List<Hotel> searchHotels(String keyword) {
        return hotelRepository.findByNameContainingIgnoreCase(keyword);
    }

    public List<Room> getRoomsByHotelId(String hotelId) {
        return roomRepository.findByHotelId(hotelId);
    }
}
