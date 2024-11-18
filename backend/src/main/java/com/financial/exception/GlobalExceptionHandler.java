package com.financial.exception;

import com.financial.dto.response.ErrorResponseDto;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestControllerAdvice

public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        Map<String, String> validationErrors = new HashMap<>();
        List<ObjectError> validationErrorList = ex.getBindingResult().getAllErrors();

        validationErrorList.forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String validationMsg = error.getDefaultMessage();
            validationErrors.put(fieldName, validationMsg);
        });
        return new ResponseEntity<>(validationErrors, HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler({TokenExpiredException.class, InvalidTokenException.class})
    public ResponseEntity<ErrorResponseDto> handleTokenExceptions(RuntimeException ex) {
        ErrorResponseDto error = new ErrorResponseDto(
                ex.getClass().getSimpleName(),
                ex.getMessage()
        );
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(error);
    }
    @ExceptionHandler(TokenProcessingException.class)
    public ResponseEntity<ErrorResponseDto> handleTokenProcessingException(TokenProcessingException ex) {
        ErrorResponseDto error = new ErrorResponseDto(
                "TokenProcessingError",
                "Error interno al procesar el token"
        );
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(error);
    }


    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ErrorResponse> handleBadRequestException(BadRequestException ex ,WebRequest request) {
        ErrorResponse error = new ErrorResponse(
                ex.getMessage(),
                ex.getStatusCode(),
                request.getDescription(false)
        );
        return ResponseEntity.status(ex.getStatusCode())
                .body(error);
    }
    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFoundException(NotFoundException ex ,WebRequest request) {
        ErrorResponse error = new ErrorResponse(
                ex.getMessage(),
                ex.getStatusCode(),
                request.getDescription(false)
        );
        return ResponseEntity.status(ex.getStatusCode())
                .body(error);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleExceptionF(Exception ex ,WebRequest request) {
        ErrorResponse error = new ErrorResponse(
                ex.getMessage(),
                500,
                request.getDescription(false)
        );
        return ResponseEntity.status(500)
                .body(error);
    }
}
