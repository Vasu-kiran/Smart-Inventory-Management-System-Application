package com.incedo.capstone.smartinventory.entities;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Godowns {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long godownId;
    private String location = null;
    private Double capacityInQuintals = null;
    private LocalDate startDate = null;
    private Boolean status = true;

    @OneToOne(optional = false)
    @JoinColumn(name= "user_id")
    private Users users;

    @Override
    public String toString() {
        return "Godowns{" +
                "godownId=" + godownId +
                ", location='" + location + '\'' +
                ", capacityInQuintals=" + capacityInQuintals +
                ", startDate=" + startDate +
                ", users=" + users +
                '}';
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public Users getUsers() {
        return users;
    }

    public void setUsers(Users users) {
        this.users = users;
    }

    public long getGodownId() {
        return godownId;
    }

    public void setGodownId(long godownId) {
        this.godownId = godownId;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Double getCapacityInQuintals() {
        return capacityInQuintals;
    }

    public void setCapacityInQuintals(Double capacityInQuintals) {
        this.capacityInQuintals = capacityInQuintals;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }
}
