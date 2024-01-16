package com.incedo.capstone.smartinventory.controllers;


import com.incedo.capstone.smartinventory.dto.InwardsDTO;
import com.incedo.capstone.smartinventory.dto.ReturnsDTO;
import com.incedo.capstone.smartinventory.entities.Inwards;
import com.incedo.capstone.smartinventory.entities.Returns;
import com.incedo.capstone.smartinventory.exceptions.InwardsNotFoundException;
import com.incedo.capstone.smartinventory.exceptions.ReturnsNotFoundException;
import com.incedo.capstone.smartinventory.services.ReturnsService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ReturnsController {

    @Autowired
    ReturnsService returnsService;

    @GetMapping("/returns/getAllReturns")
    @Operation(summary = "Fetch all Returns")
    public List<ReturnsDTO> fetchReturns()
    {
        return returnsService.fetchReturns();
    }

    @GetMapping("/returns/getAllReturns2")
    @Operation(summary = "Fetch all Returns")
    public List<Returns> fetchReturns2()
    {
        return returnsService.fetchReturns2();
    }

    @GetMapping("returns/getById/{returnsId}")
    @Operation(summary = "Fetch Returns by ID")
    public ResponseEntity<Object> getReturnsbyId(@PathVariable("returnsId") long returnsId)
    {
        try{
            ReturnsDTO returnsDto = returnsService.fetchReturnsById(returnsId);
            return new ResponseEntity<>(returnsDto, HttpStatus.OK);
        }
        catch (ReturnsNotFoundException rnfe)
        {
            return new ResponseEntity<>(rnfe.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/returns/addReturns")
    @Operation(summary = "add Returns here")
    public ResponseEntity<String> addReturns(@RequestBody Returns returns) {
        try {
            String resultMessage = returnsService.addReturn(returns);
            // If added successfully, return a success response
            return new ResponseEntity<>(resultMessage, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            // If an error occurs, return an error response
            return new ResponseEntity<>("Error: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }


    @PutMapping("/returns/updateReturns/{returnsId}")
    @Operation(summary = "update Returns here")
    public ResponseEntity<Object> updateReturnsById(@PathVariable ("returnsId") long returnsId, @RequestBody ReturnsDTO returnsDTO){
        try{
            ReturnsDTO updatedReturnsDTO = returnsService.updateReturns(returnsId, returnsDTO);
            return new ResponseEntity<>(updatedReturnsDTO,HttpStatus.OK);
        }
        catch (ReturnsNotFoundException rnfe)
        {
            return new ResponseEntity<>(rnfe.getMessage(), HttpStatus.NOT_FOUND);
        }
        catch (Exception e)
        {
            return new ResponseEntity<>("An error occurred while updating the Returns.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("returns/deleteById/{returnsId}")
    @Operation(summary = "delete Returns by Returns Id")
    public ResponseEntity<String> deleteByReturnsId(@PathVariable("returnsId") long returnsId)
    {
        try{
            String message= returnsService.deleteById(returnsId);
            return new ResponseEntity<>(message, HttpStatus.OK);
        }
        catch(InwardsNotFoundException rnfe)
        {
            return new ResponseEntity<>(rnfe.getMessage(), HttpStatus.OK);
        }
    }

}
