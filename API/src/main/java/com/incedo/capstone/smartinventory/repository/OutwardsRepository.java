package com.incedo.capstone.smartinventory.repository;


import com.incedo.capstone.smartinventory.entities.Outwards;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OutwardsRepository extends JpaRepository<Outwards, Long> {

}
