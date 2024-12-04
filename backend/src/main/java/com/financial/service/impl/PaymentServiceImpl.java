package com.financial.service.impl;

import com.financial.config.mapper.PaymentMapper;
import com.financial.dto.response.PaymentDetailsResponseDTO;
import com.financial.dto.response.PaymentResponseDTO;
import com.financial.exception.LoanNotFoundException;
import com.financial.exception.NotFoundException;
import com.financial.exception.PaymentNotFoundException;
import com.financial.model.GeneratedPayment;
import com.financial.model.Loan;
import com.financial.model.Payment;
import com.financial.model.enums.LateFeeRate;
import com.financial.model.enums.PaymentStatus;
import com.financial.model.enums.PaymentType;
import com.financial.repository.IGeneratedPaymentRepository;
import com.financial.repository.ILoanRepository;
import com.financial.repository.IPaymentRepository;
import com.financial.service.IPaymentService;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Log4j2
@Service
public class PaymentServiceImpl implements IPaymentService {
    private final ILoanRepository loanRepository;
    private final IPaymentRepository paymentRepository;
    private final IGeneratedPaymentRepository iGeneratedPaymentRepository;
    private final PaymentMapper paymentMapper;

    public PaymentServiceImpl(IPaymentRepository paymentRepository, PaymentMapper paymentMapper, ILoanRepository loanRepository, IGeneratedPaymentRepository iGeneratedPaymentRepository) {
        this.paymentRepository = paymentRepository;
        this.loanRepository = loanRepository;
        this.paymentMapper = paymentMapper;
        this.iGeneratedPaymentRepository = iGeneratedPaymentRepository;
    }

    /**
     * Implementación del método para generar el cronograma de pagos de un préstamo aprobado.
     * Este método realiza los siguientes pasos:
     * <ol>
     *   <li>Busca el préstamo correspondiente al ID proporcionado en el repositorio de préstamos.</li>
     *   <li>Verifica si el préstamo existe; en caso contrario, lanza una excepción {@link LoanNotFoundException}.</li>
     *   <li>Obtiene los detalles del préstamo, como el monto solicitado, la tasa de interés,
     *       el plazo en meses, y la cuota mensual previamente calculada.</li>
     *   <li>Calcula la fecha de vencimiento inicial como el primer día del mes siguiente.</li>
     *   <li>Itera por el número de meses del plazo del préstamo para generar un pago por cada cuota,
     *       configurando atributos como el monto, la fecha de vencimiento, la fecha límite para pagar sin interés,
     *       y el número de la cuota.</li>
     *   <li>Establece el estado inicial del pago como {@link PaymentStatus#PENDING} y configura otras propiedades predeterminadas
     *       como la multa por atraso (inicialmente cero).</li>
     *   <li>Guarda todos los pagos generados en el repositorio de pagos.</li>
     * </ol>
     *
     * @param loanId El ID del préstamo aprobado para el cual se generará el cronograma de pagos.
     * @throws LoanNotFoundException Si no se encuentra un préstamo con el ID proporcionado.
     */
    @Transactional
    @Override
    public void createPaymentSchedule(UUID loanId) {
        Loan loan = loanRepository.findById(loanId)
                .orElseThrow(() -> new LoanNotFoundException("Loan with ID " + loanId + " not found"));

        BigDecimal requestedAmount = loan.getRequestedAmount(); // Monto solicitado
        BigDecimal interestRate = loan.getInterestRate();       // Tasa de interés
        int termMonths = loan.getTermMonths();                  // Término en meses
        BigDecimal monthlyQuota = loan.getMonthlyQuota();       // Cuota mensual (ya calculada)
        LocalDate firstDueDate = LocalDate.now().withDayOfMonth(1).plusMonths(1); // Primer día del mes siguiente

        List<Payment> payments = new ArrayList<>();
        for (int month = 1; month <= termMonths; month++) {
            LocalDate dueDate = firstDueDate.plusMonths(month);  // Fecha estimada de pago por mes 1 de cada mes siguiente
            Payment payment = new Payment();
            payment.setLoan(loan);
            payment.setAmount(monthlyQuota);
            payment.setDueDate(dueDate);                         // Fecha estimada para la cuota
            payment.setPayLimitDate(dueDate.withDayOfMonth(10)); // Fecha límite para pagar sin interés
            payment.setPaymentDate(null);                        // Inicialmente sin pago realizado
            payment.setStatus(PaymentStatus.PENDING);            // Estado inicial del pago
            payment.setLateFee(BigDecimal.ZERO);                 // No hay interés por atraso al principio
            payment.setLateFeeApplied(false);                    // No se aplica el interés aún
            payment.setInterestRate(interestRate);               // Tasa de interés para el pago
            payment.setPaidOnTime(false);                        // Asumimos que no se pagó a tiempo aún
            payment.setInstallmentNumber(month);                 // Asignar el número de la cuota
            payments.add(payment);
            paymentRepository.saveAll(payments);
        }
    }

