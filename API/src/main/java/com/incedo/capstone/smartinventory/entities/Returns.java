package com.incedo.capstone.smartinventory.entities;

import jakarta.persistence.*;

@Entity
public class Returns {

    @Id
    @Column(name = "invoiceNo")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Returnid;
    private String ItemName;
    private Double quantity;
    private String DateOfDelivery;
    private String DateOfReturn;
    private long ReceiptNo = System.currentTimeMillis();
    private String ReceivedBy;
    private String BillValue;
    private String BillCheckedBy;



    private boolean IsDamaged;

    public boolean getIsDamaged() {
        return IsDamaged;
    }

    public void setIsDamaged(boolean damaged) {
        IsDamaged = damaged;
    }

    @Override
    public String toString() {
        return "Returns{" +
                "Returnid=" + Returnid +
                ", ItemName='" + ItemName + '\'' +
                ", quantity=" + quantity +
                ", DateOfDelivery='" + DateOfDelivery + '\'' +
                ", DateOfReturn='" + DateOfReturn + '\'' +
                ", ReceiptNo=" + ReceiptNo +
                ", ReceivedBy='" + ReceivedBy + '\'' +
                ", BillValue='" + BillValue + '\'' +
                ", BillCheckedBy='" + BillCheckedBy + '\'' +
                ", IsDamaged=" + IsDamaged +
                ", godowns=" + godowns +
                ", outwards=" + outwards +
                '}';
    }

    @ManyToOne(optional= false)
    @JoinColumn(name="godown_iD" )
    private Godowns godowns;

    @OneToOne(optional = false)
    @JoinColumn(name = "outwards_id")
    private Outwards outwards;


    public Outwards getOutwards() {
        return outwards;
    }

    public void setOutwards(Outwards outwards) {
        this.outwards = outwards;
    }

    public long getReturnid() {
        return Returnid;
    }

    public void setReturnid(long returnid) {
        Returnid = returnid;
    }

    public String getItemName() {
        return ItemName;
    }

    public void setItemName(String itemName) {
        ItemName = itemName;
    }

    public Double getQuantity() {
        return quantity;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }

    public String getDateOfDelivery() {
        return DateOfDelivery;
    }

    public void setDateOfDelivery(String dateOfDelivery) {
        DateOfDelivery = dateOfDelivery;
    }

    public String getDateOfReturn() {
        return DateOfReturn;
    }

    public void setDateOfReturn(String dateOfReturn) {
        DateOfReturn = dateOfReturn;
    }

    public long getReceiptNo() {
        return ReceiptNo;
    }

    public void setReceiptNo(long receiptNo) {
        ReceiptNo = receiptNo;
    }

    public String getReceivedBy() {
        return ReceivedBy;
    }

    public void setReceivedBy(String receivedBy) {
        ReceivedBy = receivedBy;
    }

    public String getBillValue() {
        return BillValue;
    }

    public void setBillValue(String billValue) {
        BillValue = billValue;
    }

    public String getBillCheckedBy() {
        return BillCheckedBy;
    }

    public void setBillCheckedBy(String billCheckedBy) {
        BillCheckedBy = billCheckedBy;
    }

    public Godowns getGodowns() {
        return godowns;
    }

    public void setGodowns(Godowns godowns) {
        this.godowns = godowns;
    }
}
