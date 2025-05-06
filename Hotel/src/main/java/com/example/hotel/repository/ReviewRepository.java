package com.example.hotel.repository;

import com.example.hotel.model.Review;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ReviewRepository extends MongoRepository<Review, String> {
    List<Review> findByHotelId(String hotelId);
}
