package com.incedo.capstone.smartinventory;

import com.incedo.capstone.smartinventory.controller.tests.UsersControllerTest;
import com.incedo.capstone.smartinventory.dto.tests.UsersDtoTest;
import com.incedo.capstone.smartinventory.entity.tests.UsersTest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
@SpringBootTest
class SmartInventoryApplicationTests {

	@Test
	void contextLoads() {
	}
	@Test
	void testUsersGettersSetters() {
		UsersTest usersTest = new UsersTest();
		usersTest.testGettersSettersPassing();
		usersTest.testGettersSettersFailing();

	}

	@Test
	void testUsersDtoGettersSetters() {
		UsersDtoTest usersDtoTest = new UsersDtoTest();
		usersDtoTest.testGettersSetters();
	}

//	@Test
//	void testUsersControllers(){
//
//		UsersControllerTest usersControllerTest = new UsersControllerTest();
//		usersControllerTest.testAddUser();
//		usersControllerTest.testFetchUsers();
//		usersControllerTest.testGetUserById();
//		usersControllerTest.testGetUserByName();
//
//	}

}
