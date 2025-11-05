package dev.spring.movie_recommendation.domain.enums;

import java.util.List;
import java.util.Random;

public enum MoodOptions {
    HAPPY(List.of(35L, 10751L, 16L, 10402L)),
    ROMANTIC(List.of(10749L, 18L, 10402L)),
    SPOOKY(List.of(27L, 53L, 9648L)),
    ADVENTUROUS(List.of(28L, 12L, 14L, 878L)),
    HISTORY(List.of(36L, 10752L, 99L, 18L)),
    RELAXING(List.of(37L, 10770L));

    private final List<Long> genreIds;

    MoodOptions(List<Long> genreIds) {
        this.genreIds = genreIds;
    }

    public List<Long> getGenreIds() {
        return genreIds;
    }

    public static MoodOptions getRandomMood() {
        MoodOptions[] values = values();
        Random random = new Random();
        int index = random.nextInt(values.length);
        return values[index];
    }
}
