package com.incedo.capstone.smartinventory.exceptions;

public class IncorrectPasswordException extends RuntimeException{

    public IncorrectPasswordException(String ipe)
    {
        super(ipe);
    }
}
