package com.financial.config.mapper;

import com.financial.dto.request.auth.RegisterRequestDto;
import com.financial.dto.response.auth.UserResponseDto;
import com.financial.model.User;
import org.mapstruct.Mapper;

import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    UserResponseDto toUserResponseDTO(User user);

    @Mapping(source = "email",target = "email")
    @Mapping(source = "password",target = "password")
    @Mapping(source = "name",target = "name")
    @Mapping(source = "lastname",target = "lastname")
    @Mapping(source = "dni",target = "dni")
    User toUserModel(RegisterRequestDto dto);
}
