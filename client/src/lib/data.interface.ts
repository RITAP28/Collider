export interface IGenre {
    id: number;
    name: string;
};

export interface IMoviesByGenre {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface ITVShowByGenre {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: string;
    origin_country: string | string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    first_air_date: string;
    name: string;
    vote_average: number;
    vote_count: number;
};

interface IProdCompanies {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
}

interface IProdCountries {
    iso_3166_1: string;
    name: string
}

interface ISpokenLang {
    english_name: string;
    iso_639_1: string;
    name: string;
}

export interface IMovieDetails {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: string;
    budget: number;
    genres: IGenre[];
    homepage: string;
    id: number;
    imdb_id: string;
    origin_country: string[],
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: IProdCompanies[],
    production_countries: IProdCountries[],
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: ISpokenLang[],
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface ICastDetails {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
}

export interface IVideoDetailsOfMovie {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: string;
    published_at: string;
    id: string;
}

export interface IPhotoDetailsOfMovie {
    aspect_ratio: number;
    height: number;
    iso_639_1: string;
    file_path: string;
    vote_average: number;
    vote_count: number;
    width: number;
};

export interface IActorDetails {
    adult: boolean;
    also_known_as: string[] | string;
    biography: string;
    birthday: string;
    deathday: string | null;
    gender: number;
    homepage: string | null;
    id: number;
    imdb_id: string;
    known_for_department: string;
    name: string;
    place_of_birth: string;
    popularity: number;
    profile_path: string;
};

export interface IWatchlist {
    id: number;
    userId: number;
    movieId: number;
    movieName: string;
    moviePoster: string;
    movieOverview: string;
    voteAvg: number;
    voteCount: number;
    addedAt: string;
};

export interface ILikeAndBookmark {
    id: number;
    userId: number;
    movieId: number;
    movieName: string;
    moviePoster: string;
    movieOverview: string;
    voteAvg: number;
    voteCount: number;
    likedAt: string;
}

export interface IUserReviews {
  id: number;
  userId: number;
  username: string;
  movieId: number;
  reviewText: string;
  rating?: number;
  createdAt: Date;
  updatedAt: Date;
};

export const port = import.meta.env.VITE_SERVER_PORT;
export const apiKey = import.meta.env.VITE_API_KEY;
export const bearerToken = import.meta.env.VITE_BEARER_TOKEN;