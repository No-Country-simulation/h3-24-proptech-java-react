package com.financial.service.impl;

import com.financial.dto.request.profile.RequestCreateProfileDTO;
import com.financial.exception.BadRequestException;
import com.financial.model.User;
import com.financial.model.veriffDecisionModels.VerificationDecisionResponse;
import com.financial.model.veriffFullAutoModels.Insight;
import com.financial.model.veriffFullAutoModels.VerificationFullAutoResponse;
import com.financial.service.IProfileService;
import com.financial.service.IUserService;
import com.financial.utils.UUIDUtils;
import lombok.RequiredArgsConstructor;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;
import java.util.TimeZone;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class VeriffServiceImpl {
    private static final List<String> REQUIRED_LABELS = Arrays.asList(
            "documentAccepted",
            "documentFrontImageAvailable",
            "documentNotExpired",
            "documentRecognised",
            "faceImageAvailable",
            "faceSimilarToPortrait",
            "physicalDocumentPresent"
    );

    private final IUserService userService;
    private final IProfileService profileService;
    @Value("${veriff.url}")
    private String API_URL;  // Reemplaza con tu API Key
    @Value("${veriff.api-key}")
    private String API_KEY;  // URL de la API de Veriff
    @Value("${frontend.url}")
    private String FRONTEND_URL;

    public String createSession(String firstName, String lastName, String vendorData) {
        try {
            User userFound = userService.findUserById(UUID.fromString(vendorData));
            if (userFound.getIsVerified()) throw new BadRequestException("User is already verified");
            JSONObject verification = new JSONObject();

            JSONObject person = new JSONObject();
            person.put("firstName", firstName);
            person.put("lastName", lastName);

            verification.put("person", person);
            verification.put("vendorData", vendorData);
            verification.put("callback", String.format(FRONTEND_URL + "/loan/personal-information"));

            String timestamp = Instant.now().atZone(TimeZone.getDefault().toZoneId())
                    .format(DateTimeFormatter.ISO_INSTANT);
            verification.put("timestamp", timestamp);

            JSONObject requestBody = new JSONObject();
            requestBody.put("verification", verification);

            CloseableHttpClient client = HttpClients.createDefault();
            HttpPost postRequest = new HttpPost(API_URL);

            postRequest.setHeader("X-AUTH-CLIENT", API_KEY);
            postRequest.setHeader("Content-Type", "application/json");

            postRequest.setEntity(new StringEntity(requestBody.toString()));

            String responseString = EntityUtils.toString(client.execute(postRequest).getEntity());
            client.close();
            return responseString;

        } catch (Exception e) {
            e.printStackTrace();
            return "Error: " + e.getMessage();
        }
    }

    public void decision(VerificationDecisionResponse payload) {
        if(payload.verification().vendorData() != null && UUIDUtils.looksLikeUUID(payload.verification().vendorData().toString())) {
            User user = userService.findUserById(payload.verification().vendorData());
            if (!user.getIsVerified()) {
                String dni = payload.verification().document().number().replace(".", "").toUpperCase();
                if(user.getDni().equals(dni)) {
                    userService.validateIdentity(true, payload.verification().vendorData());
                    LocalDate birth = payload.verification().person().dateOfBirth();
                    String gender = payload.verification().person().gender();
                    String nationality = payload.verification().person().nationality();
                    String firstName = payload.verification().person().firstName();
                    String lastName = payload.verification().person().lastName();
                    RequestCreateProfileDTO profile = RequestCreateProfileDTO.builder()
                            .nationality(nationality)
                            .dateOfBirth(birth)
                            .gender(gender)
                            .firstNameAsInDni(firstName)
                            .lastNameAsInDni(lastName)
                            .build();
                    profileService.createProfileWithUser(profile, user);
                }
            }
        }

    }



    public void fullAuto(VerificationFullAutoResponse payload) {
        User user = userService.findUserById(UUID.fromString(payload.getVendorData()));
        if (!user.getIsVerified()) {
        boolean response = areLabelsValid(payload.getData().getVerification().getInsights());
        String dni = payload.getData().getVerification().getDocument().getNumber().getValue().replace(".", "").toUpperCase();
        if (user.getDni().equals(dni) && response) {
            userService.validateIdentity(true, UUID.fromString(payload.getVendorData()));
            LocalDate birth = LocalDate.parse(payload.getData().getVerification().getPerson().getDateOfBirth().getValue());
            String nationality = payload.getData().getVerification().getPerson().getNationality().getValue();
            String road = payload.getData().getVerification().getPerson().getAddress().getComponents().getRoad();
            String houseNumber = payload.getData().getVerification().getPerson().getAddress().getComponents().getHouseNumber();
            String city = payload.getData().getVerification().getPerson().getAddress().getComponents().getCity();
            String state = payload.getData().getVerification().getPerson().getAddress().getComponents().getState();
            String country = payload.getData().getVerification().getDocument().getCountry().getValue();
            String gender = payload.getData().getVerification().getPerson().getGender().getValue();
            RequestCreateProfileDTO profile = RequestCreateProfileDTO.builder()
                    .dateOfBirth(birth)
                    .nationality(nationality)
                    .road(road)
                    .houseNumber(houseNumber)
                    .city(city)
                    .state(state)
                    .country(country)
                    .gender(gender)
                    .build();
            profileService.createProfileWithUser(profile, user);
        }
        }
    }

    public boolean areLabelsValid(List<Insight> insights) {
        if (insights == null || insights.isEmpty()) {
            return false;
        }
        for (String requiredLabel : REQUIRED_LABELS) {
            boolean labelValid = insights
                    .stream()
                    .anyMatch(insight -> requiredLabel.equals(insight.getLabel()) && "yes".equals(insight.getResult()));
            if (!labelValid) {
                return false;
            }
        }
        return true;
    }

}
