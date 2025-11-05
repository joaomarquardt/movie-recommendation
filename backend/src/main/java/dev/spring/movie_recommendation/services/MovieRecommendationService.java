package dev.spring.movie_recommendation.services;

import dev.spring.movie_recommendation.domain.enums.MoodOptions;
import dev.spring.movie_recommendation.domain.enums.SortByOptions;
import dev.spring.movie_recommendation.dtos.MovieRecommendationsResponseDTO;
import dev.spring.movie_recommendation.dtos.MovieResponseDTO;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.util.UriBuilder;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class MovieRecommendationService {
    private RestClient restClientTmdb;
    private RestClient restClientMotn;
    @Value("${tmdb.filter.vote-count-min:500}")
    private Integer voteCountGte;
    @Value("${tmdb.filter.vote-average-min:6}")
    private Double voteAverageGte;

    public MovieRecommendationService(@Qualifier("restClientTmdb") RestClient restClientTmdb,
                                      @Qualifier("restClientMotn") RestClient restClientMotn) {
        this.restClientTmdb = restClientTmdb;
        this.restClientMotn = restClientMotn;
    }

    public MovieRecommendationsResponseDTO recommendationsByParams(List<Long> genreIds, Integer decade, String sortBy, String mood, String withOriginCountry,
                                                                   String withOriginalLanguage, Integer withRuntimeGte,
                                                                   Integer withRuntimeLte, String responseLanguage, Integer page) {
        List<Long> finalGenreIds = new ArrayList<>();
        if (genreIds != null && !genreIds.isEmpty()) {
            finalGenreIds.addAll(genreIds);
        }
        if (mood != null) {
            try {
                MoodOptions moodOption = MoodOptions.valueOf(mood.toUpperCase());
                List<Long> moodGenreIds = moodOption.getGenreIds();
                finalGenreIds.addAll(moodGenreIds);
            } catch (IllegalArgumentException e) {
                String moodOptions = String.join(", ", java.util.Arrays.stream(MoodOptions.values()).map(Enum::name).collect(Collectors.toList()));
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid mood option: " + mood + ". Valid options are: " + moodOptions, e);
            }
        }
        return restClientTmdb.get()
                .uri(uriBuilder -> {
                    UriBuilder builder = uriBuilder.path("discover/movie");
                    if (!finalGenreIds.isEmpty()) {
                        String genreString = finalGenreIds.stream()
                                .map(String::valueOf)
                                .distinct()
                                .collect(Collectors.joining(","));
                        builder.queryParam("with_genres", genreString);
                    }
                    if (withOriginalLanguage != null) {
                        builder.queryParam("withOriginalLanguage", withOriginalLanguage);
                    }
                    if (withOriginCountry != null) {
                        builder.queryParam("withOriginCountry", withOriginCountry);
                    }
                    if (sortBy != null) {
                        builder.queryParam("sortBy", sortBy);
                    }
                    if (decade != null) {
                        String releaseDateGte = decade + "-01-01";
                        int limitYear = decade + 9;
                        String releaseDateLte = limitYear + "-12-31";

                        builder.queryParam("primary_release_date.gte", releaseDateGte);
                        builder.queryParam("primary_release_date.lte", releaseDateLte);
                    }
                    if (withRuntimeGte != null && withRuntimeLte != null) {
                        builder.queryParam("with_runtime.gte", withRuntimeGte);
                        builder.queryParam("with_runtime.lte", withRuntimeLte);
                    }
                    if (responseLanguage != null) {
                        builder.queryParam("language", responseLanguage);
                    }
                    if (page != null && page > 0) {
                        builder.queryParam("page", page);
                    }
                    if (voteCountGte != null && voteCountGte > 0) {
                        builder.queryParam("vote_count.gte", voteCountGte);
                    }
                    if (voteAverageGte != null && voteAverageGte > 0) {
                        builder.queryParam("vote_average.gte", voteAverageGte);
                    }
                    return builder.build();
                })
                .retrieve()
                .body(new ParameterizedTypeReference<MovieRecommendationsResponseDTO>() {});
    }

    public MovieResponseDTO randomRecommendation(List<Long> genreIds, Integer decade, String sortBy,
                                                 String mood, String withOriginCountry, String withOriginalLanguage,
                                                 Integer withRuntimeGte, Integer withRuntimeLte, String responseLanguage) {
        String finalSortBy = sortBy != null ? sortBy : SortByOptions.getRandomSortBy().getValue();
        String finalMood = mood != null ? mood : MoodOptions.getRandomMood().name();
        MovieRecommendationsResponseDTO movieRecommendations = this.recommendationsByParams(genreIds, decade, finalSortBy,
                finalMood, withOriginCountry, withOriginalLanguage, withRuntimeGte, withRuntimeLte, responseLanguage, 1);
        if (movieRecommendations.results().isEmpty() || movieRecommendations.totalResults() == 0) {
            return null;
        }
        Integer totalPages = movieRecommendations.totalPages();
        int maxPages = Math.min(totalPages, 500); // Limitado a 500 páginas pois a API do TMDB não permite acessar um índice de página maior que esse
        Random random = new Random();
        int randomPage = random.nextInt(maxPages) + 1;
        MovieRecommendationsResponseDTO randomPageRecommendations = this.recommendationsByParams(genreIds, decade, finalSortBy, finalMood, withOriginCountry, withOriginalLanguage, withRuntimeGte, withRuntimeLte, responseLanguage, randomPage);
        return movieRecommendations.results().isEmpty() ? null : pickRandomMovie(randomPageRecommendations);
    }

    private MovieResponseDTO pickRandomMovie(MovieRecommendationsResponseDTO movieRecommendationsResponseDTO) {
        List<MovieResponseDTO> movies = movieRecommendationsResponseDTO.results();
        Integer listSize = movies.size();
        Random random = new Random();
        int number = random.nextInt(listSize);
        return movies.get(number);
    }
}
