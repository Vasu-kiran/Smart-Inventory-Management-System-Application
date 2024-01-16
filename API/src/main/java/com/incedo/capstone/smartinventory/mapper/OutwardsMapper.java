package com.incedo.capstone.smartinventory.mapper;

import com.incedo.capstone.smartinventory.dto.OutwardsDTO;
import com.incedo.capstone.smartinventory.entities.Outwards;

public class OutwardsMapper {

    public static OutwardsDTO convertToDto(Outwards outwards)
    {
        OutwardsDTO outwardsDTO = new OutwardsDTO();

        outwardsDTO.setOutwardsId(outwards.getOutwardsId());
        outwardsDTO.setBillValue(outwards.getBillValue());
        outwardsDTO.setBillCheckedBy(outwards.getBillCheckedBy());
        outwardsDTO.setDeliveredTo(outwards.getDeliveredTo());
        outwardsDTO.setQuantity(outwards.getQuantity());
        outwardsDTO.setPurpose(outwards.getPurpose());
        outwardsDTO.setDateOfSupply(outwards.getDateOfSupply());
        outwardsDTO.setReceiptNo(outwards.getReceiptNo());
        outwardsDTO.setInvoiceNo(outwards.getInvoiceNo());
        outwardsDTO.setItemName(outwards.getItemName());
        outwardsDTO.setDateOfDelivery(outwards.getDateOfDelivery());

        return outwardsDTO;
    }
}
