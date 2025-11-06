export interface Movie {
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
}

export interface MovieRecommendationsResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface MovieFilters {
  genreIds?: number[];
  decade?: number;
  sortBy?: string;
  mood?: string;
  withOriginCountry?: string;
  withOriginalLanguage?: string;
  withRuntimeGte?: number;
  withRuntimeLte?: number;
  responseLanguage?: string;
  page?: number;
}

export type RecommendationType = "single" | "collection";

export interface FormData {
  filters: MovieFilters;
  recommendationType: RecommendationType;
}
