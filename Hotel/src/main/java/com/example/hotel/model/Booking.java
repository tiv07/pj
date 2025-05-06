package com.example.hotel.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "bookings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {

    @Id
    private String id;

    private String userId;   // อ้างถึงผู้จอง
    private String roomId;   // อ้างถึงห้องที่จอง

    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private int numberOfGuests;

    private boolean paymentStatus; // true = จ่ายแล้ว, false = ยังไม่จ่าย

    public Booking(String userId, String roomId, LocalDate checkInDate, LocalDate checkOutDate, int numberOfGuests, boolean paymentStatus) {
        this.userId = userId;
        this.roomId = roomId;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.numberOfGuests = numberOfGuests;
        this.paymentStatus = paymentStatus;
    }

    public Booking(String userId, String roomId, LocalDate checkInDate, LocalDate checkOutDate, int numberOfGuests) {
        this.userId = userId;
        this.roomId = roomId;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.numberOfGuests = numberOfGuests;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getRoomId() {
        return roomId;
    }

    public void setRoomId(String roomId) {
        this.roomId = roomId;
    }

    public LocalDate getCheckInDate() {
        return checkInDate;
    }

    public void setCheckInDate(LocalDate checkInDate) {
        this.checkInDate = checkInDate;
    }

    public LocalDate getCheckOutDate() {
        return checkOutDate;
    }

    public void setCheckOutDate(LocalDate checkOutDate) {
        this.checkOutDate = checkOutDate;
    }

    public int getNumberOfGuests() {
        return numberOfGuests;
    }

    public void setNumberOfGuests(int numberOfGuests) {
        this.numberOfGuests = numberOfGuests;
    }

    public boolean isPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(boolean paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public void setCheckIn(LocalDate checkIn) {
        this.checkInDate = checkIn;
    }

    public void setCheckOut(LocalDate checkOut) {
        this.checkOutDate = checkOut;
    }

    public void setGuests(int guest) {
        this.numberOfGuests = guest;
    }

    public void setPaid(boolean payment) {
        this.paymentStatus = payment;
    }

}
