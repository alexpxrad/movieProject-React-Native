// import { style } from 'deprecated-react-native-prop-types/DeprecatedViewPropTypes';
import React, {useEffect, useState}from 'react'
import {
    ScrollView, 
    StyleSheet, 
    Image, 
    Dimensions, 
    ActivityIndicator, 
    Text, 
    View,
    Modal,
    Pressable
} from 'react-native'
import {getMovie} from '../services/services'
import StarRating from 'react-native-star-rating';
import dateFormat from 'dateformat';
import PlayButton from '../components/PlayButton'
import VideoPlayer from 'react-native-video-controls';
import { Video, AVPlaybackStatus } from 'expo-av';


const placeHolderImage = require('../assets/images/placeholder.png')
const height = Dimensions.get('screen').height;

const Detail = ({route, navigation}) => {

    const movieId = route.params.movieId;
    const [movieDetail, setMovieDetail ] = useState()
    const [loaded, setLoaded ] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    

    useEffect(()=> {
        getMovie(movieId).then(movieData => {
            setMovieDetail(movieData)
            setLoaded(true);
        });
    }, [movieId]);

    const videoShown = () => {
        setModalVisible(!modalVisible)
    }

    return (
        <React.Fragment>
           {loaded && (
           <View>
           <ScrollView >
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
                <View style={styles.playButton} >
                    <PlayButton handlePress={videoShown} />
                </View>
                <Text style={styles.movieTitle} >{movieDetail.title}</Text> 
                {movieDetail.genres && (
                    <View  style={styles.genresContainer}>
                    {movieDetail.genres.map(genre => {
                         return <Text style={styles.genre} key={genre.id}>{genre.name}</Text>     
                    })}
                       </View>
                )}
                <StarRating 
                disabled={true}
                maxStars={5}
                starSize={30} 
                rating={movieDetail.vote_average /2}
                fullStarColor={'gold'}
                />

                <Text  style={styles.overview} >{movieDetail.overview}</Text>

                <Text style={styles.release} >{'Release date:' + dateFormat(movieDetail.release_date, 'mmmm dd, yyyy')}</Text>
                </View>
            </ScrollView>
            <Modal
            animationType='slide'
            visible={modalVisible}
            >
                <View style={styles.videoModal}  >
                {/* <Pressable onPress={() => videoShown()} >
                    <Text>{'Hide Modal'}</Text>
                </Pressable> */}
                    <VideoPlayer
                        source={{uri: 'https://vjs.zencdn.net/v/oceans.mp4'}}
                        />;

                </View>
            </Modal>
            </View>
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
        marginBottom: 20.
    },
    genre: {
        marginRight : 10,
        fontWeight: 'bold',

    },
        overview : {
            padding: 15,
        },
        release : {
            fontWeight : 'bold',
        },
        playButton : {
            position: 'absolute',
            top: -25,
            right: 20,
        },
        videoModal : {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }
});


export default Detail;