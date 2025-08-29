package dev.spring.movie_recommendation.dtos;

import java.util.List;

public record MovieRecommendationsResponseDTO(
        List<MovieResponseDTO> results
) {
}
