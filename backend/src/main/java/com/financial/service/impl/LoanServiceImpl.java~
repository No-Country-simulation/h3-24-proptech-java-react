package com.financial.service.impl;

import com.financial.config.mapper.LoanMapper;
import com.financial.config.mapper.UserMapper;
import com.financial.dto.request.loan.RequestDeclinedLoanDTO;
import com.financial.dto.request.loan.RequestLoanSimulationDTO;
import com.financial.dto.request.loan.RequestRefinanceLoanDTO;
import com.financial.dto.request.loan.UpdateStatusLoanRequestDTO;
import com.financial.dto.response.loan.*;
import com.financial.exception.BadRequestException;
import com.financial.exception.NotFoundException;
import com.financial.model.Loan;
import com.financial.model.User;
import com.financial.model.enums.LoanRate;
import com.financial.model.enums.LoanStatus;
import com.financial.repository.ILoanRepository;
import com.financial.service.AuthService;
import com.financial.service.ILoanService;
import com.financial.service.IPaymentService;
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
    private final IPaymentService paymentService;
    public LoanServiceImpl(UserMapper userMapper, AuthService authService, LoanMapper loanMapper, ILoanRepository loanRepository,IPaymentService paymentService) {
        this.authService = authService;
        this.loanMapper = loanMapper;
        this.loanRepository = loanRepository;
        this.paymentService = paymentService;
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
                .monthlyQuota(res.monthlyQuota())           // Asignar la cuota mensual del préstamo desde el DTO
                .termMonths(res.termMonths())               // Asignar el término del préstamo desde el DTO
                .interestRate(res.interestRate())           // Asignar la tasa de interés del préstamo desde el DTO
                .totalAmount(res.totalPayment())            // Asignar el monto total del préstamo desde el DTO
                .remainingBalance(res.totalPayment())       // Asignar el saldo restante del préstamo desde el DTO
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
                .orElseThrow(() -> new NotFoundException("Préstamo no encontrado"));
        loan.setStatus(LoanStatus.valueOf(status.toUpperCase()));
        loanRepository.save(loan);
    }

    @Override
    public ResponseLoanDTO refinanceLoan(UUID loanId, RequestRefinanceLoanDTO request) {
        MathContext mathContext = MathContext.DECIMAL128;
        Loan existingLoan = loanRepository.findById(loanId)
                .orElseThrow(() -> new NotFoundException("Préstamo no encontrado"));
        existingLoan.setRequestedAmount(request.newAmount());
        existingLoan.setTermMonths(request.newTermMonths());
        existingLoan.setInterestRate(request.newInterestRate().setScale(6, RoundingMode.HALF_UP));
        existingLoan.setStatus(LoanStatus.PENDING);

        loanRepository.save(existingLoan);
        return loanMapper.toResponseDTO(existingLoan);
    }

    @Override
    public String changeLoanStatus(UpdateStatusLoanRequestDTO dto) {
        Loan loanFound = loanRepository.findById(dto.loanId()).orElseThrow(() -> new NotFoundException("Préstamo no encontrado"));
        loanFound.setStatus(LoanStatus.valueOf(dto.status()));
        loanRepository.save(loanFound);
        // AGREGAR EMAIL
        return "Prestamo actualizado correctamente";
    }

    @Override
    @Transactional
    public void deleteLoan(UUID loanId) {
        Loan loan = loanRepository.findById(loanId)
                .orElseThrow(() -> new NotFoundException("Loan not found with ID: " + loanId));

        if (loan.getDeleted()) {
            throw new IllegalStateException("Loan is already marked as deleted.");
        }

        loan.setDeleted(true);
        loanRepository.save(loan);
    }

    @Override
    public List<Loan> getAllActiveLoans() {
        return loanRepository.findAllActiveLoans();
    }

    @Override
    public List<ResponseLoandAdminDTO> getLoansByStatus(String status) {
        List<Loan> loans = loanRepository.findAllByStatus(LoanStatus.valueOf(status.toUpperCase()));
        return loanMapper.toResponseADMDTOList(loans);
    }

    @Override
    public List<ResponseLoandAdminDTO> getLoansByUserId(UUID userId) {
        return loanMapper.toResponseADMDTOList(loanRepository.findByUserId(userId));
    }

    @Override
    public ResponseLoandAdminDTO updateLoanAdmin(UUID loanId, RequestLoanSimulationDTO dto) {
       Loan loanFound = loanRepository.findById(loanId).orElseThrow(() -> new NotFoundException("Préstamo no encontrado"));
        ResponseLoanCalculationsDTO res = loanCalculations(dto);
        loanFound.setRequestedAmount(res.requestedAmount());
        loanFound.setMonthlyQuota(res.monthlyQuota());       // Asignar la cuota mensual del préstamo desde el DTO
        loanFound.setTermMonths(res.termMonths());       // Asignar el término del préstamo desde el DTO
        loanFound.setInterestRate(res.interestRate());       // Asignar la tasa de interés del préstamo desde el DTO
        loanFound.setTotalAmount(res.totalPayment());
        loanRepository.save(loanFound);
        return loanMapper.toResponseADMDTO(loanFound);
    }

    @Override
    public String preApprove(UUID loanId) {
        Loan loanFound = loanRepository.findById(loanId).orElseThrow(() -> new NotFoundException("Préstamo no encontrado"));
        if(loanFound.getStatus() != LoanStatus.PENDING ) throw new BadRequestException("El préstamo no ha sido pre aprobado ya que su estado actual no es el de pending");
        loanFound.setStatus(LoanStatus.PRE_APPROVED);
        loanRepository.save(loanFound);
        //  TODO: ENVIAR UN EMAIL
        return "Prestamo pre aprobado correctamente!";
    }

    @Override
    public String approve(UUID loanId) {
        Loan loanFound = loanRepository.findById(loanId).orElseThrow(() -> new NotFoundException("Préstamo no encontrado"));
        if(loanFound.getStatus() != LoanStatus.PRE_APPROVED ) throw new BadRequestException("El préstamo no ha sido aprobado ya que su estado actual no es el de pre aprobado");
        loanFound.setStatus(LoanStatus.APPROVED);
        loanRepository.save(loanFound);
        //  TODO: ENVIAR UN EMAIL
        // TODO: GENERAR CUOTAS..
        paymentService.createPayment(loanFound.getLoanId());
        return "Prestamo aprobado correctamente!";
    }

    @Override
    public String declinedLoan(RequestDeclinedLoanDTO dto) {
        Loan loanFound = loanRepository.findById(dto.loanId()).orElseThrow(() -> new NotFoundException("Préstamo no encontrado"));
        loanFound.setStatus(LoanStatus.REFUSED);
        loanRepository.save(loanFound);
        // TODO: enviar el email al usuario
        return "Prestamo declinado correctamente!";
    }

    private List<PaymentScheduleDTO> generatePaymentSchedule(BigDecimal totalPayment, BigDecimal monthlyRate, BigDecimal monthlyQuota, Integer term, MathContext mathContext) {
        List<PaymentScheduleDTO> schedule = new ArrayList<>();
        BigDecimal remainingBalance = totalPayment.subtract(monthlyQuota, mathContext).setScale(2, RoundingMode.HALF_UP); // Saldo inicial es el monto del préstamo - la primera cuota
        BigDecimal interest = monthlyRate.setScale(2, RoundingMode.HALF_UP);
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

    private ResponseLoanCalculationsDTO loanCalculations(RequestLoanSimulationDTO requestLoan) {
        MathContext mathContext = MathContext.DECIMAL128;
        BigDecimal amount = requestLoan.requestedAmount().setScale(2, RoundingMode.HALF_UP);
        int term = requestLoan.termMonths();
        BigDecimal monthlyQuota = calculateLoan(amount, term).setScale(2, RoundingMode.HALF_UP);
        BigDecimal totalPayment = monthlyQuota.multiply(BigDecimal.valueOf(term), mathContext).setScale(2, RoundingMode.HALF_UP);
        BigDecimal rate = LoanRate.getRateByMonths(term).setScale(6, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(100), mathContext);
        return new ResponseLoanCalculationsDTO(monthlyQuota.setScale(2, RoundingMode.HALF_UP), totalPayment, amount, term, rate.setScale(2, RoundingMode.HALF_UP));
    }
}