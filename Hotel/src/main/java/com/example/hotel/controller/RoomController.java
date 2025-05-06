package com.example.hotel.controller;

import java.util.List;

import com.example.hotel.model.Room;
import com.example.hotel.service.RoomService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @GetMapping
    public List<Room> getAllRooms() {
        return roomService.getAllRooms();
    }

    @GetMapping("/{roomId}")
    public Room getRoomDetails(@PathVariable String roomId) {
        return roomService.getRoomById(roomId);
    }
}
