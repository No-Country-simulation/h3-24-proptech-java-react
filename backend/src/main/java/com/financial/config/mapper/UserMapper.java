package com.financial.config.mapper;


import com.financial.dto.response.auth.UserResponseDto;
import com.financial.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

//    @Mapping(source = "userId",target = "userId")
//    @Mapping(source = "email",target = "email")
//    @Mapping(source = "name",target = "name")
//    @Mapping(source = "lastname",target = "lastname")
//    @Mapping(source = "dni",target = "dni")
//    @Mapping(source = "roles",target = "roles")
    UserResponseDto toUserResponseDTO(User user);

}
