package com.incedo.capstone.smartinventory.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {


    @ExceptionHandler(UserCreationException.class)
    public ResponseEntity<String> handlingException(UserCreationException uce)
    {
        ResponseEntity<String> re = new ResponseEntity<>(uce.getMessage(), HttpStatus.BAD_REQUEST);
        return re;
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<String> handlingException(UserNotFoundException unfe)
    {
        ResponseEntity<String> re = new ResponseEntity<>(unfe.getMessage(), HttpStatus.NOT_FOUND);
        return re;
    }

    @ExceptionHandler(IncorrectPasswordException.class)
    public ResponseEntity<String> handlingException(IncorrectPasswordException ipe)
    {
        ResponseEntity<String> re = new ResponseEntity<>(ipe.getMessage(), HttpStatus.UNAUTHORIZED);
        return re;
    }

    @ExceptionHandler(GodownCreationException.class)
    public ResponseEntity<String> handlingException(GodownCreationException gce)
    {
        ResponseEntity<String> re = new ResponseEntity<>(gce.getMessage(), HttpStatus.BAD_REQUEST);
        return re;
    }

    @ExceptionHandler(GodownNotFoundException.class)
    public ResponseEntity<String> handlingException(GodownNotFoundException gnfe)
    {
        ResponseEntity<String> re = new ResponseEntity<>(gnfe.getMessage(), HttpStatus.NOT_FOUND);
        return re;
    }

    @ExceptionHandler(InwardsCreationException.class)
    public ResponseEntity<String> handlingException(InwardsCreationException ice)
    {
        ResponseEntity<String> re = new ResponseEntity<>(ice.getMessage(), HttpStatus.BAD_REQUEST);
        return re;
    }

    @ExceptionHandler(InwardsNotFoundException.class)
    public ResponseEntity<String> handlingException(InwardsNotFoundException infe)
    {
        ResponseEntity<String> re = new ResponseEntity<>(infe.getMessage(), HttpStatus.NOT_FOUND);
        return re;
    }
    @ExceptionHandler(OutwardsCreationException.class)
    public ResponseEntity<String> handlingException(OutwardsCreationException oce)
    {
        ResponseEntity<String> re = new ResponseEntity<>(oce.getMessage(), HttpStatus.BAD_REQUEST);
        return re;
    }

    @ExceptionHandler(OutwardsNotFoundException.class)
    public ResponseEntity<String> handlingException(OutwardsNotFoundException onfe)
    {
        ResponseEntity<String> re = new ResponseEntity<>(onfe.getMessage(), HttpStatus.NOT_FOUND);
        return re;
    }

    @ExceptionHandler(ReturnsNotFoundException.class)
    public ResponseEntity<String> handlingException(ReturnsNotFoundException rnfe)
    {
        ResponseEntity<String> re = new ResponseEntity<>(rnfe.getMessage(), HttpStatus.NOT_FOUND);
        return re;
    }

}
