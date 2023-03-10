
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator, 
    View, 
    StyleSheet, 
    Dimensions, 
    ScrollView
        } from 'react-native';
import { 
    getPopularMovies, 
    getUpcomingMovies, 
    getPopularTv,     
    getFamilyMovies, 
    getDocumentaryMovies
     } from '../services/services';
import { SliderBox } from "react-native-image-slider-box"
import List from '../components/List'
import Error from '../components/Error';




const dimensions = Dimensions.get('screen')

const Home = ({navigation}) => {
    
    const [moviesImages, setMoviesImages ] = useState()
    const [popularMovies, setPopularMovies ] = useState()
    const [popularTv, setPopularTv ] = useState()
    const [familyMovies, setFamilyMovies ] = useState()
    const [documentaryMovies, setDocumentaryMovies] = useState()

    const [error, setError ] = useState(false);
    const [loaded, setLoaded ] = useState(false);
  
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
                setDocumentaryMovies(documentaryMoviesData);
                setLoaded(true);
            },
        ).catch(() => {
            setError(true);    
        }).finally(() => {
            setLoaded(true)
        });
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
        {/* Upcoming Movies */}
        {loaded && !error &&(
            <ScrollView>
            {moviesImages &&  (<View
            style={styles.sliderContainer}>
                <SliderBox 
                    images={moviesImages} 
                    dotStyle={styles.sliderStyle}
                    autoplay={true} 
                    sliderBoxHeight={dimensions.height/1.5} 
                    circleLoop={true}/>
          </View>)}
    
          {/* Popular Movies */}
          {popularMovies && (
          <View 
                style={styles.carousel}>
                <List  
                navigation={navigation} 
                title={"Popular Movies" }
                content={popularMovies} />
            </View>)}
    
            {/* Science Fiction*/}
            {popularTv && (
            <View 
                style={styles.carousel}>
                <List 
                navigation={navigation} 
                title={"Science Fiction"} 
                content={popularTv} />
            </View>)}
    
            {/* Family Movies */}
            {familyMovies && (
            <View 
                style={styles.carousel}>
                <List 
                navigation={navigation} 
                title={"Family Movies"} 
                content={familyMovies} />
            </View>)}
    
            {/* Documentaries */}
            {documentaryMovies && (
            <View 
                style={styles.carousel}>
                <List 
                navigation={navigation} 
                title={"Documentaries"} 
                content={documentaryMovies} />
            </View>)}  
            </ScrollView>
        )}
        {!loaded && <ActivityIndicator size='large'/> }
        {error && <Error />}
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