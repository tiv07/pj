package com.example.hotel.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "rooms")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Room {

    @Id
    private String id;

    private String hotelId;      // อ้างถึงโรงแรมที่ห้องนี้อยู่
    private String roomType;     // เช่น Standard, Deluxe
    private int capacity;        // ความจุคน
    private double price;        // ราคาต่อคืน
    private boolean available;   // ว่างหรือไม่

    public Room(String hotelId, String roomType, int capacity, double price, boolean available) {
        this.hotelId = hotelId;
        this.roomType = roomType;
        this.capacity = capacity;
        this.price = price;
        this.available = available;
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

    public String getRoomType() {
        return roomType;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    @Override
    public String toString() {
        return "Room{"
                + "id='" + id + '\''
                + ", hotelId='" + hotelId + '\''
                + ", roomType='" + roomType + '\''
                + ", capacity=" + capacity
                + ", price=" + price
                + ", available=" + available
                + '}';
    }
}
