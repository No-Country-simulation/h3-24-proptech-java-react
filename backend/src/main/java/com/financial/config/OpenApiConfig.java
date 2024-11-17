package com.financial.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@OpenAPIDefinition(
        info = @Info(
                title = "PropTech Financia.al",
                description = "La plataforma web permite conectar a inversores interesados en financiar la venta de terrenos en Latinoamérica con compradores potenciales. A través de herramientas avanzadas de análisis y métricas detalladas, los inversores pueden evaluar el rendimiento y riesgo de sus inversiones. Con un enfoque en la experiencia de usuario, la plataforma proporciona una interfaz intuitiva y transparente, facilitando la interacción fluida entre inversores y compradores en un entorno seguro y eficiente.",
                version = "1.0.0",
                contact = @Contact(
                        name = "Financia.al",
                        url = "Financia-al.com",
                        email = "Financia.al@proptech.com"
                ),
                license = @License(
                        name = "Standard Software Use License",
                        url = "https://Financia.al.com/license"
                )
        ),
        servers = {
                @Server(description = "Development Server", url = "http://localhost:8090"),
                @Server(description = "Production Server", url = "proximamente...")
        },
        security = @SecurityRequirement(name = "bearerAuth")
)
@SecurityScheme(
        name = "bearerAuth",
        description = "Bearer authentication scheme for accessing the API. A valid JWT token is required.",
        type = SecuritySchemeType.HTTP,
        scheme = "bearer",
        bearerFormat = "JWT"
)
@Configuration
public class OpenApiConfig implements WebMvcConfigurer {
    @Bean
    public GroupedOpenApi publicApi() {
        return GroupedOpenApi.builder()
                .group("public")
                .packagesToScan("com.financial")
                .build();
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry
                .addResourceHandler("/swagger-ui/**")
                .addResourceLocations("classpath:/META-INF/resources/swagger-ui/");
        registry
                .addResourceHandler("/v3/api-docs/**")
                .addResourceLocations("classpath:/META-INF/resources/openapi/");
    }
}
