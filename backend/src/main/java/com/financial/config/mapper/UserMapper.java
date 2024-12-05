package com.financial.config.mapper;

import com.financial.dto.response.auth.UserResponseDto;
import com.financial.model.User;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserResponseDto toUserResponseDTO(User user);

    List<UserResponseDto> toUserResponseDTO(List<User> user);

}
