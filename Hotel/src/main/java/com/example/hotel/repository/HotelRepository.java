package com.example.hotel.repository;

import com.example.hotel.model.Hotel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface HotelRepository extends MongoRepository<Hotel, String> {
    List<Hotel> findByNameContainingIgnoreCase(String keyword); // ค้นหาด้วยชื่อ
}
