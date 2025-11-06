package dev.spring.movie_recommendation.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class TmdbClientConfig {

    @Bean
    public RestClient restClientTmdb(@Value("${tmdb.api.url}") String tmdbApiUrl, @Value("${tmdb.api.token}") String tmdbApiToken) {
        return RestClient.builder()
                .baseUrl(tmdbApiUrl)
                .defaultHeader("Authorization", "Bearer " + tmdbApiToken)
                .build();
    }
}
