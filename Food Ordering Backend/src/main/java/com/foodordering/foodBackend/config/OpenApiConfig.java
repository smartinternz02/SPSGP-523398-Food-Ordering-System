package com.foodordering.foodBackend.config;

import org.springframework.context.annotation.Bean;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

public class OpenApiConfig {
	@Bean
	public OpenAPI foodCartOpenAPI() {
		return new OpenAPI().info(
				new Info().title("Food Ordering Login").description("APIs for Food Ordering System logina and signup").version("1.0"));
	}
}
