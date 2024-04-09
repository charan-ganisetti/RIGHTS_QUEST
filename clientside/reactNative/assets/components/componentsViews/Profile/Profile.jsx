import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const AnimatedGifExample = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../images/award.gif')}
                style={styles.gifImage}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    gifImage: {
        width: 200,
        height: 200,
    },
});

export default AnimatedGifExample;
