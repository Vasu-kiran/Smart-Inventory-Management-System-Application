package com.incedo.capstone.smartinventory.controllers;

import com.incedo.capstone.smartinventory.dto.ProductsDTO;
import com.incedo.capstone.smartinventory.entities.Products;

import com.incedo.capstone.smartinventory.exceptions.ProductsNotFoundException;
import com.incedo.capstone.smartinventory.services.ProductsService;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProductsController {
    @Autowired
    ProductsService productsService;

    @PostMapping("products/addProducts")
    @Operation(summary="add products here")
    public ResponseEntity<Products> addProducts(@RequestBody Products products){
        Products addedProduct=productsService.addProduct(products);
        return new ResponseEntity<>(addedProduct,HttpStatus.CREATED);
    }

    @GetMapping("/products/getAllProducts")
    @Operation(summary = "Fetch all products")
    public List<ProductsDTO> getAllProducts()
    {
        return productsService.getAllProducts();
    }

    @GetMapping("products/getById/{productsId}")
    @Operation(summary = "Fetch Products by ID")
    public ResponseEntity<Object> getProductbyId(@PathVariable("productsId") long productId)
    {
        try{
            ProductsDTO productsDto = productsService.getProductById(productId);
            return new ResponseEntity<>(productsDto,HttpStatus.OK);
        }
        catch (ProductsNotFoundException infe)
        {
            return new ResponseEntity<>(infe.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("products/putByProductsId/{productId}")
    @Operation(summary = "Update products here")
    public ResponseEntity<Object> updatedProductsById(@PathVariable ("productId") long productsId, @RequestBody ProductsDTO productsDto)
    {
        try{
            ProductsDTO updatedProductsDto = productsService.updateProductsById(productsId, productsDto);
            return new ResponseEntity<>(updatedProductsDto,HttpStatus.OK);
        }
        catch (ProductsNotFoundException infe)
        {
            return new ResponseEntity<>(infe.getMessage(), HttpStatus.NOT_FOUND);
        }
        catch (Exception e)
        {
            return new ResponseEntity<>("An error occurred while updating the Products.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("products/deleteById/{productId}")
    @Operation(summary = "delete Products by Products Id")
    public ResponseEntity<String> deleteByProductId(@PathVariable("productId") long productId)
    {
        try{
            //String message= productsService.deleteProduct(productId);
            String message=productsService.deleteProductById(productId);
            return new ResponseEntity<>(message, HttpStatus.OK);
        }
        catch(ProductsNotFoundException infe)
        {
            return new ResponseEntity<>(infe.getMessage(), HttpStatus.OK);
        }
    }
}
