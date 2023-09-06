package com.ozius.internship.project;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class  ProjectApplication {

	public static void main(String[] args) {
		new SpringApplicationBuilder()
				.sources(ProjectApplication.class)
				.profiles(
						SpringProfiles.PROD
				)
				.run(args);
	}

}

