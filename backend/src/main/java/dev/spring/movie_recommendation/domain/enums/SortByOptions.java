package dev.spring.movie_recommendation.domain.enums;

import java.util.Random;

public enum SortByOptions {
    POPULARITY("popularity"),
    ORIGINAL_TITLE("original_tile"),
    REVENUE("revenue"),
    TITLE("title"),
    PRIMARY_RELEASE_DATE("primary_release_date"),
    VOTE_AVERAGE("vote_average"),
    VOTE_COUNT("vote_count");

    private final String value;

    SortByOptions(String value) {
        this.value = value;
    }

    public String getValue() {
        return this.value;
    }

    public static SortByOptions getRandomSortBy() {
        SortByOptions[] values = values();
        Random random = new Random();
        int index = random.nextInt(values.length);
        return values[index];
    }
}
