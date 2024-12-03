package com.financial.config.mapper;

import com.financial.dto.request.payment.RequestPaymentDTO;
import com.financial.dto.response.PaymentResponseDTO;
import com.financial.model.Payment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface PaymentMapper {

    PaymentMapper INSTANCE = Mappers.getMapper(PaymentMapper.class);

    Payment toPayment(RequestPaymentDTO dto);

    @Mapping(source = "loan.loanId", target = "loanId")
    @Mapping(source = "loan.requestedAmount", target = "requestedAmount")
    @Mapping(source = "loan.totalAmount", target = "totalAmount")
    @Mapping(source = "loan.remainingBalance", target = "remainingBalance")
    @Mapping(source = "payment.status", target = "lateFeeStatus")
    @Mapping(source = "payment.interestRate", target = "lateFee")
    @Mapping(source = "payment.paidOnTime", target = "paidOnTime")
    PaymentResponseDTO toPaymentDetailsResponseDTO(Payment payment);
}
