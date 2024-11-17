package com.financial.exception;

import com.financial.dto.response.ErrorResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice

public class GlobalExceptionHandler {

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
}
