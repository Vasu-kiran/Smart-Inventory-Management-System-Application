package com.incedo.capstone.smartinventory.exceptions;

import com.incedo.capstone.smartinventory.repository.GodownsRepository;

public class GodownCreationException extends RuntimeException{

    public GodownCreationException(String gce)
    {
        super(gce);
    }
}
