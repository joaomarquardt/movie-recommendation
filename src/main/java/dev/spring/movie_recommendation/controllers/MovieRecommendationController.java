package dev.spring.movie_recommendation.controllers;

import dev.spring.movie_recommendation.dtos.MovieRecommendationsResponseDTO;
import dev.spring.movie_recommendation.dtos.MovieResponseDTO;
import dev.spring.movie_recommendation.services.MovieRecommendationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/movies")
public class MovieRecommendationController {
    private MovieRecommendationService movieRecommendationService;

    public MovieRecommendationController(MovieRecommendationService movieRecommendationService) {
        this.movieRecommendationService = movieRecommendationService;
    }

    @GetMapping("/recommendations")
    public ResponseEntity<MovieRecommendationsResponseDTO> recommendationsByParams(@RequestParam(required = false)List<Long> genreIds, @RequestParam(required = false) Integer decade, @RequestParam(required = false) String sort_by,
                                                    @RequestParam(required = false) String mood, @RequestParam(required = false) String with_origin_country, @RequestParam(required = false) String with_original_language, @RequestParam(required = false) Integer with_runtime_gte,
                                                    @RequestParam(required = false) Integer with_runtime_lte, @RequestParam(required = false) String response_language) {
        MovieRecommendationsResponseDTO movieRecommendations = movieRecommendationService.recommendationsByParams(genreIds, decade, sort_by, mood, with_origin_country, with_original_language, with_runtime_gte, with_runtime_lte, response_language);
        return new ResponseEntity<>(movieRecommendations, HttpStatus.OK);
    }

    @GetMapping("/recommendations/random")
    public ResponseEntity<MovieResponseDTO> randomRecommendation(@RequestParam(required = false)List<Long> genreIds, @RequestParam(required = false) Integer decade, @RequestParam(required = false) String sort_by,
                                                                                   @RequestParam(required = false) String mood, @RequestParam(required = false) String with_origin_country, @RequestParam(required = false) String with_original_language, @RequestParam(required = false) Integer with_runtime_gte,
                                                                                   @RequestParam(required = false) Integer with_runtime_lte, @RequestParam(required = false) String response_language) {
        MovieResponseDTO movieRecommendations = movieRecommendationService.randomRecommendation(genreIds, decade, sort_by, mood, with_origin_country, with_original_language, with_runtime_gte, with_runtime_lte, response_language);
        return new ResponseEntity<>(movieRecommendations, HttpStatus.OK);
    }

}
