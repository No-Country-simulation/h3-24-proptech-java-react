package com.financial.service;

import java.util.List;

public interface IOpenAIService {
    List<Object> findSimilarDocuments(String question);
}