    /**
     * Procesa el pago de una cuota específica de un préstamo, aplicando interés por mora si corresponde.
     * Este método realiza las siguientes operaciones:
     * <ol>
     *   <li>Busca el pago correspondiente al préstamo y número de cuota en el repositorio de pagos.</li>
     *   <li>Si no se encuentra el pago o este no ha sido generado, lanza una excepción {@link PaymentNotFoundException}.</li>
     *   <li>Registra la fecha de pago (usando la fecha actual como predeterminada).</li>
     *   <li>Determina si el pago se realizó dentro del plazo estipulado
     *       (antes o durante la fecha de vencimiento de la cuota).</li>
     *   <li>Calcula y aplica el interés por mora si el pago se realizó fuera del plazo
     *       y aún no se había aplicado una multa.</li>
     *   <li>Actualiza el estado del pago a {@link PaymentStatus#PAID} si se realizó a tiempo,
     *       o a {@link PaymentStatus#LATE} si se realizó tarde.</li>
     *   <li>Guarda el pago actualizado en el repositorio.</li>
     * </ol>
     *
     * @param loanId El ID del préstamo al cual pertenece la cuota a pagar.
     * @param installmentNumber El número de la cuota que se está pagando.
     * @throws PaymentNotFoundException Si no se encuentra el pago o si el pago no ha sido generado.
     */
    @Transactional
    public void processPayment(UUID loanId, int installmentNumber) {
        // Fecha de pago simulada (primer día del mes de marzo)
        //LocalDate paymentDate = LocalDate.now().withDayOfMonth(12).plusMonths(8);
        LocalDate paymentDate = LocalDate.now(); // Fecha de pago actual

        Payment payment = paymentRepository.findByLoan_LoanIdAndInstallmentNumber(loanId, installmentNumber)
                .orElseThrow(() -> new PaymentNotFoundException("Payment for loan " + loanId + " and quota " + installmentNumber + " not found"));  // Buscar el pago correspondiente al préstamo y número de cuota
        if (!payment.isGenerated()) {
            throw new PaymentNotFoundException("El pago para el préstamo con ID " + loanId + " y la cuota número " + installmentNumber + " aún no ha sido generado. Recuerda que esta cuota debería generarse a principios de mes.");
        }
        payment.setPaymentDate(paymentDate);
        LocalDate payLimit = payment.getDueDate();

        int lateDays = (int) ChronoUnit.DAYS.between(payLimit, paymentDate); // Calcular días de atraso (positivo si hay atraso, 0 si a tiempo, negativo si adelantado)
        boolean paidOnTime = lateDays <= 0; // Se considera a tiempo si no hay días de atraso
        payment.setPaidOnTime(paidOnTime);

        if (!paidOnTime) {  // Si el pago se realizó tarde
            if (!payment.isLateFeeApplied()) {
                BigDecimal lateFeeRate = LateFeeRate.getLateFeeRate(lateDays, false); // Obtener la tasa de interés por mora en función de los días de atraso

                if (lateDays > 10) {
                    BigDecimal dailyInterest = lateFeeRate.multiply(BigDecimal.valueOf(lateDays));  // Calcular el monto del interés por mora por cada día de atraso
                    BigDecimal lateFee = payment.getAmount().multiply(dailyInterest).setScale(2, RoundingMode.HALF_UP);
                    int totalInstallments = payment.getLoan().getTermMonths();
                    if (installmentNumber == totalInstallments) {
                        payment.setAmount(payment.getAmount().add(lateFee)); // Si es la última cuota, se suma el interés al monto total
                    } else {
                        applyLateFeeToNextInstallment(loanId, installmentNumber, lateFee); // Si no es la última cuota, se pasa el interés a la siguiente cuota
                    }
                } else {
                    payment.setLateFee(BigDecimal.ZERO);
                }
                payment.setLateFeeApplied(true); // Marcamos que el interés fue aplicado
            }
        } else {
            payment.setLateFee(BigDecimal.ZERO);
            payment.setLateFeeApplied(false);
        }
        GeneratedPayment generatedPayment = null;
        Pageable pageable = PageRequest.of(0, 1);  // Solo resultado
        Page<GeneratedPayment> payments = iGeneratedPaymentRepository.findTopByLoanIdAndPaymentTypeAndStatusOrderByInstallmentNumberAsc(loanId, PaymentType.ON_TIME.name(), pageable);
        if (!payments.hasContent()) {
            throw new PaymentNotFoundException("No matching generated payment found for loanId: " + loanId);
        }

        if (payments.hasContent()) {
            generatedPayment = payments.getContent().getFirst();
            generatedPayment.setStatus(PaymentStatus.PAID.name());
            iGeneratedPaymentRepository.save(generatedPayment);
        }
        Loan loan = payment.getLoan();
        loan.setRemainingBalance(loan.getRemainingBalance().subtract(payment.getAmount())); // Actualizar el saldo del préstamo
        loanRepository.save(loan);
        payment.setStatus(paidOnTime ? PaymentStatus.PAID : PaymentStatus.LATE); // Estado del pago (PAID o LATE)
        paymentRepository.save(payment);
    }

