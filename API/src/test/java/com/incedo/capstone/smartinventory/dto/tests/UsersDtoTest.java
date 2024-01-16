package com.incedo.capstone.smartinventory.dto.tests;

import com.incedo.capstone.smartinventory.dto.UsersDTO;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class UsersDtoTest {
    @BeforeAll
    public static void usersDtoTestBeginMessage(){
        System.out.println("Users DTO Test Started at : "+ new Date());

    }
    @AfterAll
    public static void usersDtoTestEndMessage(){
        System.out.println("Users DTO Test Ended at : "+ new Date());

    }


    @Test
    public void testGettersSetters() {
        UsersDTO userDTO = new UsersDTO();
        userDTO.setUserId(1L);
        userDTO.setUsername("Subham Saha");
        userDTO.setRole("ADMIN");
        userDTO.setMobileNumber(9179382783L);
        userDTO.setGender("MALE");
        userDTO.setEmail("subham@gmail.com");

        assertEquals(1L, userDTO.getUserId());
        assertEquals("Subham Saha", userDTO.getUsername());
        assertEquals("ADMIN", userDTO.getRole());
        assertEquals(9179382783L, userDTO.getMobileNumber());
        assertEquals("MALE", userDTO.getGender());
        assertEquals("subham@gmail.com", userDTO.getEmail());
    }
}
