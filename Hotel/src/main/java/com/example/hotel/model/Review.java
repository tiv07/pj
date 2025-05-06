package com.example.hotel.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "reviews")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Review {

    @Id
    private String id;

    private String hotelId;   // อ้างถึงโรงแรม
    private String userId;    // ผู้เขียนรีวิว
    private int rating;       // 1-5 ดาว
    private String comment;   // ข้อความรีวิว
    private LocalDateTime timestamp;

    public Review(String hotelId, String userId, int rating, String comment) {
        this.hotelId = hotelId;
        this.userId = userId;
        this.rating = rating;
        this.comment = comment;
        this.timestamp = LocalDateTime.now();
    }

    public Review(String hotelId, String userId, int rating) {
        this.hotelId = hotelId;
        this.userId = userId;
        this.rating = rating;
        this.timestamp = LocalDateTime.now();
    }

    public Review(String hotelId, String userId, String comment) {
        this.hotelId = hotelId;
        this.userId = userId;
        this.comment = comment;
        this.timestamp = LocalDateTime.now();
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getHotelId() {
        return hotelId;
    }

    public void setHotelId(String hotelId) {
        this.hotelId = hotelId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

}
