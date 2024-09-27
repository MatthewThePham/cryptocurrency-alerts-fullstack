package com.crypto.cryptobackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;


@SpringBootApplication
@EnableScheduling   //scans for @Scheduled annotations and manages the scheduling tasks internally.
public class CryptobackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(CryptobackendApplication.class, args);
	}

}
