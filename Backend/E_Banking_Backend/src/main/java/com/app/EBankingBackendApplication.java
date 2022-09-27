package com.app;

import java.io.File;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;


@SpringBootApplication
public class EBankingBackendApplication implements CommandLineRunner {
	
	
	@Value("${file.upload.location}")
	private String folderName;

	public static void main(String[] args) {
		SpringApplication.run(EBankingBackendApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println("in run " + folderName);
		// create images folder if it doesn't exist
		File dir = new File(folderName);
		if (!dir.exists()) {
			System.out.println("Created folder/s " + dir.mkdirs());
		} else
			System.out.println("folder alrdy exists");
	}
	
	//configure BCryptPassword encode bean
		@Bean
		public PasswordEncoder encoder()
		{
			return new BCryptPasswordEncoder();
		}

}
