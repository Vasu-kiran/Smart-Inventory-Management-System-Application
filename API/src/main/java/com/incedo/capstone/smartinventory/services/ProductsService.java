package com.incedo.capstone.smartinventory.services;

import com.incedo.capstone.smartinventory.dto.ProductsDTO;
import com.incedo.capstone.smartinventory.entities.Products;
import com.incedo.capstone.smartinventory.exceptions.ProductsNotFoundException;
import com.incedo.capstone.smartinventory.mapper.ProductsMapper;
import com.incedo.capstone.smartinventory.repository.ProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductsService {
    @Autowired
    ProductsRepository productsRepository;

    public Products addProduct(Products products){
        return productsRepository.save(products);

    }

    public ProductsDTO getProductById(long productsId) {

        Optional<Products> op = productsRepository.findById(productsId);

        if (op.isPresent()) {
            Products existingProducts = op.get();

            return ProductsMapper.convertToDto(existingProducts);
        }
        throw new ProductsNotFoundException("Products not found for id: " + productsId);
    }

    public ProductsDTO updateProductsById(long productsId, ProductsDTO productsDto) {

        Optional<Products> op = productsRepository.findById(productsId);

        if (op.isPresent()) {
            Products existingProduct = op.get();

            existingProduct.setProductName(productsDto.getProductName());
            existingProduct.setPrice(productsDto.getPrice());
            existingProduct.setQuantity(productsDto.getQuantity());



            Products savedProducts = productsRepository.save(existingProduct);

            return ProductsMapper.convertToDto(savedProducts);
        } else {
            throw new ProductsNotFoundException("Products not found for id: " + productsId);
        }
    }
    public String deleteProductById(long productId) {
        Optional<Products> op = productsRepository.findById(productId);

        if (op.isPresent()) {
            Products deleteProducts = op.get();
            if (deleteProducts!=null) {
                productsRepository.delete(deleteProducts);
                return "Product deleted successfully";
            }
            else {
                return "Product cannot be deleted as it is not available ";
            }

        }
        throw new ProductsNotFoundException("Products not found for id: " + productId);
    }

    public List<ProductsDTO> getAllProducts() {

        return productsRepository.findAll()
                .stream()
                .map(ProductsMapper::convertToDto)
                .collect(Collectors.toList());
    }
}
