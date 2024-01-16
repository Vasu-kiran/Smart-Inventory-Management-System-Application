package com.incedo.capstone.smartinventory.controllers;

import com.incedo.capstone.smartinventory.dto.InwardsDTO;
import com.incedo.capstone.smartinventory.entities.Inwards;
import com.incedo.capstone.smartinventory.exceptions.InwardsCreationException;
import com.incedo.capstone.smartinventory.exceptions.InwardsNotFoundException;
import com.incedo.capstone.smartinventory.services.InwardsService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.event.HyperlinkEvent;
import java.util.List;

@RestController
public class InwardsController {

    @Autowired
    InwardsService inwardsService;

    @PostMapping("/inwards/addInwards")
    @Operation(summary = "add inwards here")
    public ResponseEntity<String> addInwards(@RequestBody Inwards inwards)
    {
        String message = inwardsService.addInwards(inwards);

        ResponseEntity<String> re = new ResponseEntity<>(message, HttpStatus.CREATED);
        return re;
    }

    @PutMapping("/inwards/putByinwardsId/{inwardsId}")
    @Operation(summary = "Update inwards here")
    public ResponseEntity<Object> updateInwardsById(@PathVariable ("inwardsId") long inwardsId, @RequestBody InwardsDTO inwardsDto)
    {
        try{
            InwardsDTO updatedInwardsDto = inwardsService.updateInwards(inwardsId, inwardsDto);
            return new ResponseEntity<>(updatedInwardsDto,HttpStatus.OK);
        }
        catch (InwardsNotFoundException infe)
        {
            return new ResponseEntity<>(infe.getMessage(), HttpStatus.NOT_FOUND);
        }
        catch (Exception e)
        {
            return new ResponseEntity<>("An error occurred while updating the Inwards.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/inwards/getAllInwards")
    @Operation(summary = "Fetch all inwards")
    public List<InwardsDTO> fetchInwards()
    {
        return inwardsService.fetchInwards();
    }



    @GetMapping("inwards/getById/{inwardsId}")
    @Operation(summary = "Fetch Inwarsds by ID")
    public ResponseEntity<Object> getInwardsbyId(@PathVariable("inwardsId") long inwardsId)
    {
        try{
            InwardsDTO inwardsDto = inwardsService.fetchInwardsById(inwardsId);
            return new ResponseEntity<>(inwardsDto,HttpStatus.OK);
        }
        catch (InwardsNotFoundException infe)
        {
            return new ResponseEntity<>(infe.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("inwards/deleteById/{inwardsId}")
    @Operation(summary = "delete Inwards by Inwards Id")
    public ResponseEntity<String> deleteByInwardsId(@PathVariable("inwardsId") long inwardsId)
    {
        try{
            String message= inwardsService.deleteById(inwardsId);
            return new ResponseEntity<>(message, HttpStatus.OK);
        }
        catch(InwardsNotFoundException infe)
        {
            return new ResponseEntity<>(infe.getMessage(), HttpStatus.OK);
        }
    }

}
