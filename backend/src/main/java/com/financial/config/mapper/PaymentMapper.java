package com.financial.config.mapper;

import com.financial.dto.request.payment.RequestPaymentDTO;
import com.financial.model.Payment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

    @Mapper(componentModel = "spring")
    public interface PaymentMapper {

        PaymentMapper INSTANCE = Mappers.getMapper(PaymentMapper.class);

        Payment toPayment(RequestPaymentDTO dto);
}
