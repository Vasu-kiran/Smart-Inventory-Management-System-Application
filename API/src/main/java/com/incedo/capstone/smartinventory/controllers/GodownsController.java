package com.incedo.capstone.smartinventory.controllers;

import com.incedo.capstone.smartinventory.dto.GodownsDTO;
import com.incedo.capstone.smartinventory.entities.Godowns;
import com.incedo.capstone.smartinventory.exceptions.GodownNotFoundException;
import com.incedo.capstone.smartinventory.services.GodownsService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.persistence.GeneratedValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class GodownsController {

    @Autowired
    GodownsService godownsService;



    @PostMapping("/godowns/addGodown")
    @Operation(summary = "Add godowns here")
    public ResponseEntity<String> addGodown(@RequestBody Godowns godown) {
        String message = godownsService.addGodown(godown);
        ResponseEntity<String> re = new ResponseEntity<>(message, HttpStatus.CREATED);
        return re;
    }

    @PutMapping("/godowns/{godownId}")
    @Operation(summary = "Update Godowns by id here")
    public ResponseEntity<Object> updateGodown(@PathVariable long godownId, @RequestBody GodownsDTO godownsDto) {
        try {
            GodownsDTO savedGodown = godownsService.updateGodown(godownId, godownsDto);
            return new ResponseEntity<>(savedGodown, HttpStatus.OK);
        } catch (GodownNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        catch (Exception e) {
            return new ResponseEntity<>("An error occurred while updating the user.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/godowns/changeStatus/{godownId}")
    @Operation(summary = "Change Status of the godown here")
    public ResponseEntity<String> changeStatus(@PathVariable("godownId") long godownId)
    {
        try{
            String message = godownsService.changeStatus(godownId);
            return new ResponseEntity<>(message,HttpStatus.OK);
        }
        catch (GodownNotFoundException gnfe)
        {
            return new ResponseEntity<>(gnfe.getMessage(),HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/godowns")
    @Operation(summary = "Fetches all Godowns")
    public List<GodownsDTO> fetchGodowns(){
        return godownsService.fetchGodowns();
    }

    @GetMapping("godowns/getByLocation/{location}")
    @Operation(summary = "Fetches Godowns by location")
    public ResponseEntity<Object> getByLocation(@PathVariable("location") String location)
    {
        try{
            List<GodownsDTO> godownsDto = godownsService.fetchByLocation(location);
            return new ResponseEntity<>(godownsDto,HttpStatus.OK);
        }
        catch (GodownNotFoundException gnfe)
        {
            return new ResponseEntity<>(gnfe.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("godowns/getById/{godownId}")
    @Operation(summary = "Fetches Godowns by Id")
    public ResponseEntity<Object> getById(@PathVariable("godownId") long godownId)
    {
        try{
            GodownsDTO godownsDto = godownsService.fetchById(godownId);
            return new ResponseEntity<>(godownsDto, HttpStatus.OK);
        }
        catch (GodownNotFoundException gnfe)
        {
            return new ResponseEntity<>(gnfe.getMessage(),HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/godowns/deleteById/{godownId}")
    @Operation(summary = "Delete Godowns here")
    public ResponseEntity<String> deleteById(@PathVariable("godownId") long godownId)
    {
        try{
            String message = godownsService.deleteById(godownId);
            return new ResponseEntity<>(message,HttpStatus.OK);
        }
        catch (GodownNotFoundException gnfe)
        {
            return new ResponseEntity<>(gnfe.getMessage(),HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping("/getAllGodowns")
    @Operation(summary = "Fetches all Godowns")
    public List<Godowns> fetchAllGodowns(){
        return godownsService.fetchGodowns2();
    }

}