    /**
     * Genera los detalles de pago para una cuota específica de un préstamo, incluyendo el monto total a pagar
     * (cuota + interés por mora si corresponde) y el estado del interés por mora.
     * Este método realiza las siguientes operaciones:
     * <ol>
     *   <li>Busca el pago correspondiente al préstamo y número de cuota en el repositorio de pagos.</li>
     *   <li>Si no se encuentra el pago, lanza una excepción {@link PaymentNotFoundException}.</li>
     *   <li>Obtiene el monto de la cuota y el interés por mora asociado al pago.</li>
     *   <li>Calcula el monto total a pagar (cuota + interés por mora).</li>
     *   <li>Determina si se ha aplicado el interés por mora y genera un estado apropiado (APPLIED o NOT_APPLIED).</li>
     *   <li>Devuelve un objeto {@link PaymentDetailsResponseDTO} con todos los detalles generados.</li>
     * </ol>
     *
     * @param loanId El ID del préstamo al cual pertenece la cuota a pagar.
     * @param installmentNumber El número de la cuota para la cual se generan los detalles de pago.
     * @return Un objeto {@link PaymentDetailsResponseDTO} con los detalles del pago de la cuota.
     * @throws PaymentNotFoundException Si no se encuentra el pago para el préstamo y número de cuota proporcionados.
     */
    public PaymentDetailsResponseDTO generatePaymentForMonth(UUID loanId, int installmentNumber) {
        // Buscar el pago correspondiente al préstamo y número de cuota
        Payment payment = paymentRepository.findByLoan_LoanIdAndInstallmentNumber(loanId, installmentNumber)
                .orElseThrow(() -> new PaymentNotFoundException("Payment for loan " + loanId + " and installment " + installmentNumber + " not found"));

        BigDecimal installmentAmount = payment.getAmount();
        BigDecimal lateFee = payment.getLateFee();
        // Calcular el monto total a pagar (monto de la cuota + interés por mora si aplica)
        BigDecimal totalAmountWithInterests = installmentAmount.add(lateFee);
        String lateFeeStatus = lateFee.compareTo(BigDecimal.ZERO) > 0 ? "APPLIED" : "NOT_APPLIED"; // Determinar el estado del interés (si fue aplicado o no)
        return new PaymentDetailsResponseDTO(
                loanId,                           // El ID del préstamo
                installmentNumber,                // El número de la cuota
                installmentAmount,                // Monto de la cuota
                payment.getDueDate(),             // Fecha de vencimiento de la cuota
                payment.getPayLimitDate(),        // Fecha límite para pagar sin interés
                lateFee,                          // Monto de la penalización por mora (si aplica)
                lateFeeStatus,                    // Estado del interés por mora: "APPLIED" o "NOT_APPLIED"
                totalAmountWithInterests,         // Monto total de la cuota a pagar (con o sin interés)
                BigDecimal.ZERO,                  // El monto total de la cuota incluyendo descuento por adelanto. Si no, será 0.
                BigDecimal.ZERO                   // El monto del interés por adelanto si es que se aplicó, si no, será 0.
        );
    }

