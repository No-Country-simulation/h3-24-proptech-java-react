package com.financial.service.impl;

import com.financial.config.mapper.LoanMapper;
import com.financial.config.mapper.UserMapper;
import com.financial.dto.request.loan.RequestCreateLoanDTO;
import com.financial.dto.request.loan.RequestLoanSimulationDTO;
import com.financial.dto.request.loan.RequestRefinanceLoanDTO;
import com.financial.dto.response.loan.PaymentScheduleDTO;
import com.financial.dto.response.loan.ResponseLoanCalculationsDTO;
import com.financial.dto.response.loan.ResponseLoanDTO;
import com.financial.dto.response.loan.ResponseLoanSimulationDTO;
import com.financial.exception.NotFoundException;
import com.financial.model.Loan;
import com.financial.model.User;
import com.financial.model.enums.LoanRate;
import com.financial.model.enums.LoanStatus;
import com.financial.repository.ILoanRepository;
import com.financial.service.AuthService;
import com.financial.service.ILoanService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class LoanServiceImpl implements ILoanService {
    private final AuthService authService;
    private final LoanMapper loanMapper;
    private final ILoanRepository loanRepository;
    public LoanServiceImpl(UserMapper userMapper, AuthService authService, LoanMapper loanMapper, ILoanRepository loanRepository) {
        this.authService = authService;
        this.loanMapper = loanMapper;
        this.loanRepository = loanRepository;
    }

    @Transactional
    @Override
    public ResponseLoanDTO createLoan(UUID userId, RequestLoanSimulationDTO request) {
        User user = authService.getUserById(userId);
        var res = loanCalculations(request);
        Loan loan = Loan.builder()
                .status(LoanStatus.INITIATED)               // Estado inicial del préstamo
                .user(user)                                 // Asociar el usuario
                .requestedAmount(request.requestedAmount()) // Asignar el monto del préstamo desde el DTO
                .monthlyQuota(res.monthlyQuota())       // Asignar la cuota mensual del préstamo desde el DTO
                .termMonths(res.termMonths())           // Asignar el término del préstamo desde el DTO
                .interestRate(res.interestRate())       // Asignar la tasa de interés del préstamo desde el DTO
                .totalAmount(res.totalPayment())
                .build();
        loanRepository.save(loan);
        return loanMapper.toResponseDTO(loan);
    }

    @Override
    public void getLoanDetails() {
        // TODO: Implement this method
    }

    @Override
    public ResponseLoanSimulationDTO simulateLoan(RequestLoanSimulationDTO requestLoan) {
        MathContext mathContext = MathContext.DECIMAL128;
        var res = loanCalculations(requestLoan);
        // Generar el cronograma de pagos
        List<PaymentScheduleDTO> schedule = generatePaymentSchedule(res.totalPayment(), res.interestRate(),res.monthlyQuota(), res.termMonths(), mathContext);
        // Simulación de préstamo
        return new ResponseLoanSimulationDTO(res.monthlyQuota().setScale(2, RoundingMode.HALF_UP), res.totalPayment(), res.requestedAmount(), res.termMonths(), schedule);
    }

    public ResponseLoanCalculationsDTO loanCalculations(RequestLoanSimulationDTO requestLoan) {
        MathContext mathContext = MathContext.DECIMAL128;
        BigDecimal amount = requestLoan.requestedAmount().setScale(2, RoundingMode.HALF_UP);
        int term = requestLoan.termMonths();
//        BigDecimal monthlyRate = LoanRate.getRateByMonths(term).setScale(6, RoundingMode.HALF_UP);
        BigDecimal monthlyQuota = calculateLoan(amount, term).setScale(2, RoundingMode.HALF_UP);
        BigDecimal totalPayment = monthlyQuota.multiply(BigDecimal.valueOf(term), mathContext).setScale(2, RoundingMode.HALF_UP);
        BigDecimal rate = LoanRate.getRateByMonths(term).setScale(6, RoundingMode.HALF_UP);
        return new ResponseLoanCalculationsDTO(monthlyQuota.setScale(2, RoundingMode.HALF_UP), totalPayment, amount, term, rate);
    }

    @Override
    public BigDecimal calculateLoan(BigDecimal amount, Integer term) {
        // Obtener la tasa según los meses
        BigDecimal rate = LoanRate.getRateByMonths(term).setScale(6, RoundingMode.HALF_UP);
        return amount.multiply(rate).setScale(2, RoundingMode.HALF_UP);
    }

    @Override
    @Transactional
    public void updateLoanStatus(UUID loanId, String status) {
        Loan loan = loanRepository.findById(loanId)
                .orElseThrow(() -> new IllegalArgumentException("Préstamo no encontrado"));
        loan.setStatus(LoanStatus.valueOf(status.toUpperCase()));
        loanRepository.save(loan);
    }

    @Override
    public ResponseLoanDTO refinanceLoan(UUID loanId, RequestRefinanceLoanDTO request) {
        MathContext mathContext = MathContext.DECIMAL128;
        Loan existingLoan = loanRepository.findById(loanId)
                .orElseThrow(() -> new IllegalArgumentException("Préstamo no encontrado"));
        existingLoan.setRequestedAmount(request.newAmount());
        existingLoan.setTermMonths(request.newTermMonths());
        existingLoan.setInterestRate(request.newInterestRate().setScale(6, RoundingMode.HALF_UP));
        existingLoan.setStatus(LoanStatus.PENDING);

        loanRepository.save(existingLoan);
        return loanMapper.toResponseDTO(existingLoan);
    }

    @Override
    public String preApproveLoan(UUID loanId) {
        Loan loanFound = loanRepository.findById(loanId).orElseThrow(() -> new NotFoundException("Préstamo no encontrado"));
        loanFound.setStatus(LoanStatus.PRE_APPROVED);
        loanRepository.save(loanFound);
        // AGREGAR EMAIL
        return "Prestamo pre aprobado correctamente";
    }

    private List<PaymentScheduleDTO> generatePaymentSchedule(BigDecimal totalPayment, BigDecimal monthlyRate, BigDecimal monthlyQuota, Integer term, MathContext mathContext) {
        List<PaymentScheduleDTO> schedule = new ArrayList<>();
        BigDecimal remainingBalance = totalPayment.subtract(monthlyQuota).setScale(2, RoundingMode.HALF_UP); // Saldo inicial es el monto del préstamo - la primera cuota
        BigDecimal interest = monthlyRate.multiply(BigDecimal.valueOf(100), mathContext).setScale(2, RoundingMode.HALF_UP);
        for (int i = 1; i <= term; i++) {
            // Crear un nuevo registro de pago para este mes, incluyendo el interés y el saldo restante
            schedule.add(new PaymentScheduleDTO(i, monthlyQuota.setScale(2, RoundingMode.HALF_UP), interest, remainingBalance.setScale(2, RoundingMode.HALF_UP)));

            // Restar la cuota completa del saldo restante
            remainingBalance = remainingBalance.subtract(monthlyQuota);

            // Si el saldo restante se vuelve negativo, ajustar a 0 para evitar saldos negativos
            if (remainingBalance.compareTo(BigDecimal.ZERO) < 0) {
                remainingBalance = BigDecimal.ZERO;
            }
        }
        return schedule;
    }
}