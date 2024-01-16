package com.incedo.capstone.smartinventory.controllers;

import com.incedo.capstone.smartinventory.dto.OutwardsDTO;
import com.incedo.capstone.smartinventory.entities.Outwards;
import com.incedo.capstone.smartinventory.exceptions.OutwardsNotFoundException;
import com.incedo.capstone.smartinventory.services.OutwardsService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class OutwardsController {

    @Autowired
    OutwardsService outwardsService;

    @PostMapping("/outwards/addOutwards")
    @Operation(summary = "add Outwards here")
    public ResponseEntity<String> addOutwards(@RequestBody Outwards outwards)
    {
        String message = outwardsService.addOutwards(outwards);

        ResponseEntity<String> re = new ResponseEntity<>(message, HttpStatus.CREATED);
        return re;
    }

    @PutMapping("/outwards/putByOutwardsId/{outwardsId}")
    @Operation(summary = "Update outwards here")
    public ResponseEntity<Object> UpdateById(@PathVariable("outwardsId") long outwardsId, @RequestBody OutwardsDTO outwardsDto)
    {
        try{
            OutwardsDTO updateOutwards = outwardsService.updateById(outwardsId, outwardsDto);
            return new ResponseEntity<>(updateOutwards, HttpStatus.OK);
        }
        catch (OutwardsNotFoundException onfe)
        {
            return new ResponseEntity<>(onfe.getMessage(),HttpStatus.BAD_REQUEST);
        }
        catch(Exception e)
        {
            return new ResponseEntity<>("An error occurred while updating the user.",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/outwards/getAllOutwards")
    @Operation(summary = "Fetch all Outwrads")
    public List<OutwardsDTO> fetchOutwards()
    {
        return outwardsService.fetchOutwards();
    }


    @GetMapping("/outwards/getOutwardsById/{outwardsId}")
    @Operation(summary = "Fetch by Id")
    public ResponseEntity<Object> getOutwardsById(@PathVariable("outwardsId") long outwardsId)
    {
        try{
            OutwardsDTO outwardsDTO = outwardsService.fetchById(outwardsId);
            return new ResponseEntity<>(outwardsDTO,HttpStatus.OK);

        }
        catch(OutwardsNotFoundException onfe) {
            return new ResponseEntity<>(onfe.getMessage(), HttpStatus.NOT_FOUND);
        }

    }

    @DeleteMapping("outwards/deleteById/{outwardsId}")
    @Operation(summary = "Delete Outwards here")
    public ResponseEntity<String> deleteById(@PathVariable("outwardsId") long outwardsId )
    {
        try{
            String message = outwardsService.deleteById(outwardsId);
            return new ResponseEntity<>(message,HttpStatus.OK);
        }
        catch (OutwardsNotFoundException onfe)
        {
            return new ResponseEntity<>(onfe.getMessage(),HttpStatus.NOT_FOUND);
        }
    }



    }


