import { Movie, MovieRecommendationsResponse, MovieFilters } from '../types/Movie';

const API_BASE_URL = 'http://localhost:8080/api/movies';

export class MovieService {
  static async getRecommendations(filters: MovieFilters): Promise<MovieRecommendationsResponse> {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          value.forEach(item => params.append(key, item.toString()));
        } else {
          params.append(key, value.toString());
        }
      }
    });

    const response = await fetch(`${API_BASE_URL}/recommendations?${params}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching recommendations: ${response.statusText}`);
    }
    
    return response.json();
  }

  static async getRandomRecommendation(filters: MovieFilters): Promise<Movie> {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '' && key !== 'page') {
        if (Array.isArray(value)) {
          value.forEach(item => params.append(key, item.toString()));
        } else {
          params.append(key, value.toString());
        }
      }
    });

    const response = await fetch(`${API_BASE_URL}/recommendations/random?${params}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching random recommendation: ${response.statusText}`);
    }
    
    return response.json();
  }

  static buildImageUrl(path: string, size: string = 'w500'): string {
    if (!path) return '/placeholder-movie.jpg';
    return `https://image.tmdb.org/t/p/${size}${path}`;
  }
}