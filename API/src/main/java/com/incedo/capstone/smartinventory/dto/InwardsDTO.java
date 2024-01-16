package com.incedo.capstone.smartinventory.dto;

public class InwardsDTO {

    private Long InwardsId;
    private String NameOfTheSupplier;
    private String DateOfSupply;
    private String ItemName;
    private long InvoiceNo;
    private int quantity;
    private String receivedBy;
    private long ReceiptNo;
    private String BillCheckedBy;


    @Override
    public String toString() {
        return "InwardsDTO{" +
                "InwardsId=" + InwardsId +
                ", NameOfTheSupplier='" + NameOfTheSupplier + '\'' +
                ", DateOfSupply='" + DateOfSupply + '\'' +
                ", ItemName='" + ItemName + '\'' +
                ", InvoiceNo=" + InvoiceNo +
                ", quantity=" + quantity +
                ", receivedBy='" + receivedBy + '\'' +
                ", ReceiptNo=" + ReceiptNo +
                ", BillCheckedBy='" + BillCheckedBy + '\'' +
                '}';
    }

    public Long getInwardsId() {
        return InwardsId;
    }

    public void setInwardsId(Long inwardsId) {
        InwardsId = inwardsId;
    }

    public String getNameOfTheSupplier() {
        return NameOfTheSupplier;
    }

    public void setNameOfTheSupplier(String nameOfTheSupplier) {
        NameOfTheSupplier = nameOfTheSupplier;
    }

    public String getDateOfSupply() {
        return DateOfSupply;
    }

    public void setDateOfSupply(String dateOfSupply) {
        DateOfSupply = dateOfSupply;
    }

    public String getItemName() {
        return ItemName;
    }

    public void setItemName(String itemName) {
        ItemName = itemName;
    }

    public long getInvoiceNo() {
        return InvoiceNo;
    }

    public void setInvoiceNo(long invoiceNo) {
        InvoiceNo = invoiceNo;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getReceivedBy() {
        return receivedBy;
    }

    public void setReceivedBy(String receivedBy) {
        this.receivedBy = receivedBy;
    }

    public long getReceiptNo() {
        return ReceiptNo;
    }

    public void setReceiptNo(long receiptNo) {
        ReceiptNo = receiptNo;
    }

    public String getBillCheckedBy() {
        return BillCheckedBy;
    }

    public void setBillCheckedBy(String billCheckedBy) {
        BillCheckedBy = billCheckedBy;
    }
}
