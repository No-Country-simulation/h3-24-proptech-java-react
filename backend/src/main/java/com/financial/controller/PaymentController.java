package com.financial.controller;

import com.financial.model.Payment;
import com.financial.model.enums.PaymentStatus;
import com.financial.service.IPaymentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final IPaymentService paymentService;

    public PaymentController(IPaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/{loanId}/payments")
    public ResponseEntity<String> createPayment(@PathVariable UUID loanId) {
        paymentService.createPayment(loanId);
        return ResponseEntity.status(HttpStatus.CREATED).body("Payment created successfully.");
    }

    @GetMapping
    public List<Payment> getAllPayments() {
        return paymentService.getAllPayments();
    }

    @GetMapping("/status/{status}")
    public List<Payment> getPaymentsByStatus(@PathVariable PaymentStatus status) {
        return paymentService.getPaymentsByStatus(status);
    }

    @GetMapping("/loan/{loanId}")
    public List<Payment> getPaymentsByLoan(@PathVariable UUID loanId) {
        return paymentService.getPaymentsByLoan(loanId);
    }

    @PatchMapping("/{paymentId}/status/{status}")
    public Payment updatePaymentStatus(
            @PathVariable UUID paymentId,
            @PathVariable PaymentStatus status) {
        return paymentService.updatePaymentStatus(paymentId, status);
    }

    @PostMapping("/process")
    public ResponseEntity<String> processPayment(@RequestParam UUID loanId, @RequestParam int installmentNumber) {
            paymentService.processPayment(loanId, installmentNumber);
            return ResponseEntity.ok("Payment processed successfully.");
    }
}