    @Override
    public Payment getPaymentById(UUID paymentId) {
        return paymentRepository.findByPaymentId(paymentId)
                .orElseThrow(() -> new PaymentNotFoundException("Payment not found with ID: " + paymentId));
    }

    @Override
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    @Override
    public List<Payment> getPaymentsByStatus(PaymentStatus status) {
        return paymentRepository.findByStatus(status);
    }

    @Override
    public List<Payment> getPaymentsByLoan(UUID loanId) {
        return paymentRepository.findByLoan_LoanId(loanId);
    }

    /**
     * Método para actualizar el estado de un pago específico identificado por su ID.
     *
     * @param paymentId El identificador único del pago que se desea actualizar.
     * @param status El nuevo estado del pago (por ejemplo, PENDIENTE, PAGADO, etc.).
     * @return El pago actualizado con el nuevo estado.
     * @throws NotFoundException Si no se encuentra un pago con el ID proporcionado.
     */
    @Override
    public Payment updatePaymentStatus(UUID paymentId, PaymentStatus status) {
        Optional<Payment> paymentOptional = paymentRepository.findById(paymentId);
        if (paymentOptional.isPresent()) {
            Payment payment = paymentOptional.get();
            payment.setStatus(status);
            return paymentRepository.save(payment);
        } else {
            throw new NotFoundException("Payment not found with ID: " + paymentId);
        }
    }

    /**
     * Método para obtener el último pago realizado de un préstamo específico.
     *
     * @param loanId El identificador único del préstamo cuyo último pago se desea obtener.
     * @return El último pago realizado con estado "PAID" o "PAID_ADVANCE" para el préstamo, o null si no se han realizado pagos.
     */
    public PaymentResponseDTO getLastPaidPayment(UUID loanId) {
        Optional<Payment> paymentOptional = paymentRepository.findTopByLoan_LoanIdAndStatusInOrderByInstallmentNumberDesc(
                loanId, List.of(PaymentStatus.PAID, PaymentStatus.PAID_ADVANCE));
        return paymentOptional.map(paymentMapper::toPaymentDetailsResponseDTO).orElse(null);
    }

    @Override
    public List<PaymentResponseDTO> getPendingPayments(UUID loanId) {
        if (loanId == null) {
            throw new IllegalArgumentException("Loan ID must be valid.");
        }
        List<Payment> paymentEntities = paymentRepository.findPendingPayments(loanId);
        return paymentEntities.stream()
                .map(paymentMapper::toPaymentDetailsResponseDTO)
                .toList();
    }

