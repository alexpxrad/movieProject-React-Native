
import React, { useEffect, useState } from 'react';
import {Text, View, StyleSheet, Dimensions, FlatList} from 'react-native';
import { getPopularMovies, getUpcomingMovies } from '../services/services';
import { SliderBox } from "react-native-image-slider-box"
import List from '../components/List'


const dimensions = Dimensions.get('screen')

const Home = () => {
    
    const [moviesImages, setMoviesImages ] = useState('')
    const [popularMovies, setPopularMovies ] = useState('')
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
      .then(movies => {
        setPopularMovies(movies)
      })
      .catch(err => {
      setError(err)
    })
    
    }, [])

    return (
    <React.Fragment>
        <View
        style={styles.sliderContainer}>
            <SliderBox 
            images={moviesImages} 
            dotStyle={styles.sliderStyle}
            autoplay={true} 
            sliderBoxHeight={dimensions.height/1.5} 
            circleLoop={true}/>
      </View>
        <View style={styles.carousel}>
            <List title="Popular Movies" content={popularMovies} ></List>
        </View>
    </React.Fragment>
    );
}

const styles = StyleSheet.create({
    sliderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
      },
      sliderStyle : {
        height: 0
      },
      carousel : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
      }
})


export default Home;