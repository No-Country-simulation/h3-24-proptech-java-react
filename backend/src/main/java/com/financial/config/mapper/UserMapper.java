package com.financial.config.mapper;

import com.financial.dto.response.auth.UserResponseDto;
import com.financial.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    UserResponseDto toUserResponseDTO(User user);

    List<UserResponseDto> toUserResponseDTO(List<User> user);


    User toUser(UserResponseDto userResponseDto);
}