    /**
     * Aplica un cargo por mora a la siguiente cuota pendiente de un préstamo.
     * Este método realiza las siguientes operaciones:
     * <ol>
     *   <li>Busca en el repositorio el pago correspondiente al préstamo y al número de la siguiente cuota.</li>
     *   <li>Si no se encuentra el pago, lanza una excepción {@link PaymentNotFoundException}.</li>
     *   <li>Establece el cargo por mora (lateFee) en la cuota siguiente.</li>
     *   <li>Guarda el pago actualizado en el repositorio.</li>
     * </ol>
     *
     * @param loanId El ID del préstamo al que pertenece la cuota.
     * @param currentInstallmentNumber El número de la cuota actual para calcular la cuota siguiente.
     * @param lateFee El monto del cargo por mora que se aplicará a la siguiente cuota.
     * @throws PaymentNotFoundException Si no se encuentra la cuota correspondiente al préstamo y número proporcionados.
     */
    @Transactional
    public void applyLateFeeToNextInstallment(UUID loanId, int currentInstallmentNumber, BigDecimal lateFee) {
        Payment nextPending = paymentRepository.findByLoan_LoanIdAndInstallmentNumber(loanId, currentInstallmentNumber + 1)
                .orElseThrow(() -> new PaymentNotFoundException("Payment for loan " + loanId + " and installment " + currentInstallmentNumber + " not found"));
        nextPending.setLateFee(lateFee);
        paymentRepository.save(nextPending);
    }

    /**
     * Procesa un pago adelantado para una cuota de un préstamo.
     * Solo se permite adelantar pagos entre el 1 y el 10 de cada mes.
     * Calcula el descuento sobre la cuota y actualiza el saldo restante del préstamo y el estado del pago.
     *
     * @param loanId El ID del préstamo.
     * @param installmentNumber El número de la cuota a adelantar.
     * @throws IllegalStateException Si el pago ya ha sido realizado o si la fecha actual no está dentro del rango permitido (1-10).
     * @throws PaymentNotFoundException Si no se encuentra el pago correspondiente.
     */
    @Transactional
    public void processAdvancePayment(UUID loanId, int installmentNumber) {
        LocalDate paymentDate = LocalDate.now();

        int dayOfMonth = paymentDate.getDayOfMonth(); // Rango permitido para adelantos (1-10 de cada mes)
        if (dayOfMonth < 1 || dayOfMonth > 10) {
            throw new PaymentNotFoundException("Solo puedes adelantar pagos entre el día 1 y el día 10 de cada mes.");
        }

        Payment payment = paymentRepository.findByLoan_LoanIdAndInstallmentNumber(loanId, installmentNumber)
                .orElseThrow(() -> new PaymentNotFoundException(
                        "El pago para el préstamo con ID " + loanId + " y la cuota número " + installmentNumber + " no fue encontrado."
                ));

        if (payment.getStatus() == PaymentStatus.PAID || payment.getStatus() == PaymentStatus.PAID_ADVANCE) {
            throw new PaymentNotFoundException("La cuota número " + installmentNumber + " ya ha sido pagada o adelantada.");
        }
        
        BigDecimal installmentAmount = payment.getAmount();

        BigDecimal discountRate = LateFeeRate.getLateFeeRate(0, true); // Tasa de descuento del 5%
        BigDecimal discount = installmentAmount.multiply(discountRate).setScale(2, RoundingMode.HALF_UP);
        BigDecimal finalAmount = installmentAmount.subtract(discount);

        payment.setPaymentDate(paymentDate);
        payment.setAmount(finalAmount); // Actualizar con el monto descontado
        payment.setPaidOnTime(true);
        payment.setStatus(PaymentStatus.PAID_ADVANCE);
        GeneratedPayment generatedPayment = null;
        Pageable pageable = PageRequest.of(0, 1);  // Solo resultado
        Page<GeneratedPayment> payments = iGeneratedPaymentRepository.findTopByLoanIdAndPaymentTypeAndStatusOrderByInstallmentNumberAsc(loanId, PaymentType.ADVANCE.name(), pageable);
        if (!payments.hasContent()) {
            throw new PaymentNotFoundException("No matching generated payment found for loanId: " + loanId);
        }
        if (payments.hasContent()) {
            generatedPayment = payments.getContent().getFirst();
            generatedPayment.setStatus(PaymentStatus.PAID.name());
            iGeneratedPaymentRepository.save(generatedPayment);
        }
        Loan loan = payment.getLoan();
        loan.setRemainingBalance(loan.getRemainingBalance().subtract(finalAmount)); // Reducir el saldo restante
        loanRepository.save(loan);
        paymentRepository.save(payment);
        log.info("El pago adelantado de la cuota número {} ha sido procesado correctamente.", installmentNumber);
    }

