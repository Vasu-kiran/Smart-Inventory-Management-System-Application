package com.incedo.capstone.smartinventory.repository;

import com.incedo.capstone.smartinventory.dto.UsersDTO;
import com.incedo.capstone.smartinventory.entities.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

@Repository
public interface UsersRepository extends JpaRepository<Users,Long> {

    Users findByUsername(String username);

    @Query("SELECT u FROM Users u WHERE u.username LIKE %:username%")
    List<Users> findByUsernameContaining(@Param("username") String username);
    Users findByEmail(String email);

//    List<UsersDTO> fetchAllUsersByName(String username);
}
