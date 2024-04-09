// NavBar.js
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Linking, Alert } from 'react-native';
import { FontAwesome, EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import LottieView from "lottie-react-native";

const NavBar = () => {
    const navigation = useNavigation();

    const handleExtenalLinkPress = () => {
        // Show an alert before leaving the app
        Alert.alert(
            'Leaving App',
            'Are you sure you want to leave the app and go to the external website?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'OK', onPress: () => openExternalLink() },
            ],
            { cancelable: false }
        );
    };

    const openExternalLink = () => {
        // Use Linking module to open the external link
        Linking.openURL('https://www.google.com/aclk?sa=l&ai=DChcSEwijvd_f2OuDAxVCpGYCHcCiAVgYABAEGgJzbQ&ase=2&gclid=Cj0KCQiA-62tBhDSARIsAO7twbak9G7eEcAYqgzpqQ-SONhXzprje6y4On5rMxLSphUPtax65PC1aOMaAlqvEALw_wcB&sig=AOD64_2NBs6yOE8DblFs6z10MqOXDYEYZA&q&nis=4&adurl&ved=2ahUKEwjHsNnf2OuDAxUyd2wGHaijAFoQ0Qx6BAgJEAM');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <FontAwesome name="home" size={40} color="white" />

            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Game')}>
                <FontAwesome name="gamepad" size={40} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Quiz")}>
                <FontAwesome name="book" size={32} color="white" />

            </TouchableOpacity>
            <TouchableOpacity onPress={handleExtenalLinkPress}>
                <EvilIcons name="external-link" size={40} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
                <EvilIcons name="user" size={40} color="white" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#000000',
        height: 50,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
});

export default NavBar;
