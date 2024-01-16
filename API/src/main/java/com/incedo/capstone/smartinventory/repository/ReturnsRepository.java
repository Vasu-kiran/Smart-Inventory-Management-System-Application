package com.incedo.capstone.smartinventory.repository;

import com.incedo.capstone.smartinventory.entities.Returns;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReturnsRepository extends JpaRepository<Returns, Long> {
}
