import { RouteProp } from '@react-navigation/native';

export type AppParamList = {
    HOME: {}
    MOVIE_DETAILS: { movieId: string };

};
export type HomeScreenRouteProps = RouteProp<AppParamList, 'HOME'>;
export type MovieSceenRouteProps = RouteProp<AppParamList, 'MOVIE_DETAILS'>

