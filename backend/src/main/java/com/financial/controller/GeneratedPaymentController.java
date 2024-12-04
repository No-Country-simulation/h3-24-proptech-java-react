package com.financial.controller;

import com.financial.config.mapper.GeneratedPaymentMapper;
import com.financial.dto.response.PaymentResponseDTO;
import com.financial.model.GeneratedPayment;
import com.financial.service.impl.GeneratedPaymentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/payments")
public class GeneratedPaymentController {
    private final GeneratedPaymentService generatedPaymentService;
    private final GeneratedPaymentMapper generatedPaymentMapper;

    public GeneratedPaymentController(GeneratedPaymentService generatedPaymentService, GeneratedPaymentMapper generatedPaymentMapper) {
        this.generatedPaymentService = generatedPaymentService;
        this.generatedPaymentMapper = generatedPaymentMapper;
    }

    @GetMapping("/first-pending/{loanId}")
    public ResponseEntity<PaymentResponseDTO> getFirstPendingPayment(@PathVariable UUID loanId,
            @RequestParam(defaultValue = "ON_TIME") String paymentType) {
        GeneratedPayment payment = generatedPaymentService.getLastPendingPaymentByType(loanId, paymentType);
        return payment != null
                ? new ResponseEntity<>(generatedPaymentMapper.toPaymentResponseDTO(payment), HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/update-status")
    public ResponseEntity<GeneratedPayment> updatePaymentStatus(@RequestParam UUID loanId, @RequestParam Integer installmentNumber) {
        GeneratedPayment updatedPayment = generatedPaymentService.updatePaymentStatus(loanId, installmentNumber);
        return ResponseEntity.ok(updatedPayment);
    }
}
