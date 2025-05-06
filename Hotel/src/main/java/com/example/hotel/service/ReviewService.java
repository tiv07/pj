package com.example.hotel.service;

import com.example.hotel.model.Review;
import com.example.hotel.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    public Review addReview(String hotelId, String userId, int rating, String comment) {
        Review review = new Review();
        review.setHotelId(hotelId);
        review.setUserId(userId);
        review.setRating(rating);
        review.setComment(comment);
        review.setTimestamp(LocalDateTime.now());
        return reviewRepository.save(review);
    }

    public List<Review> getReviewsByHotel(String hotelId) {
        return reviewRepository.findByHotelId(hotelId);
    }

    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }
}
