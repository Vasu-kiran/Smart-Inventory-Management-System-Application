package com.incedo.capstone.smartinventory.services;

import com.incedo.capstone.smartinventory.dto.InwardsDTO;
import com.incedo.capstone.smartinventory.entities.Godowns;
import com.incedo.capstone.smartinventory.entities.Inwards;
import com.incedo.capstone.smartinventory.entities.Products;
import com.incedo.capstone.smartinventory.exceptions.InwardsCreationException;
import com.incedo.capstone.smartinventory.exceptions.InwardsNotFoundException;
import com.incedo.capstone.smartinventory.exceptions.ProductsNotFoundException;
import com.incedo.capstone.smartinventory.mapper.InwardsMapper;
import com.incedo.capstone.smartinventory.repository.GodownsRepository;
import com.incedo.capstone.smartinventory.repository.InwardsRepository;
import com.incedo.capstone.smartinventory.repository.ProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class InwardsService {

    @Autowired
    InwardsRepository inwardsRepository;

    @Autowired
    ProductsRepository productsRepository;

    @Autowired
    GodownsRepository godownsRepository;

    public String addInwards(Inwards inwards) {

        Inwards savedInwards = inwardsRepository.save(inwards);

        if (savedInwards != null) {

            List<Products> incomingproducts = inwards.getProductsToPurchase();

            for(Products product: incomingproducts)
            {
                Optional<Products> op = productsRepository.findById(product.getProductId());
                if(op.isPresent())
                {
                    Products existingProducts = op.get();
                    existingProducts.setQuantity(existingProducts.getQuantity() - inwards.getQuantity());

                    productsRepository.save(existingProducts);
                }
            }
            Godowns godown = null;
            if (inwards.getGodowns() != null && inwards.getGodowns().getGodownId() != 0) {
                godown = godownsRepository.findById(inwards.getGodowns().getGodownId()).orElse(null);
            }
            if (godown != null) {
                Double currentCapacity = godown.getCapacityInQuintals();
                Double totalProductCapacity = (double) inwards.getQuantity();



                if (currentCapacity != null && totalProductCapacity != null) {
                    Double newCapacity = currentCapacity - totalProductCapacity;

                    if (newCapacity >= 0) {
                        godown.setCapacityInQuintals(newCapacity);
                        godownsRepository.save(godown);


                        return "Inwards Added";
                    } else {
                        throw new InwardsCreationException("Insufficient capacity in the godown.");
                    }/////
                }
            }
            return "Inwards Added";
        }
        throw new InwardsCreationException("There is some problem creating Inwards");
    }



    public InwardsDTO updateInwards(long inwardsId, InwardsDTO inwardsDto) {

        Optional<Inwards> op = inwardsRepository.findById(inwardsId);

        if (op.isPresent()) {
            Inwards existinginwards = op.get();

            existinginwards.setQuantity(inwardsDto.getQuantity());
            existinginwards.setBillCheckedBy(inwardsDto.getBillCheckedBy());
            existinginwards.setDateOfSupply(inwardsDto.getDateOfSupply());
            existinginwards.setInvoiceNo(inwardsDto.getInvoiceNo());
            existinginwards.setItemName(inwardsDto.getItemName());
            existinginwards.setReceiptNo(inwardsDto.getReceiptNo());
            existinginwards.setNameOfTheSupplier(inwardsDto.getNameOfTheSupplier());
            existinginwards.setReceivedBy(inwardsDto.getReceivedBy());

            Inwards savedInwards = inwardsRepository.save(existinginwards);

            return InwardsMapper.convetToDto(savedInwards);
        } else {
            throw new InwardsNotFoundException("Inwards not found for id: " + inwardsId);
        }
    }

    public List<InwardsDTO> fetchInwards() {

        return inwardsRepository.findAll()
                .stream()
                .map(InwardsMapper::convetToDto)
                .collect(Collectors.toList());
    }

    public InwardsDTO fetchInwardsById(long inwardsId) {

        Optional<Inwards> op = inwardsRepository.findById(inwardsId);

        if (op.isPresent()) {
            Inwards existingInwards = op.get();

            return InwardsMapper.convetToDto(existingInwards);
        }
        throw new InwardsNotFoundException("Inwards not found for id: " + inwardsId);
    }

    public String deleteById(long inwardsId) {

        Optional<Inwards> op = inwardsRepository.findById(inwardsId);

        if (op.isPresent()) {
            Inwards deleteInwards = op.get();
            if (deleteInwards != null) {
                inwardsRepository.delete(deleteInwards);
            }

        }
        throw new InwardsNotFoundException("Inwards not found for id: " + inwardsId);
    }
}
