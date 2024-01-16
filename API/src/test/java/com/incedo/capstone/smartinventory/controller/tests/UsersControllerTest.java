package com.incedo.capstone.smartinventory.controller.tests;

import com.incedo.capstone.smartinventory.controllers.UsersController;
import com.incedo.capstone.smartinventory.dto.UsersDTO;
import com.incedo.capstone.smartinventory.entities.Users;
import com.incedo.capstone.smartinventory.services.UsersService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UsersControllerTest {

    @Mock
    private UsersService usersService;


    @InjectMocks
    private UsersController usersController;



    @Test
    public void testAddUser(){
        //Setup
        Users user = new Users();
        when(usersService.addUser(user)).thenReturn("User Created");


        //Execution
        ResponseEntity<String> responseEntity = usersController.addUser(user);


        //Verify
        assertEquals("User Created",responseEntity.getBody());

    }

    @Test
    public void testFetchUsers(){
        List<UsersDTO> userList = new ArrayList<>();



        when(usersService.fetchUsers()).thenReturn(userList);

        List<UsersDTO> result = usersController.fetchUsers();

        assertEquals(userList,result);




    }

    @Test
    public void testGetUserByName(){
        List<UsersDTO> userList = new ArrayList<>();
        when(usersService.fetchUserByName("username")).thenReturn(userList);

        ResponseEntity<Object> userResult = usersController.getUserByName("username");

        assertEquals(userList,userResult.getBody());
        assertEquals(HttpStatus.OK, userResult.getStatusCode());


    }

    @Test
    public void testGetUserById(){
        UsersDTO user = new UsersDTO();
        when(usersService.fetchById(1L)).thenReturn(user);

        ResponseEntity<Object> resultUser = usersController.getuserById(1L);

        assertEquals(user,resultUser.getBody());
        assertEquals(HttpStatus.OK, resultUser.getStatusCode());
    }



}
