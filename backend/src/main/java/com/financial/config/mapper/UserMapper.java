package com.financial.config.mapper;

import com.financial.dto.response.UserResponseDto;
import com.financial.model.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserResponseDto toDto(User user);
}
