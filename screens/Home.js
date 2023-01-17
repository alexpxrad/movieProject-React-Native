
import React, { useEffect, useState } from 'react';
import {Text, View, StyleSheet, Dimensions, ScrollView} from 'react-native';
import { getPopularMovies, getUpcomingMovies, getPopularTv, getFamilyMovies, getDocumentaryMovies } from '../services/services';
import { SliderBox } from "react-native-image-slider-box"
import List from '../components/List'




const dimensions = Dimensions.get('screen')

const Home = () => {
    
    const [moviesImages, setMoviesImages ] = useState('')
    const [popularMovies, setPopularMovies ] = useState('')
    const [popularTv, setPopularTv ] = useState('')
    const [familyMovies, setFamilyMovies ] = useState('')
    const [documentaryMovies, setDocumentaryMovies] = useState('')

    const [error, setError ] = useState(false)
  
    const getData = () => {
            return Promise.all([
                getUpcomingMovies(),
                getPopularMovies(),
                getPopularTv(),
                getFamilyMovies(),
                getDocumentaryMovies(),
            ]);
    };

    useEffect(() => {
    getData().then(([
        upcomingMoviesData, 
        popularMoviesData, 
        popularTvData, 
        familyMoviesData, 
        documentaryMoviesData
        ]) => {
            const moviesImagesArray = [];
            upcomingMoviesData.forEach(movie => {
            moviesImagesArray.push(
                'https://image.tmdb.org/t/p/w500'+movie.poster_path
                )  
             })
                setMoviesImages(moviesImagesArray);
                setPopularMovies(popularMoviesData);
                setPopularTv(popularTvData);
                setFamilyMovies(familyMoviesData);
                setDocumentaryMovies(documentaryMoviesData)
            },
        ).catch(err => {
            setError(err)
        })
//     getUpcomingMovies() 
//     .then(movies => {
        
      
//       })
//       .catch(err => {
//         setError(err)
//       })
//       getPopularMovies()
//       .then(movies => {
       
//       })
//       .catch(err => {
//       setError(err)
//     });
//     getPopularTv()
//     .then(movies => {
      
//     })
//     .catch(err => {
//     setError(err)
//   });
//   getFamilyMovies()
//     .then(movies => {
    
//     })
//     .catch(err => {
//     setError(err)
//   });
//   getDocumentaryMovies()
//   .then(movies => {
  
//   })
//   .catch(err => {
//   setError(err)
// });
    }, [])

    return (
    <React.Fragment>
        <ScrollView>
        {moviesImages &&  (<View
        style={styles.sliderContainer}>
            <SliderBox 
                images={moviesImages} 
                dotStyle={styles.sliderStyle}
                autoplay={true} 
                sliderBoxHeight={dimensions.height/1.5} 
                circleLoop={true}/>
      </View>) }
      {popularMovies && (
      <View 
            style={styles.carousel}>
            <List title="Popular Movies" content={popularMovies} />
        </View>)}
        {popularTv && (
        <View 
            style={styles.carousel}>
            <List title="Popular TV shows" content={popularTv} />
        </View>)}
        {familyMovies && (
        <View 
            style={styles.carousel}>
            <List title="Family Movies" content={familyMovies} />
        </View>)}
        {documentaryMovies && (
        <View 
            style={styles.carousel}>
            <List title="Documentaries" content={documentaryMovies} />
        </View>)}  
        </ScrollView>
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