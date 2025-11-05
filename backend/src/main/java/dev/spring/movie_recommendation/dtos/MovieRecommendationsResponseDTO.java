package dev.spring.movie_recommendation.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record MovieRecommendationsResponseDTO(
        List<MovieResponseDTO> results,
        @JsonProperty(value = "total_pages")
        Integer totalPages,
        @JsonProperty(value = "total_results")
        Integer totalResults
) {
}
