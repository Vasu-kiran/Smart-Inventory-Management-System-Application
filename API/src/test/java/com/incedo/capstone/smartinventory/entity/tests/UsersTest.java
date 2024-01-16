package com.incedo.capstone.smartinventory.entity.tests;

import com.incedo.capstone.smartinventory.entities.Users;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

public class UsersTest {

    @BeforeAll
    public static void TestStartMessage() {
        System.out.println("Test Starting at : " + new Date());
    }

    @Test
    public void testGettersSettersPassing() {
        Users user = new Users();
        user.setUserId(1L);
        user.setUsername("Subham Saha");
        user.setPwd("Subham@1234");
        user.setRole("ADMIN");
        user.setGender("MALE");
        user.setEmail("subham@gmail.com");

        assertEquals(1L, user.getUserId());
        assertEquals("Subham Saha", user.getUsername());
        assertEquals("Subham@1234", user.getPwd());
        assertEquals("ADMIN", user.getRole());
        assertEquals("MALE", user.getGender());
        assertEquals("subham@gmail.com", user.getEmail());
    }

    @Test
    public void testGettersSettersFailing() {
        Users user = new Users();
        user.setUserId(1L);
        user.setUsername("Subham Saha");
        user.setPwd("Subham@1234");
        user.setRole("ADMIN");
        user.setGender("MALE");
        user.setEmail("subham@gmail.com");


        assertNotEquals(2L, user.getUserId());
        assertNotEquals("Richa", user.getUsername());
        assertNotEquals("DifferentPassword", user.getPwd());
        assertNotEquals("USER", user.getRole());
        assertNotEquals("FEMALE", user.getGender());
        assertNotEquals("richa@gmail.com", user.getEmail());
    }
}
