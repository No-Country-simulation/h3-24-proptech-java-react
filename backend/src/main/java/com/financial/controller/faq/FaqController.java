package com.financial.controller.faq;

import com.financial.service.IOpenAIService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/faq")
public class FaqController {
    private final IOpenAIService iOpenAIService;

    public FaqController(IOpenAIService iOpenAIService) {
        this.iOpenAIService = iOpenAIService;
    }

    @GetMapping("/ask")
    public ResponseEntity<List<Object>> askFaq(
            @RequestParam(value = "question",
                    defaultValue = "¿Campo vacío o nulo?")
            String question)  {
        return ResponseEntity.ok(iOpenAIService.findSimilarDocuments(question));
    }
}
