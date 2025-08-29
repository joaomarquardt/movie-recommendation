package dev.spring.movie_recommendation.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDate;
import java.util.List;

public record MovieResponseDTO(
        @JsonProperty(value = "backdrop_path")
        String backdropPath,
        @JsonProperty(value = "genre_ids")
        List<Long> genreIds,
        @JsonProperty(value = "id")
        Long movieId,
        @JsonProperty(value = "original_language")
        String originalLanguage,
        String title,
        String overview,
        @JsonProperty(value = "poster_path")
        String posterPath,
        @JsonProperty(value = "release_date")
        LocalDate releaseDate,
        @JsonProperty(value = "vote_average")
        Double voteAverage,
        @JsonProperty(value = "vote_count")
        Integer voteCount

) {
}
