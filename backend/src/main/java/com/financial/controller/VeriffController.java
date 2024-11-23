package com.financial.controller;
import com.financial.config.CurrentUser;
import com.financial.model.User;
import com.financial.model.veriffModels.VerificationResponse;
import com.financial.service.impl.VeriffServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/veriff")
@RequiredArgsConstructor
@Slf4j
public class VeriffController {
    private final VeriffServiceImpl veriffService;

    @PostMapping("/session")
    public ResponseEntity<String> createSession (@CurrentUser User user) {
        return ResponseEntity.ok().body(veriffService.createSession(user.getName(), user.getLastname(),user.getUserId().toString()));
    }

    @PostMapping("/decision")
    public  ResponseEntity webhookevent(@RequestBody VerificationResponse payload) {
        log.info(payload.toString());
        veriffService.decision(payload);
        return ResponseEntity.ok().body("OK");
    }
}
