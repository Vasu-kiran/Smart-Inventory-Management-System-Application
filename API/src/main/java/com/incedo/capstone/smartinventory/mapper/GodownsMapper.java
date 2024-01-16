package com.incedo.capstone.smartinventory.mapper;

import com.incedo.capstone.smartinventory.dto.GodownsDTO;
import com.incedo.capstone.smartinventory.entities.Godowns;

public class GodownsMapper {

    public static GodownsDTO convertToDto (Godowns godowns)
    {

        GodownsDTO godownsDto = new GodownsDTO();

        godownsDto.setGodownId(godowns.getGodownId());
        godownsDto.setLocation(godowns.getLocation());
        godownsDto.setCapacityInQuintals(godowns.getCapacityInQuintals());
        godownsDto.setStartDate(godowns.getStartDate());
        godownsDto.setStatus(godowns.getStatus());

        return godownsDto;
    }
}
