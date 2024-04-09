import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Button } from 'react-native';
import NavBar from '../../NavBar/NavBar';
import { Video } from 'expo-av';

const AnimationVideo = (props) => {
    const videoName = props.route.params.animationVideo;
    let videoSource;

    switch (videoName) {
        case 'video1':
            videoSource = require("../../AnimationVideos/RightToEquality.mp4");
            break;
        case 'video2':
            videoSource = require("../../AnimationVideos/discrimination.mp4");
            break;
        case 'video3':
            videoSource = require("../../AnimationVideos/freedom.mp4");
            break;
        case 'video4':
            videoSource = require("../../AnimationVideos/education.mp4");
            break;
        case 'video5':
            videoSource = require("../../AnimationVideos/childlabour.mp4");
            break;
        case 'video6':
            videoSource = require("../../AnimationVideos/trafficking.mp4");
            break;
        case 'video7':
            videoSource = require("../../AnimationVideos/identity.mp4");
            break;
        case 'video8':
            videoSource = require("../../AnimationVideos/abuse.mp4");
            break;
        case 'video9':
            videoSource = require("../../AnimationVideos/liberty.mp4");
            break;
        case 'video10':
            videoSource = require("../../AnimationVideos/childmarriages.mp4");
            break;
        case 'video11':
            videoSource = require("../../AnimationVideos/sexualoffences.mp4");
            break;
        default:
            videoSource = require("../../AnimationVideos/right.mp4"); // Default video
            break;
    }

    const video = useRef(null);
    const [status, setStatus] = useState({});

    const handlePlayPause = async () => {
        if (status.isPlaying) {
            await video.current.pauseAsync();
        } else {
            await video.current.playAsync();
        }
    };

    const handleRewind = async () => {
        await video.current.setPositionAsync(Math.max(status.positionMillis - 10000, 0));
    };

    const handleFastForward = async () => {
        await video.current.setPositionAsync(Math.min(status.positionMillis + 10000, status.durationMillis));
    };

    return (
        <View style={styles.container}>
            <View style={styles.videoContainer}>
                <Video
                    ref={video}
                    style={styles.video}
                    source={videoSource}
                    useNativeControls
                    resizeMode="contain"
                    isLooping
                    onPlaybackStatusUpdate={setStatus}
                />
                <View style={styles.controls}>
                    <Button title={status.isPlaying ? 'Pause' : 'Play'} onPress={handlePlayPause} />
                    <Button title="Rewind 10s" onPress={handleRewind} />
                    <Button title="Fast Forward 10s" onPress={handleFastForward} />
                </View>
            </View>
            <View style={styles.navBarContainer}>
                <NavBar />
            </View>
        </View>
    );
};

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    videoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    video: {
        width: '100%',
        height: '100%',
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    navBarContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        alignItems: 'center',
    },
});

export default AnimationVideo;
