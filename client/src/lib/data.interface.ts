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
    popularity: Float32Array;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: Float32Array;
    vote_count: number;
}