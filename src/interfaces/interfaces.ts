export interface IQuery {
  s?: string //search
  t?: string,
  i?: string,
  y?: string,
  r?: string,//json, xml
  page?: number,
  type?: string,//movie, series, episode
  plot?: string,//short, full


}
export interface IFetchMovieBySearchResponse {
  Response: string,
  Search: IMovie[],
  totalResults: string
 
}
export interface IFetchMovieByIDResponse extends MovieDetails { }

export interface IMovie { Poster: string, Title: string, Type: string, Year: string, imdbID: string }


export interface MovieDetails {
  Actors: string;
  Awards: string;
  Country: string;
  Director: string;
  Genre: string;
  Language: string;
  Metascore: string;
  Plot: string;
  Poster: string;
  Rated: string;
  Ratings: Array<{ Source: string; Value: string }>;
  Released: string;
  Response: string;
  Runtime: string;
  Title: string;
  Type: string;
  Writer: string;
  Year: string;
  imdbID: string;
  imdbRating: string;
  imdbVotes: string;
  totalSeasons: string;
}
export interface IAPIErrorResponse {
  Response : string,
  Error : string
  
}