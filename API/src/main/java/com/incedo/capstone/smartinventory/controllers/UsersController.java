package com.incedo.capstone.smartinventory.controllers;

import com.incedo.capstone.smartinventory.dto.UsersDTO;
import com.incedo.capstone.smartinventory.entities.Users;
import com.incedo.capstone.smartinventory.exceptions.IncorrectPasswordException;
import com.incedo.capstone.smartinventory.exceptions.UserNotFoundException;
import com.incedo.capstone.smartinventory.services.UsersService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UsersController {
    @Autowired
    UsersService usersService;

    @PostMapping("/users/addUsers")
    @Operation(summary = "Add Customer Here")
    public ResponseEntity<String> addUser(@RequestBody Users user) {
        String message = usersService.addUser(user);

        ResponseEntity<String> re = new ResponseEntity<>(message, HttpStatus.CREATED);
            return re;
    }

    @PutMapping("/users/putByUserId/{userId}")
    @Operation(summary = "Update Customer Here")
    public ResponseEntity<Object> updateUserById(
            @PathVariable("userId") long userId,
            @RequestBody UsersDTO updatedUserDto) {

        try {
            UsersDTO updatedUser = usersService.updateUser(userId, updatedUserDto);
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        } catch (UserNotFoundException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred while updating the user.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @PutMapping("/users/changePassword/{userId}")
    @Operation(summary = "Update Customer Password Here")
    public ResponseEntity<String> changeUserPassword(@PathVariable long userId, @RequestBody String newPassword) {
        try {
            usersService.changePassword(userId, newPassword);
            return ResponseEntity.ok("User Password Updated");
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found with ID: " + userId);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating password");
        }
    }

    @GetMapping("/users/getAllUsers")
    @Operation(summary = "Fetch All Customers")
    public List<UsersDTO> fetchUsers()
    {
        return usersService.fetchUsers();
    }


    @GetMapping("/users/getByUsername/{username}")
    @Operation(summary = "Fetch Customer list  By Name")
    public ResponseEntity<Object> getUserByName(@PathVariable("username") String username) {
        try {
            List<UsersDTO> userDto = usersService.fetchUserByName(username);
            return new ResponseEntity<>(userDto, HttpStatus.OK);
        } catch (UserNotFoundException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/users/getByUserId/{userId}")
    @Operation(summary = "Get users by id")
    public ResponseEntity<Object> getuserById(@PathVariable("userId") long userId)
    {
        try{
            UsersDTO userDto = usersService.fetchById(userId);
            return new ResponseEntity<>(userDto, HttpStatus.OK);
        }
        catch(UserNotFoundException unfe){
            return new ResponseEntity<>(unfe.getMessage(), HttpStatus.NOT_FOUND);
    }
    }

    @DeleteMapping("/users/deleteUsersByUsername/{username}")
    @Operation(summary = "Delete Customer")
    public ResponseEntity<String> deleteUserByUsername(@PathVariable("username") String username) {
        try {
            String result = usersService.deleteUser(username);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (UserNotFoundException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred while deleting the user.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/users/authenticateUsers")
    @Operation(summary = "Authenticate Customer")
    public ResponseEntity<Object> authenticateUser(@RequestBody Users user) {
        try {
            UsersDTO authenticatedUser = usersService.authenticateUser(user);
            return new ResponseEntity<>(authenticatedUser, HttpStatus.OK);
        } catch (UserNotFoundException | IncorrectPasswordException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred while authenticating the user.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }




}
