package com.financial.controller.admin;


import com.financial.dto.customValidation.loanStatus.ValidLoanStatus;
import com.financial.dto.request.loan.RequestDeclinedLoanDTO;
import com.financial.dto.request.loan.RequestLoanSimulationDTO;
import com.financial.dto.request.loan.UpdateStatusLoanRequestDTO;
import com.financial.dto.response.loan.ResponseLoanAdminDTO;
import com.financial.service.ILoanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin/loans")
@RequiredArgsConstructor
public class AdmLoanController {

    private final ILoanService loanService;


    @PutMapping("/change-status")
    public ResponseEntity<?> preApproveLoan(@RequestBody UpdateStatusLoanRequestDTO dto) {
        return ResponseEntity.ok(loanService.changeLoanStatus(dto));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<ResponseLoanAdminDTO>> getLoansByStatus(
            @PathVariable
            @ValidLoanStatus
            String status
    ) {
        return ResponseEntity.ok(loanService.getLoansByStatus(status));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ResponseLoanAdminDTO>> getLoansByUserId(@PathVariable UUID userId) {

        return ResponseEntity.ok(loanService.getLoansByUserId(userId));
    }

    @GetMapping("/get-status")
    public ResponseEntity<List<String>> getStatus(){
        List<String> status = List.of( "APPROVED", "PRE_APPROVED", "REFUSED");
        return ResponseEntity.ok(status);
    }


    @PutMapping("/update-loan/{loanId}")
    public ResponseEntity<ResponseLoanAdminDTO> getStatus(@PathVariable UUID loanId, @RequestBody RequestLoanSimulationDTO dto){

        return ResponseEntity.ok(loanService.updateLoanAdmin(loanId, dto));
    }

    @PutMapping("/pre-approve/{loanId}")
    public ResponseEntity<String> preApprove(@PathVariable UUID loanId){

        return ResponseEntity.ok(loanService.preApprove(loanId));
    }

    @PutMapping("/approve/{loanId}")
    public ResponseEntity<String> approve(@PathVariable UUID loanId){

        return ResponseEntity.ok(loanService.approve(loanId));
    }
    @PostMapping("/declined-loan")
    public ResponseEntity<String> declinedLoan(@RequestBody RequestDeclinedLoanDTO dto){
        String response = loanService.declinedLoan(dto);
        return ResponseEntity.ok(response);
    }
}
