import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { FontAwesome, EvilIcons } from '@expo/vector-icons';
const Certificate = ({ recipientName }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.logo}>
                Rights Quest
            </Text>
            <Text style={styles.marquee}>
                Certificate of Completion
            </Text>
            <EvilIcons name="trophy" size={55} />
            <Text style={styles.assignment}>
                This certificate is presented to
            </Text>

            <Text style={styles.person}>
                {recipientName}
            </Text>

            <Text style={styles.reason}>
                For deftly defying the laws of gravity and flying high
            </Text>
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        width: 350,
        height: 200,
        backgroundColor: '#FAF6F0',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black'
    },
    logo: {
        color: 'black',
        fontSize: 10,
        marginBottom: 2,
    },
    marquee: {
        color: 'tan',
        fontSize: 10,
        marginBottom: 2,
    },
    assignment: {
        fontSize: 15,
        marginBottom: 2,
        fontStyle: 'italic'
    },
    person: {
        borderBottomWidth: 2,
        borderColor: 'black',
        fontSize: 15,
        fontStyle: 'italic',
        marginBottom: 15,
        width: 250 * 0.8,
        textAlign: 'center',
    },
    reason: {
        fontSize: 14,
        marginBottom: 2,
    },

});

export default Certificate;
