package com.financial.service.impl;

import com.financial.service.IOpenAIService;
import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OpenAIServiceImpl implements IOpenAIService {
    private final VectorStore vectorStore;

    public OpenAIServiceImpl(VectorStore vectorStore) {
        this.vectorStore = vectorStore;
    }

    @Override
    public List<Object> findSimilarDocuments(String question) {
        List<Document> similarDocuments = vectorStore.similaritySearch(SearchRequest.query(question).withTopK(1)); // Realizar la búsqueda de similitudes
        return similarDocuments.stream() // Mapear los resultados para obtener solo las respuestas, no las preguntas
                .map(doc -> doc.getMetadata().get("answer"))  // Accede a la respuesta en el campo "answer"
                .collect(Collectors.toList());
    }
}
