package com.incedo.capstone.smartinventory.exceptions;

public class GodownNotFoundException extends RuntimeException{

    public GodownNotFoundException(String gnfe)
    {
        super(gnfe);
    }

}
