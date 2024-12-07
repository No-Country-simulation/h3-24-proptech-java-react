package com.financial.service.impl;

import com.financial.config.mapper.LoanMapper;
import com.financial.config.mapper.ProfileMapper;
import com.financial.config.mapper.UserMapper;
import com.financial.dto.request.loan.RequestDeclinedLoanDTO;
import com.financial.dto.request.loan.RequestLoanSimulationDTO;
import com.financial.dto.request.loan.RequestRefinanceLoanDTO;
import com.financial.dto.request.loan.UpdateStatusLoanRequestDTO;
import com.financial.dto.response.loan.*;
import com.financial.exception.BadRequestException;
import com.financial.exception.LoanNotFoundException;
import com.financial.exception.NotFoundException;
import com.financial.model.Loan;
import com.financial.model.Profile;
import com.financial.model.User;
import com.financial.model.enums.LoanStatus;
import com.financial.repository.ILoanRepository;
import com.financial.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class LoanServiceImpl implements ILoanService {
    private final IEmailService emailService;
    private final ILoanRepository loanRepository;
    private final AuthService authService;
    private final IPaymentService paymentService;
    private final ILoanDocumentsService loanDocumentsService;
    private final ILoanCalculatorService loanCalculatorService;
    private final LoanMapper loanMapper;
    private final UserMapper userMapper;
    private final ProfileMapper profileMapper;

    @Transactional
    @Override
    public ResponseLoanDTO createLoan(UUID userId, RequestLoanSimulationDTO request) {
        User user = authService.getUserById(userId);
        var res = loanCalculatorService.loanCalculations(request);
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
        emailService.sendLoanStatusUpdateEmail(loan.getUser().getEmail(), loan.getUser().getName(), LoanStatus.INITIATED.name());
        return loanMapper.toResponseDTO(loan);
    }

    @Override
    public LoanDetailsResponseDTO getLoanDetails(UUID loanId) {
        Loan loan = loanRepository.findById(loanId).orElseThrow(() -> new LoanNotFoundException(loanId));
        User user = loan.getUser();
        Profile profile = user.getProfile();
        var loanDocumentationStatuses = loanDocumentsService.getDocumentationStatusForLoan(loanId);
        return new LoanDetailsResponseDTO(
                loanMapper.toResponseDTO(loan),
                userMapper.toUserResponseDTO(user),
                profileMapper.toResponseProfileDto(profile),
                loanDocumentationStatuses
        );
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
    public List<ResponseLoanAdminDTO> getLoansByStatus(String status) {
        List<Loan> loans = loanRepository.findAllByStatus(LoanStatus.valueOf(status.toUpperCase()));
        return loanMapper.toResponseADMDTOList(loans);
    }

    @Override
    public List<ResponseLoanAdminDTO> getLoansByUserId(UUID userId) {
        return loanMapper.toResponseADMDTOList(loanRepository.findByUserId(userId));
    }

    @Override
    public ResponseLoanAdminDTO updateLoanAdmin(UUID loanId, RequestLoanSimulationDTO dto) {
        Loan loanFound = loanRepository.findById(loanId).orElseThrow(() -> new NotFoundException("Préstamo no encontrado"));
        ResponseLoanCalculationsDTO res = loanCalculatorService.loanCalculations(dto);
        loanFound.setRequestedAmount(res.requestedAmount());
        loanFound.setMonthlyQuota(res.monthlyQuota());       // Asignar la cuota mensual del préstamo desde el DTO
        loanFound.setTermMonths(res.termMonths());       // Asignar el término del préstamo desde el DTO
        loanFound.setInterestRate(res.interestRate());       // Asignar la tasa de interés del préstamo desde el DTO
        loanFound.setTotalAmount(res.totalPayment());
        loanRepository.save(loanFound);
        return loanMapper.toResponseADMDTO(loanFound);
    }

    @Override
    public String changeLoanStatus(UpdateStatusLoanRequestDTO dto) {
        Loan loanFound = loanRepository.findById(dto.loanId()).orElseThrow(() -> new NotFoundException("Préstamo no encontrado"));
        loanFound.setStatus(LoanStatus.valueOf(dto.status()));
        loanRepository.save(loanFound);
        // TODO: AGREGAR EMAIL
        emailService.sendLoanStatusUpdateEmail(loanFound.getUser().getEmail(), loanFound.getUser().getName(), LoanStatus.PRE_APPROVED.name());
        return "Préstamo actualizado correctamente";
    }

    @Override
    public String preApprove(UUID loanId) {
        Loan loanFound = loanRepository.findById(loanId).orElseThrow(() -> new NotFoundException("Préstamo no encontrado"));
        if (loanFound.getStatus() != LoanStatus.PENDING) {
            throw new BadRequestException("El préstamo no ha sido pre aprobado ya que su estado actual no es el de pending");
        }
        loanFound.setStatus(LoanStatus.PRE_APPROVED);
        loanRepository.save(loanFound);
        emailService.sendLoanStatusUpdateEmail(loanFound.getUser().getEmail(), loanFound.getUser().getName(), LoanStatus.PRE_APPROVED.name());
        return "Préstamo pre aprobado correctamente!";
    }

    @Override
    public String approve(UUID loanId) {
        Loan loanFound = loanRepository.findById(loanId).orElseThrow(() -> new NotFoundException("Préstamo no encontrado"));
        if (loanFound.getStatus() != LoanStatus.PRE_APPROVED) {
            throw new BadRequestException("El préstamo no ha sido aprobado ya que su estado actual no es el de pre aprobado");
        }
        loanFound.setStatus(LoanStatus.APPROVED);
        loanRepository.save(loanFound);
        emailService.sendLoanStatusUpdateEmail(loanFound.getUser().getEmail(), loanFound.getUser().getName(), LoanStatus.APPROVED.name());
        paymentService.createPaymentSchedule(loanFound.getLoanId());
        return "Préstamo aprobado correctamente!";
    }

    @Override
    public String declinedLoan(RequestDeclinedLoanDTO dto) {
        Loan loanFound = loanRepository.findById(dto.loanId()).orElseThrow(() -> new NotFoundException("Préstamo no encontrado"));
        loanFound.setStatus(LoanStatus.REFUSED);
        loanRepository.save(loanFound);
        emailService.sendLoanRejectionEmail(loanFound.getUser().getEmail(), loanFound.getUser().getName(), LoanStatus.REFUSED.name(), dto.message());
        return "Préstamo declinado correctamente!";
    }

    @Transactional
    @Override
    public LoanMovedToPendingResultDTO setLoanToPendingStatus(UUID loanId) {
        // Check if the user associated with this loan is verified.
        Loan loan = loanRepository.findById(loanId).orElseThrow(() -> new LoanNotFoundException(loanId));
        if (LoanStatus.PENDING.equals(loan.getStatus())) {
            return new LoanMovedToPendingResultDTO(false, "Loan already in PENDING status");
        }
        User user = loan.getUser();
        Profile profile = user.getProfile();
        if (!user.getIsVerified() || profile == null) {
            return new LoanMovedToPendingResultDTO(false, "The user associated with this loan is not verified");
        }

        // The user's monthly income it's at least 3 times the loan monthly quota.
        BigDecimal monthlyIncome = profile.getMonthlyIncome();
        BigDecimal loanQuota = loan.getMonthlyQuota();
        boolean monthlyIncomeIsAtLeastThreeTimesThanLoanQuota = loanQuota.multiply(BigDecimal.valueOf(3)).compareTo(monthlyIncome) <= 0;
        if (!monthlyIncomeIsAtLeastThreeTimesThanLoanQuota) {
            return new LoanMovedToPendingResultDTO(false, "Monthly income must be at least 3 times than loan quota");
        }

        // There's at least 2 guarantees
        Set<String> guaranteeIds = loan.getTrackedGuaranteeIds();
        if (guaranteeIds.size() < 2) {
            return new LoanMovedToPendingResultDTO(false, "At least 2 guarantees are required");
        }

        // The holder and each guarantee have successfully uploaded all the required documents.
        LoanDocumentationStatusDTO holderStatus = loanDocumentsService.getDocumentationStatusForHolderOrGuarantee(loanId, null);
        if (!holderStatus.isAllDocumentsUploaded()) {
            return new LoanMovedToPendingResultDTO(false, "Not all documents are uploaded for the holder");
        }
        for (String guaranteeId : guaranteeIds) {
            LoanDocumentationStatusDTO guaranteeStatus = loanDocumentsService.getDocumentationStatusForHolderOrGuarantee(loanId, guaranteeId);
            if (!guaranteeStatus.isAllDocumentsUploaded()) {
                return new LoanMovedToPendingResultDTO(false, "Not all documents are uploaded for guarantee " + guaranteeId);
            }
        }

        loan.setStatus(LoanStatus.PENDING);
        loanRepository.save(loan);
        emailService.sendLoanStatusUpdateEmail(loan.getUser().getEmail(), loan.getUser().getName(), LoanStatus.PENDING.name());
        return new LoanMovedToPendingResultDTO(true, "Loan successfully moved to PENDING status");
    }

}