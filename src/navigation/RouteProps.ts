import { RouteProp } from '@react-navigation/native';

export type AppParamList = {
    HOME: {}
    MOVIE_DETAILS: { title: string; description: string; poster: string; rating: number; };

};
export type HomeScreenRouteProps = RouteProp<AppParamList, 'HOME'>;
export type MovieSceenRouteProps = RouteProp<AppParamList, 'MOVIE_DETAILS'>

