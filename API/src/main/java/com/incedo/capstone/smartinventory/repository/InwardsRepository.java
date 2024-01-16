package com.incedo.capstone.smartinventory.repository;

import com.incedo.capstone.smartinventory.entities.Godowns;
import com.incedo.capstone.smartinventory.entities.Inwards;
import jakarta.persistence.Entity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InwardsRepository extends JpaRepository<Inwards, Long> {

}