    /**
     * Genera los detalles de un pago adelantado para una cuota del préstamo.
     * Calcula el monto con el descuento aplicado sobre la cuota.
     *
     * @param loanId El ID del préstamo.
     * @param installmentNumber El número de la cuota para la cual se genera el pago.
     * @return Un objeto PaymentDetailsResponseDTO con los detalles del pago adelantado.
     * @throws PaymentNotFoundException Si no se encuentra el pago correspondiente.
     * @throws IllegalStateException Si el pago ya ha sido realizado.
     */
    @Override
    public PaymentDetailsResponseDTO generatePaymentForMonthAdvance(UUID loanId, int installmentNumber) {
        Payment payment = paymentRepository.findByLoan_LoanIdAndInstallmentNumber(loanId, installmentNumber) // Buscar el pago correspondiente al préstamo y número de cuota
                .orElseThrow(() -> new PaymentNotFoundException(
                        "El pago para el préstamo con ID " + loanId + " y la cuota número " + installmentNumber + " no fue encontrado."
                ));

        if (payment.getStatus() == PaymentStatus.PAID) {
            throw new IllegalStateException("La cuota número " + installmentNumber + " ya fue pagada.");
        }

        BigDecimal installmentAmount = payment.getAmount();
        BigDecimal discountRate = LateFeeRate.getLateFeeRate(0, true); // Obtener el 5% como descuento
        BigDecimal discount = installmentAmount.multiply(discountRate).setScale(2, RoundingMode.HALF_UP);

        BigDecimal totalAmountWithDiscount = installmentAmount.subtract(discount); // Monto total con descuento

        return new PaymentDetailsResponseDTO(
                loanId,                           // El ID del préstamo
                installmentNumber,                // El número de la cuota
                installmentAmount,                // Monto base de la cuota
                payment.getDueDate(),             // Fecha de vencimiento original
                payment.getPayLimitDate(),        // Fecha límite para el pago
                BigDecimal.ZERO,                  // Sin mora para pagos adelantados
                "NOT_APPLIED",                    // No aplica mora en pagos adelantados
                BigDecimal.ZERO,
                totalAmountWithDiscount,          // Monto total con descuento
                discountRate.multiply(BigDecimal.valueOf(100))
        );
    }

    /**
     * Obtiene las cuotas pendientes de un préstamo, limitando el número de cuotas a devolver.
     *
     * @param loanId El ID del préstamo.
     * @param numberOfInstallments El número de cuotas pendientes a obtener.
     * @return Una lista de PaymentResponseDTO con las cuotas pendientes.
     * @throws IllegalArgumentException Si el loanId o el número de cuotas no son válidos.
     */
    @Override
    public List<PaymentResponseDTO> getPendingInstallments(UUID loanId, int numberOfInstallments) {
        if (loanId == null || numberOfInstallments <= 0) {
            throw new IllegalArgumentException("Loan ID and number of installments must be valid.");
        }
        List<Payment> paymentEntities = paymentRepository.findPendingInstallments(loanId, Pageable.ofSize(numberOfInstallments));
        return paymentEntities.stream()
                .map(paymentMapper::toPaymentDetailsResponseDTO)
                .toList();
    }

    @Transactional
    @Override
    public Payment savePayment(Payment payment) {
        return paymentRepository.save(payment);
    }
}
