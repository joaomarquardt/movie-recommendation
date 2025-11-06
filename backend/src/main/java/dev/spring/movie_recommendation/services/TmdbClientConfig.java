package dev.spring.movie_recommendation.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class TmdbClientConfig {

    @Bean
    public RestClient restClientTmdb(@Value("${TMDB_API_URL}") String tmdbApiUrl, @Value("${TMDB_API_TOKEN}") String tmdbApiToken) {
        return RestClient.builder()
                .baseUrl(tmdbApiUrl)
                .defaultHeader("Authorization", "Bearer " + tmdbApiToken)
                .build();
    }
}
