package com.financial.config.mapper;

import com.financial.dto.response.auth.UserResponseDto;
import com.financial.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    UserResponseDto toUserResponseDTO(User user);

    User toUser(UserResponseDto userResponseDto);
}
