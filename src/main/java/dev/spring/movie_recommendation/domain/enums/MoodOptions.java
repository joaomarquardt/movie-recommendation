package dev.spring.movie_recommendation.domain.enums;

import java.util.List;
import java.util.Random;

public enum MoodOptions {
    HAPPY(List.of(35, 10751, 16, 10402)),
    ROMANTIC(List.of(10749, 18, 10402)),
    SPOOKY(List.of(27, 53, 9648)),
    ADVENTUROUS(List.of(28, 12, 14, 878)),
    HISTORY(List.of(36, 10752, 99, 18)),
    RELAXING(List.of(37, 10770));

    private final List<Integer> genreIds;

    MoodOptions(List<Integer> genreIds) {
        this.genreIds = genreIds;
    }

    public List<Integer> getGenreIds() {
        return genreIds;
    }

    public static MoodOptions getRandomMood() {
        MoodOptions[] values = values();
        Random random = new Random();
        int index = random.nextInt(values.length);
        return values[index];
    }
}
