package com.incedo.capstone.smartinventory.repository;

import com.incedo.capstone.smartinventory.entities.Godowns;
import com.incedo.capstone.smartinventory.entities.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GodownsRepository extends JpaRepository<Godowns,Long> {

    Godowns findByLocation(String Location);

    @Query("SELECT u FROM Godowns u WHERE u.location LIKE %:location%")
    List<Godowns> findBylocationContaining(@Param("location") String location);

    Godowns findByUsersUserId(Long userId);
}
