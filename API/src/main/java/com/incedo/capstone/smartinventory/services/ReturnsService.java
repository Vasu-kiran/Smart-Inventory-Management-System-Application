package com.incedo.capstone.smartinventory.services;

import com.incedo.capstone.smartinventory.dto.ReturnsDTO;
import com.incedo.capstone.smartinventory.entities.Godowns;
import com.incedo.capstone.smartinventory.entities.Inwards;
import com.incedo.capstone.smartinventory.entities.Returns;
import com.incedo.capstone.smartinventory.exceptions.GodownNotFoundException;
import com.incedo.capstone.smartinventory.exceptions.InwardsCreationException;
import com.incedo.capstone.smartinventory.exceptions.InwardsNotFoundException;
import com.incedo.capstone.smartinventory.exceptions.ReturnsNotFoundException;
import com.incedo.capstone.smartinventory.mapper.GodownsMapper;
import com.incedo.capstone.smartinventory.mapper.ReturnsMapper;
import com.incedo.capstone.smartinventory.repository.GodownsRepository;
import com.incedo.capstone.smartinventory.repository.ReturnsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReturnsService {

    @Autowired
    ReturnsRepository returnsRepository;

    @Autowired
    GodownsRepository godownsRepository;

    public List<ReturnsDTO> fetchReturns() {
        return returnsRepository.findAll()
                .stream()
                .map(ReturnsMapper::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<Returns> fetchReturns2() {
        return returnsRepository.findAll();

    }

    public ReturnsDTO fetchReturnsById(long returnsId) {
        Optional<Returns> op = returnsRepository.findById(returnsId);

        if (op.isPresent()) {
            Returns existingInwards = op.get();

            return ReturnsMapper.convertToDTO(existingInwards);
        }
        throw new ReturnsNotFoundException("Returns not found for id: " + returnsId);
    }

    public String addReturn(Returns returns) {
        Returns savedReturn = returnsRepository.save(returns);

        if(savedReturn.getIsDamaged()){
            return "Return added. Product is damaged, not updating Godown.";
        }
            Godowns godown = null;
            if (savedReturn.getGodowns() != null && savedReturn.getGodowns().getGodownId() != 0) {
                godown = godownsRepository.findById(savedReturn.getGodowns().getGodownId()).orElse(null);
            }
            if (godown != null) {
                Double currentCapacity = godown.getCapacityInQuintals();
                Double totalProductCapacity = savedReturn.getQuantity();

                if (currentCapacity != null && totalProductCapacity != null) {
                    Double newCapacity = currentCapacity - totalProductCapacity;

                    if (newCapacity >= 0) {
                        godown.setCapacityInQuintals(newCapacity);
                        godownsRepository.save(godown);

                        return "Return added, and Godown updated.";
                    } else {
                        returnsRepository.delete(savedReturn);
                        throw new ReturnsNotFoundException("Insufficient capacity in the return.");
                    }
                }
            }



        return "Return added.";
    }

    public ReturnsDTO updateReturns(long returnsId, ReturnsDTO returnsDTO) {
        Optional<Returns> op = returnsRepository.findById(returnsId);

        if (op.isPresent()) {
            Returns existingReturns = op.get();
            existingReturns.setItemName(returnsDTO.getItemName());
            existingReturns.setQuantity(returnsDTO.getQuantity());
            existingReturns.setDateOfDelivery(returnsDTO.getDateOfDelivery());
            existingReturns.setDateOfReturn(returnsDTO.getDateOfReturn());
            existingReturns.setReceiptNo(returnsDTO.getReceiptNo());
            existingReturns.setReceivedBy(returnsDTO.getReceivedBy());
            existingReturns.setBillValue(returnsDTO.getBillValue());
            existingReturns.setBillCheckedBy(returnsDTO.getBillCheckedBy());
            existingReturns.setIsDamaged(returnsDTO.getIsDamaged());

            Returns updatedReturns = returnsRepository.save(existingReturns);

            return ReturnsMapper.convertToDTO(updatedReturns);
        } else {
            throw new GodownNotFoundException("Returns not found with id: " + returnsId);
        }
    }

    public String deleteById(long returnsId) {
        Optional<Returns> op = returnsRepository.findById(returnsId);

        if (op.isPresent()) {
            Returns deleteReturns = op.get();
            if (deleteReturns != null) {
                returnsRepository.delete(deleteReturns);
            }

        }
        throw new ReturnsNotFoundException("Returns not found for id: " + returnsId);
    }
}
