package com.financial.config.mapper;

import com.financial.dto.request.profile.RequestCreateProfileDTO;
import com.financial.dto.response.profile.ResponseProfileDTO;
import com.financial.model.Profile;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProfileMapper {

    Profile toProfile(RequestCreateProfileDTO profileDto);

    @Mapping(target = "userId", source = "user.userId")
    ResponseProfileDTO toResponseProfileDto(Profile profile);

}
