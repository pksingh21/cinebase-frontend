import {
  Actor,
  genres,
  Movie,
  credentials,
  error,
  Credits,
} from "@/types/types";
import { atom } from "recoil";
export const credentialAtom = atom<credentials>({
  key: "credentialAtomState",
  default: {
    username: "",
    password: "",
    confirmPassword: "",
    emailId: "",
    signInOrLogin: "login",
  },
});
export const errorAtom = atom<error>({
  key: "errorAtomState",
  default: {
    isError: false,
    errorType: "",
    errorMessage: "",
  },
});
export const Movies = atom<Movie[]>({
  key: "MoviesArray",
  default: [],
});
export const AllGenre = atom<genres[]>({
  key: "GenresArray",
  default: [],
});
export const CreditsForMovie = atom<Credits[]>({
  key: "CreditsForAMovie",
  default: [],
});
export const ActorsForCurrentMovie = atom<Actor[]>({
  key: "ActorsForCurrentMovie",
  default: [],
});
export const CurrentMovie = atom<Movie>({
  key: "CurrentMovie",
  default: {
    id: 0,
    tmdb_id: 0,
    title: "",
    tagline: "",
    language: "",
    release_date: "",
    runtime: 0,
    cinebase_rating: 0,
    poster_path: "",
    overview: "",
    created: "",
    last_updated: "",
    genres: [],
  },
});
