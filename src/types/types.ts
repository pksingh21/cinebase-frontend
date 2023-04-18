export interface credentials {
  username: string;
  password: string;
  confirmPassword: string;
  emailId: string;
  signInOrLogin: string;
}
export interface error {
  isError: boolean;
  errorType: string;
  errorMessage: string;
}
export interface Movie {
  id: number;
  tmdb_id?: bigint;
  title: string;
  tagline?: string;
  language: string;
  release_date: string;
  runtime?: number;
  cinebase_rating: number;
  poster_path?: string;
  overview?: string;
  created: string;
  last_updated: string;
  genres: number[];
}
export interface genres {
  id: number;
  tmdb_id?: bigint;
  name: string;
}

export interface getAllMoviesRequest {
  language?: string;
  limit?: number;
  offset?: number;
  released_after?: Date;
  released_before?: Date;
  title?: string;
}
export interface responseObjectgetAllMovieRequest {
  count: number;
  next: string;
  previous: string;
  results: Movie[];
}
