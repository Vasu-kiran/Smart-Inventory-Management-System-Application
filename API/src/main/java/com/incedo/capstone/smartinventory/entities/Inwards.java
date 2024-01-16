package com.incedo.capstone.smartinventory.entities;

import jakarta.persistence.*;

import java.util.List;
import java.util.concurrent.TimeUnit;

@Entity
public class Inwards {

    @Id
    @Column(name="inwardsId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long InwardsId;
    private String NameOfTheSupplier;
    private String DateOfSupply;
    private String ItemName;
    private long InvoiceNo = TimeUnit.MILLISECONDS.toSeconds(System.currentTimeMillis());
    private int quantity;
    private String receivedBy;
    private long ReceiptNo = System.currentTimeMillis();
    private String BillCheckedBy;

    @ManyToOne(optional= false)
    @JoinColumn(name="godown_iD" )
    private Godowns godowns;


    @ManyToMany
    @JoinTable(name = "inwards_products",
            joinColumns = @JoinColumn(name = "inwards_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id"))
    private List<Products> productsToPurchase;


    public Godowns getGodowns() {
        return godowns;
    }

    public void setGodowns(Godowns godowns) {
        this.godowns = godowns;
    }

    public List<Products> getProductsToPurchase() {
        return productsToPurchase;
    }

    public void setProductsToPurchase(List<Products> productsToPurchase) {
        this.productsToPurchase = productsToPurchase;
    }

    @Override
    public String toString() {
        return "Inwards{" +
                "InwardsId=" + InwardsId +
                ", NameOfTheSupplier='" + NameOfTheSupplier + '\'' +
                ", DateOfSupply='" + DateOfSupply + '\'' +
                ", ItemName='" + ItemName + '\'' +
                ", InvoiceNo=" + InvoiceNo +
                ", quantity=" + quantity +
                ", receivedBy='" + receivedBy + '\'' +
                ", ReceiptNo=" + ReceiptNo +
                ", BillCheckedBy='" + BillCheckedBy + '\'' +
//                ", godowns=" + godowns +
                ", productsToPurchase=" + productsToPurchase +
                '}';
    }

    public long getInwardsId() {
        return InwardsId;
    }

    public void setInwardsId(long inwardsId) {
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
