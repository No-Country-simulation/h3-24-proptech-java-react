package com.financial;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class Application implements CommandLineRunner {
	@Autowired
	private PasswordEncoder passwordEncoder;
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
//		// Aquí puedes llamar al método para generar una contraseña
//		String passwordPlano = "Password123@";
//		String passwordCodificada = passwordEncoder.encode(passwordPlano);
//
//		// Mostrar la contraseña codificada en la consola
//		System.out.println("Contraseña codificada: " + passwordCodificada);
	}
}
