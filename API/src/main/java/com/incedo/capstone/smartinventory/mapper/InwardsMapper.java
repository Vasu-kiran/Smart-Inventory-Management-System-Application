package com.incedo.capstone.smartinventory.mapper;

import com.incedo.capstone.smartinventory.dto.InwardsDTO;
import com.incedo.capstone.smartinventory.entities.Inwards;

public class InwardsMapper {

    public static InwardsDTO convetToDto (Inwards inwards)
    {
        InwardsDTO inwardsDto = new InwardsDTO();

        inwardsDto.setInwardsId(inwards.getInwardsId());
        inwardsDto.setBillCheckedBy(inwards.getBillCheckedBy());
        inwardsDto.setDateOfSupply(inwards.getDateOfSupply());
        inwardsDto.setInvoiceNo(inwards.getInvoiceNo());
        inwardsDto.setQuantity(inwards.getQuantity());
        inwardsDto.setItemName(inwards.getItemName());
        inwardsDto.setReceiptNo(inwards.getReceiptNo());
        inwardsDto.setReceivedBy(inwards.getReceivedBy());
        inwardsDto.setNameOfTheSupplier(inwards.getNameOfTheSupplier());
        return inwardsDto;
    }

}
