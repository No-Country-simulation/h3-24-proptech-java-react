package com.financial.service.impl;

import com.financial.dto.request.loan.UploadLoanDocumentationDTO;
import com.financial.dto.response.loan.LoanDocumentationResponseDTO;
import com.financial.dto.response.loan.LoanDocumentationStatusDTO;
import com.financial.exception.LoanDocumentationNotFoundException;
import com.financial.exception.LoanNotFoundException;
import com.financial.model.CloudFile;
import com.financial.model.Loan;
import com.financial.model.LoanDocumentation;
import com.financial.model.enums.DocType;
import com.financial.model.enums.LoanStatus;
import com.financial.model.enums.UserType;
import com.financial.repository.ILoanDocumentationRepository;
import com.financial.repository.ILoanRepository;
import com.financial.service.FileUploadService;
import com.financial.service.ILoanDocumentsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class LoanDocumentsServiceImpl implements ILoanDocumentsService {
    private final ILoanRepository loanRepository;
    private final ILoanDocumentationRepository loanDocumentationRepository;
    private final FileUploadService fileUploadService;

    @Transactional
    @Override
    public LoanDocumentation attachOrUpdateDocumentToLoan(UUID loanId, UploadLoanDocumentationDTO uploadLoanDocumentationDto) {
        Loan loan = loanRepository.findById(loanId).orElseThrow(() -> new LoanNotFoundException(loanId));
        boolean isDocumentForGuarantee = uploadLoanDocumentationDto.getUserTypeAsEnum().equals(UserType.GUARANTOR);
        boolean isLoanPreApproved = loan.getStatus().equals(LoanStatus.PRE_APPROVED);
        if (isDocumentForGuarantee && !isLoanPreApproved) {
            throw new RuntimeException(String.format("Loan must be %s to upload guarantee documentation", LoanStatus.PRE_APPROVED.name()));
        }

        LoanDocumentation loanDocumentation = uploadLoanDocumentationDto.toLoanDocumentation();
        MultipartFile document = uploadLoanDocumentationDto.document();
        if (loan.hasDocument(loanDocumentation) && loanDocumentation.getDocType().onlyOneUploadIsAllowed()) {
            // Delete current file and upload new file
            LoanDocumentation existentLoanDocumentation = loan.getLoanDocumentation(loanDocumentation);
            fileUploadService.deleteFile(existentLoanDocumentation.getCloudFile().getPublicId());
            CloudFile updatedCloudFile = fileUploadService.uploadFile(document);
            existentLoanDocumentation.setCloudFile(updatedCloudFile);
            LoanDocumentation savedLoanDocumentation = loanDocumentationRepository.save(existentLoanDocumentation);
            log.info("Document successfully updated for loan {}", loanId);
            return savedLoanDocumentation;
        } else {
            // Upload and attach new file
            CloudFile cloudFile = fileUploadService.uploadFile(document);
            loanDocumentation.setUploadDate(LocalDate.now());
            loanDocumentation.setCloudFile(cloudFile);
            loanDocumentation.setLoan(loan);
            LoanDocumentation savedLoanDocumentation = loanDocumentationRepository.save(loanDocumentation);
            log.info("Document successfully uploaded and attached to loan {}", loanId);
            return savedLoanDocumentation;
        }
    }

    @Override
    public LoanDocumentationStatusDTO getDocumentationStatus(UUID loanId, @Nullable String guaranteeId) {
        Loan loan = loanRepository.findById(loanId).orElseThrow(() -> new LoanNotFoundException(loanId));
        LoanDocumentationStatusDTO status = new LoanDocumentationStatusDTO();
        boolean allDocumentsUploaded = true;
        for (DocType docType : DocType.values()) {
            List<LoanDocumentation> documents = loan.getDocumentsOfType(docType, guaranteeId);
            if (documents.isEmpty() || documents.size() < docType.getMinCount()) {
                allDocumentsUploaded = false;
            }
            status.addDocumentStatusPerType(LoanDocumentationStatusDTO.DocumentTypeStatus.builder()
                    .documentType(docType.name())
                    .documents(documents.stream().map(document -> LoanDocumentationStatusDTO.DocumentStatus.builder()
                            .id(document.getLoanDocumentationId().toString())
                            .file(document.getCloudFile())
                            .build()).toList()
                    )
                    .minRequired(docType.getMinCount())
                    .maxCount(docType.getMaxCount())
                    .currentCount(documents.size())
                    .build()
            );
        }
        status.setAllDocumentsUploaded(allDocumentsUploaded);
        return status;
    }

    @Override
    public void deleteLoanDocumentation(UUID loanId, UUID loanDocumentationId) {
        loanDocumentationRepository
                .getLoanDocumentationByLoan_LoanIdAndLoanDocumentationId(loanId, loanDocumentationId)
                .orElseThrow(() -> new LoanDocumentationNotFoundException(loanId, loanDocumentationId));
        loanDocumentationRepository.deleteById(loanDocumentationId);
    }

    @Override
    public List<LoanDocumentationResponseDTO> getDocsByLoanId(UUID loanId) {
        return loanDocumentationRepository.getLoanDocumentationByLoanId(loanId)
                .stream()
                .map(LoanDocumentationResponseDTO::toLoanDocumentationResponseDto)
                .toList();
    }
}
