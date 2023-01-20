import { style } from 'deprecated-react-native-prop-types/DeprecatedViewPropTypes';
import React, {useEffect, useState}from 'react'
import {ScrollView, StyleSheet, Image, Dimensions, ActivityIndicator, Text, View} from 'react-native'
import {getMovie} from '../services/services'


const placeHolderImage = require('../assets/images/placeholder.png')
const height = Dimensions.get('screen').height;

const Detail = ({route, navigation}) => {

    const movieId = route.params.movieId;
    const [movieDetail, setMovieDetail ] = useState()
    const [loaded, setLoaded ] = useState(false)
    

    useEffect(()=> {
        getMovie(movieId).then(movieData => {
            setMovieDetail(movieData)
            setLoaded(true);
        });
    }, [movieId]);

    return (
        <React.Fragment>
           {loaded &&  
           (<ScrollView >
             <Image 
             resizeMode='cover'
             style={styles.image} 
                source={
                    movieDetail.poster_path 
                    ? {
                        uri: 
                            'https://image.tmdb.org/t/p/w500' 
                            + movieDetail.poster_path,
                        }
                     : placeHolderImage
                    }
                />
                <View  style={styles.container}>
                <Text style={styles.movieTitle} >{movieDetail.title}</Text> 
                {movieDetail.genres && (
                    <View  style={styles.genresContainer}>
                    {movieDetail.genres.map(genre => {
                         return <Text style={styles.genre} key={genre.id}>{genre.name}</Text>     
                    })}
                       </View>
                )}
                </View>
            </ScrollView>
            )}
            {!loaded && <ActivityIndicator size="large" />}
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image : {
        height: height / 2.5,
      
    },
    movieTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
    },
    genresContainer: {
        flexDirection: 'row',
        alignContent : 'center',
        marginTop: 20,
    },
    genre: {
        marginRight : 10,
        fontWeight: 'bold',

    }
});


export default Detail;