package com.incedo.capstone.smartinventory.mapper;

import com.incedo.capstone.smartinventory.dto.ProductsDTO;
import com.incedo.capstone.smartinventory.entities.Products;

public class ProductsMapper {

    public static ProductsDTO convertToDto(Products products) {
        ProductsDTO productsDto = new ProductsDTO();

        productsDto.setProductId(products.getProductId());
        productsDto.setProductName(products.getProductName());
        productsDto.setPrice(products.getPrice());
        productsDto.setQuantity(products.getQuantity());


        return productsDto;
    }
}
