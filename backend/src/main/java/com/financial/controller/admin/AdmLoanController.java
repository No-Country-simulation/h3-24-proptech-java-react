package com.financial.controller.admin;


import com.financial.dto.customValidation.loanStatus.ValidLoanStatus;
import com.financial.dto.request.loan.RequestLoanSimulationDTO;
import com.financial.dto.request.loan.UpdateStatusLoanRequestDTO;
import com.financial.dto.response.loan.ResponseLoanDTO;
import com.financial.dto.response.loan.ResponseLoandAdminDTO;
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
    public ResponseEntity<List<ResponseLoandAdminDTO>> getLoansByStatus(
            @PathVariable
            @ValidLoanStatus
            String status
    ) {
        return ResponseEntity.ok(loanService.getLoansByStatus(status));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ResponseLoandAdminDTO>> getLoansByUserId(@PathVariable UUID userId) {

        return ResponseEntity.ok(loanService.getLoansByUserId(userId));
    }

    @GetMapping("/get-status")
    public ResponseEntity<List<String>> getStatus(){
        List<String> status = List.of( "APPROVED", "PRE_APPROVED", "REFUSED");
        return ResponseEntity.ok(status);
    }


    @PutMapping("/update-loan/{loanId}")
    public ResponseEntity<ResponseLoandAdminDTO> getStatus(@PathVariable UUID loanId, @RequestBody RequestLoanSimulationDTO dto){

        return ResponseEntity.ok(loanService.updateLoanAdmin(loanId, dto));
    }
}
