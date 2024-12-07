package com.financial.controller;

import com.financial.dto.response.PaymentResponseDTO;
import com.financial.scheduler.PaymentScheduler;
import com.financial.model.Payment;
import com.financial.model.enums.PaymentStatus;
import com.financial.service.IPaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {
    @Autowired
    PaymentScheduler paymentScheduler;
    private final IPaymentService paymentService;

    public PaymentController(IPaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @GetMapping("/pending")
    public ResponseEntity<List<PaymentResponseDTO>> getPendingPayments(
            @RequestParam UUID loanId) {
        List<PaymentResponseDTO> pendingPayments = paymentService.getPendingPayments(loanId);
        return ResponseEntity.ok(pendingPayments);
    }

    @GetMapping("/installments")
    public ResponseEntity<List<PaymentResponseDTO>> getPendingPayments(
            @RequestParam UUID loanId,
            @RequestParam int numberOfInstallments) {
        return ResponseEntity.ok(paymentService.getPendingInstallments(loanId, numberOfInstallments));
    }

    @GetMapping
    public List<Payment> getAllPayments() {
        return paymentService.getAllPayments();
    }

    @GetMapping("/last-paid")
    public ResponseEntity<PaymentResponseDTO> getLastPaidPayment(@RequestParam UUID loanId) {
        return ResponseEntity.ok(paymentService.getLastPaidPayment(loanId));
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
    public Payment updatePaymentStatus(@PathVariable UUID paymentId, @PathVariable PaymentStatus status) {
        return paymentService.updatePaymentStatus(paymentId, status);
    }

    @PostMapping("/process")
    public ResponseEntity<String> processPayment(@RequestParam UUID loanId, @RequestParam int installmentNumber) {
            paymentService.processPayment(loanId, installmentNumber);
            return ResponseEntity.ok("Payment processed successfully.");
    }

    @PostMapping("/loans/{loanId}/advance")
    public ResponseEntity<String> advancePayments(@PathVariable UUID loanId, @RequestParam int numberOfInstallments) {
        paymentService.processAdvancePayment(loanId, numberOfInstallments);
        return ResponseEntity.ok("Payment processed successfully.");
    }

    @PostMapping("/{loanId}/payments")
    public ResponseEntity<String> createPayment(@PathVariable UUID loanId) {
        paymentService.createPaymentSchedule(loanId);
        return ResponseEntity.status(HttpStatus.CREATED).body("Payment created successfully.");
    }
}