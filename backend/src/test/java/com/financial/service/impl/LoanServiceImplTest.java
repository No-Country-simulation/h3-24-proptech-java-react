package com.financial.service.impl;

import com.financial.dto.request.loan.RequestLoanSimulationDTO;
import com.financial.dto.response.loan.PaymentScheduleDTO;
import com.financial.dto.response.loan.ResponseLoanSimulationDTO;
import com.financial.model.enums.LoanRate;
import com.financial.service.ILoanCalculatorService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.mockito.MockitoAnnotations;

import java.math.BigDecimal;
import java.math.RoundingMode;

import static org.junit.jupiter.api.Assertions.assertEquals;

class LoanServiceImplTest {
    private AutoCloseable closeable;
    private ILoanCalculatorService loanCalculatorService;

    @BeforeEach
    void setUp() {
        closeable = MockitoAnnotations.openMocks(this);
        loanCalculatorService = new LoanCalculatorServiceImpl();
    }

    @AfterEach
    void tearDown() throws Exception {
        closeable.close();
    }

    @ParameterizedTest
    @CsvSource({"11500.00,6", "30000.00,12"})
    void testSimulateLoan(String requestedAmount, String termMonths) {
        RequestLoanSimulationDTO requestLoanSimulation = new RequestLoanSimulationDTO(new BigDecimal(requestedAmount), Integer.valueOf(termMonths));
        BigDecimal loanRate = LoanRate.getRateByMonths(Integer.parseInt(termMonths));
        // Monthly quote is the loan rate multiplied by the term (in months)
        BigDecimal monthlyQuota = with2PrecisionAndHalfUpRounding(loanRate.multiply(new BigDecimal(requestedAmount)));
        // Total payment is the monthly quote multiplied by the total months
        BigDecimal totalPayment = with2PrecisionAndHalfUpRounding(monthlyQuota.multiply(new BigDecimal(termMonths)));

        ResponseLoanSimulationDTO responseSimulation = loanCalculatorService.simulateLoan(requestLoanSimulation);

        assertEquals(with2PrecisionAndHalfUpRounding(monthlyQuota), responseSimulation.monthlyQuota());
        assertEquals(with2PrecisionAndHalfUpRounding(totalPayment), responseSimulation.totalPayment());
        assertEquals(Integer.parseInt(termMonths), responseSimulation.schedule().size());

        for (PaymentScheduleDTO paymentSchedule : responseSimulation.schedule()) {
            assertEquals(
                    with2PrecisionAndHalfUpRounding(loanRate.multiply(BigDecimal.valueOf(100))),
                    with2PrecisionAndHalfUpRounding(paymentSchedule.interest())
            );
        }
    }

    private BigDecimal with2PrecisionAndHalfUpRounding(BigDecimal amount) {
        return amount.setScale(2, RoundingMode.HALF_UP);
    }

}