package dev.spring.movie_recommendation.services;

import dev.spring.movie_recommendation.dtos.MovieRecommendationsResponseDTO;
import dev.spring.movie_recommendation.dtos.MovieResponseDTO;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.util.UriBuilder;

import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class MovieRecommendationService {
    private RestClient restClientTmdb;
    private RestClient restClientMotn;

    public MovieRecommendationService(@Qualifier("restClientTmdb") RestClient restClientTmdb,
                                      @Qualifier("restClientMotn") RestClient restClientMotn) {
        this.restClientTmdb = restClientTmdb;
        this.restClientMotn = restClientMotn;
    }

    public MovieRecommendationsResponseDTO recommendationsByParams(List<Long> genreIds, Integer decade, String sort_by, String mood, String with_origin_country,
                                                                   String with_original_language, Integer with_runtime_gte,
                                                                   Integer with_runtime_lte, String response_language) {
        return restClientTmdb.get()
                .uri(uriBuilder -> {
                    UriBuilder builder = uriBuilder.path("discover/movie");
                    if (genreIds != null && !genreIds.isEmpty()) {
                        String genreString = genreIds.stream()
                                .map(String::valueOf)
                                .collect(Collectors.joining(","));
                        builder.queryParam("with_genres", genreString);
                    }
                    if (with_original_language != null) {
                        builder.queryParam("with_original_language", with_original_language);
                    }
                    if (with_origin_country != null) {
                        builder.queryParam("with_origin_country", with_origin_country);
                    }
                    if (sort_by != null) {
                        builder.queryParam("sort_by", sort_by);
                    }
                    if (decade != null) {
                        String release_date_gte = decade + "-01-01";
                        int limitYear = decade + 9;
                        String release_date_lte = limitYear + "-12-31";

                        builder.queryParam("primary_release_date.gte", release_date_gte);
                        builder.queryParam("primary_release_date.lte", release_date_lte);
                    }
                    if (with_runtime_gte != null && with_runtime_lte != null) {
                        builder.queryParam("with_runtime.gte", with_runtime_gte);
                        builder.queryParam("with_runtime.lte", with_runtime_lte);
                    }
                    if (response_language != null) {
                        builder.queryParam("language", response_language);
                    }
                    return builder.build();
                })
                .retrieve()
                .body(new ParameterizedTypeReference<MovieRecommendationsResponseDTO>() {});
    }

    public MovieResponseDTO randomRecommendation(List<Long> genreIds, Integer decade, String sort_by,
                                                 String mood, String with_origin_country, String with_original_language,
                                                 Integer with_runtime_gte, Integer with_runtime_lte, String response_language) {
        MovieRecommendationsResponseDTO movieRecommendations = this.recommendationsByParams(genreIds, decade, sort_by,
                mood, with_origin_country, with_original_language, with_runtime_gte, with_runtime_lte, response_language);
        return movieRecommendations.results().isEmpty() ? null : pickRandomMovie(movieRecommendations);
    }

    private MovieResponseDTO pickRandomMovie(MovieRecommendationsResponseDTO movieRecommendationsResponseDTO) {
        List<MovieResponseDTO> movies = movieRecommendationsResponseDTO.results();
        Integer listSize = movies.size();
        Random random = new Random();
        int number = random.nextInt(20);
        return movies.get(number);
    }
}
