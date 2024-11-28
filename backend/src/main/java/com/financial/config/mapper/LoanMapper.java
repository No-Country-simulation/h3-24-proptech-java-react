package com.financial.config.mapper;

import com.financial.dto.request.loan.RequestLoanSimulationDTO;
import com.financial.dto.response.loan.ResponseLoanDTO;
import com.financial.dto.response.loan.ResponseLoandAdminDTO;
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
    ResponseLoandAdminDTO toResponseADMDTO(Loan loan);


    List<ResponseLoanDTO> toResponseDTOList(List<Loan> loans);
    List<ResponseLoandAdminDTO> toResponseADMDTOList(List<Loan> loans);
}
