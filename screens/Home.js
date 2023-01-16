
import React, { useEffect, useState } from 'react';
import {Text, View, StyleSheet} from 'react-native';
import { getPopularMovies, getUpcomingMovies } from '../services/services';
import { SliderBox } from "react-native-image-slider-box"


const Home = () => {
    const [moviesImages, setMoviesImages ] = useState('')
    const [error, setError ] = useState(false)
  
    useEffect(() => {
    getUpcomingMovies()
    .then(movies => {
        const moviesImagesArray = [];
        movies.forEach(movie => {
           moviesImagesArray.push('https://image.tmdb.org/t/p/w500'+movie.poster_path)  
        })
       
        setMoviesImages(moviesImagesArray)
      })
      .catch(err => {
        setError(err)
      })
      getPopularMovies()
      .then(movies => {})
      .catch(err => {
      setError(err)
    })
    
    }, [])

    return (
        <View
        style={styles.sliderContainer}>
            <SliderBox images={moviesImages} />
      </View>
    );
}

const styles = StyleSheet.create({
    sliderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }
})


export default Home;