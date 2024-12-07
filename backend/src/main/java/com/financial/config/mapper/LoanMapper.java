package com.financial.config.mapper;

import com.financial.dto.response.loan.ResponseLoanAdminDTO;
import com.financial.dto.response.loan.ResponseLoanDTO;
import com.financial.model.Loan;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = "spring")
public interface LoanMapper {

    ResponseLoanDTO toResponseDTO(Loan loan);

    @Mappings({
            @Mapping(source = "totalAmount", target = "totalAmount"),
            @Mapping(source = "user.profile", target = "profile"),
            @Mapping(source = "documents", target = "documents")
    })
    ResponseLoanAdminDTO toResponseADMDTO(Loan loan);

    List<ResponseLoanAdminDTO> toResponseADMDTOList(List<Loan> loans);

}
