package com.incedo.capstone.smartinventory.mapper;

import com.incedo.capstone.smartinventory.dto.ReturnsDTO;
import com.incedo.capstone.smartinventory.entities.Returns;

public class ReturnsMapper {

    public static ReturnsDTO convertToDTO (Returns returns){
        ReturnsDTO returnsDTO = new ReturnsDTO();

        returnsDTO.setInvoiceNo(returns.getReturnid());
        returnsDTO.setItemName(returns.getItemName());
        returnsDTO.setQuantity(returns.getQuantity());
        returnsDTO.setDateOfDelivery(returns.getDateOfDelivery());
        returnsDTO.setDateOfReturn(returns.getDateOfReturn());
        returnsDTO.setReceiptNo(returns.getReceiptNo());
        returnsDTO.setReceivedBy(returns.getReceivedBy());
        returnsDTO.setBillValue(returns.getBillValue());
        returnsDTO.setBillCheckedBy(returns.getBillCheckedBy());
        returnsDTO.setIsDamaged(returns.getIsDamaged());
        return returnsDTO;
    }
}
