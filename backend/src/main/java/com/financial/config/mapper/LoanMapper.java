package com.financial.config.mapper;

import com.financial.dto.request.loan.RequestLoanSimulationDTO;
import com.financial.dto.response.loan.ResponseLoanDTO;
import com.financial.dto.response.loan.ResponseLoanAdminDTO;
import com.financial.model.Loan;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface LoanMapper {

    LoanMapper INSTANCE = Mappers.getMapper(LoanMapper.class);

    Loan toEntity(RequestLoanSimulationDTO dto);

    ResponseLoanDTO toResponseDTO(Loan loan);
    @Mapping(source = "totalAmount", target = "totalAmount")
    @Mapping(source = "user.profile", target = "profile")
    @Mapping(source = "documents", target = "documents")
    ResponseLoanAdminDTO toResponseADMDTO(Loan loan);


    List<ResponseLoanDTO> toResponseDTOList(List<Loan> loans);
    List<ResponseLoanAdminDTO> toResponseADMDTOList(List<Loan> loans);
}
