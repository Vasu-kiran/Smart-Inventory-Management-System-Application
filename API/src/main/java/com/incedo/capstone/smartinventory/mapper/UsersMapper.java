package com.incedo.capstone.smartinventory.mapper;

import com.incedo.capstone.smartinventory.dto.UsersDTO;
import com.incedo.capstone.smartinventory.entities.Users;
import org.modelmapper.ModelMapper;

public class UsersMapper {

    public static UsersDTO convertToDto(Users users) {
        UsersDTO userDto = new UsersDTO();
        userDto.setUserId(users.getUserId());
        userDto.setEmail(users.getEmail());
        userDto.setUsername(users.getUsername());
        userDto.setRole(users.getRole());
        userDto.setMobileNumber(users.getMobileNumber());
        userDto.setGender(users.getGender());
        return userDto;
    }
}
