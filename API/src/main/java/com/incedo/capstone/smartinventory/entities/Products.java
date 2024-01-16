package com.incedo.capstone.smartinventory.entities;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Products {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long productId;

    private String productName;

    private double price;

    private int quantity;


    @ManyToMany(mappedBy = "productsToPurchase")
    private List<Inwards> inwards;

    @ManyToMany(mappedBy = "productsToDeliver")
    private List<Outwards> outwards;

    public List<Outwards> getOutwards() {
        return outwards;
    }

    public void setOutwards(List<Outwards> outwards) {
        this.outwards = outwards;
    }

    public List<Inwards> getInwards() {
        return inwards;
    }

    public void setInwards(List<Inwards> inwards) {
        this.inwards = inwards;
    }

    @Override
    public String toString() {
        return "Products{" +
                "productId=" + productId +
                ", productName='" + productName + '\'' +
                ", price=" + price +
                ", quantity=" + quantity +

                ", inwards=" + inwards +
                ", outwards=" + outwards +
                '}';
    }

    public long getProductId() {
        return productId;
    }

    public void setProductId(long productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}

