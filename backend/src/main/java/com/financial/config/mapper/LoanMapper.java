package com.financial.config.mapper;

import com.financial.dto.response.loan.ResponseLoanDTO;
import com.financial.model.Loan;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface LoanMapper {

    LoanMapper INSTANCE = Mappers.getMapper(LoanMapper.class);

    //Loan toEntity(RequestLoanSimulationDTO dto);

    ResponseLoanDTO toResponseDTO(Loan loan);
}
