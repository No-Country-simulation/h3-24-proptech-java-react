package com.financial.config.mapper;

import com.financial.dto.request.loan.RequestLoanSimulationDTO;
import com.financial.dto.response.loan.DataResponseLoanDTO;
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

    @Mapping(source = "loanId", target = "loanId")
    @Mapping(source = "requestedAmount", target = "requestedAmount")
    @Mapping(source = "totalAmount", target = "totalAmount")
    @Mapping(source = "monthlyQuota", target = "monthlyQuota")
    @Mapping(source = "remainingBalance", target = "remainingBalance")
    @Mapping(source = "termMonths", target = "termMonths")
    @Mapping(source = "interestRate", target = "interestRate")
    @Mapping(source = "status", target = "status")
    @Mapping(source = "dateAccepted", target = "dateAccepted")
    DataResponseLoanDTO toDataResponseLoanDTO(Loan loan);

    List<ResponseLoanDTO> toResponseDTOList(List<Loan> loans);
    List<ResponseLoanAdminDTO> toResponseADMDTOList(List<Loan> loans);
}
