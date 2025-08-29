package dev.spring.movie_recommendation.services.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class ApiConfig {

    @Bean
    public RestClient restClientTmdb(@Value("${tmdb.api.url}") String tmdbApiUrl, @Value("${tmdb.api.token}") String tmdbApiToken) {
        return RestClient.builder()
                .baseUrl(tmdbApiUrl)
                .defaultHeader("Authorization", "Bearer " + tmdbApiToken)
                .build();
    }

    @Bean
    public RestClient restClientMotn(@Value("${motn.api.url}") String motnApiUrl, @Value("${motn.api.key}") String motnApiKey) {
        return RestClient.builder()
                .baseUrl(motnApiUrl)
                .defaultHeader("x-rapidapi-key", motnApiKey)
                .build();
    }
}
