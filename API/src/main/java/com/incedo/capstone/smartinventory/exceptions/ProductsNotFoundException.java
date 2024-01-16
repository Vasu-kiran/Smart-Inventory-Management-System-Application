package com.incedo.capstone.smartinventory.exceptions;

public class ProductsNotFoundException extends RuntimeException {
    public ProductsNotFoundException(String infe)
    {
        super(infe);
    }
}

