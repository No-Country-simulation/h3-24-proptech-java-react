package com.financial.config.mapper;

import com.financial.dto.response.PaymentResponseDTO;
import com.financial.model.GeneratedPayment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface GeneratedPaymentMapper {

    GeneratedPaymentMapper INSTANCE = Mappers.getMapper(GeneratedPaymentMapper.class);

    @Mapping(source = "loanId", target = "loanId")
    @Mapping(source = "paymentId", target = "paymentId")
    @Mapping(source = "installmentNumber", target = "installmentNumber")
    @Mapping(source = "amount", target = "amount")
    @Mapping(source = "dueDate", target = "dueDate")
    @Mapping(source = "paidOnTime", target = "paidOnTime")
    @Mapping(source = "payLimitDate", target = "payLimitDate")
    @Mapping(source = "lateFee", target = "lateFee")
    @Mapping(source = "status", target = "lateFeeStatus")
    @Mapping(source = "totalAmountWithInterests", target = "totalAmountWithInterests")
    @Mapping(source = "totalAmountWithoutInterests", target = "totalAmountWithDiscount")
    @Mapping(source = "discountPercentage", target = "discountAmount")
    @Mapping(source = "requestedAmount", target = "requestedAmount")
    @Mapping(source = "totalAmount", target = "totalAmount")
    @Mapping(source = "remainingBalance", target = "remainingBalance")
    PaymentResponseDTO toPaymentResponseDTO(GeneratedPayment payment);
}
