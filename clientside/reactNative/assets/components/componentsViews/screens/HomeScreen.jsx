import React,{useState,useEffect} from "react";
import { StyleSheet, View, Text, SafeAreaView, StatusBar, Image } from "react-native";
import NavBar from "../../NavBar/NavBar";
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from "lottie-react-native";
const HomeScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [userData, setUserData] = useState(null);
    const getUserData = async () => {
        try {
            const storedUserData = await AsyncStorage.getItem('userData');
            if (storedUserData) {
                setUserData(JSON.parse(storedUserData));
                console.log(userData);
                setName(userData.name);
                
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };
    
    useEffect(() => {
        getUserData(); 
        
        // Fetch user data when the component mounts
    }, []);
    useEffect(() => {
        // Update the name state when userData changes
        if (userData) {
            setName(userData.name);
        }
    }, [userData]);
    
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* Set background color of status bar */}
            <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.collegeImageContainer}>
                        <Image source={require("../../images/college.png")} />
                    </View>
                    <View style={styles.animationAndMessageContainer}>
                <View style={styles.animationContainer}>
                    <LottieView
                         // Assign the ref to the LottieView
                         source={require('./../../Animations/character.json')}
                         autoPlay={false} // Set autoPlay to false
                         loop// Set loop to false
                         style={{ width: 100, height: 100 }}
                    />
                </View>
                
                    <View style={styles.messageContainer}>
                        <View style={styles.bubble}>
                            <Text style={styles.messageText}>Hi {name}, My name is righty i am here to assist you for the rights in games.To play games go and complete the quizes</Text>
                        </View>
                        
                    </View>
            
            </View>
                    <View style={styles.textContainer}>
                        {/* <Text style={styles.heading}>Welcome To The ChildRights Application</Text> */}


                    </View>
                    <View style={styles.childContainer}>
                        <Image source={require("../../images/childRights.jpg")} />
                    </View>
                    <View>
                        <Text style={styles.rights}>
                            Child rights are essential for protecting children, ensuring access to education and healthcare, preventing exploitation, and fostering a fair and just society.
                        </Text>

                    </View>
                </View>

                {/* NavBar is placed outside the content */}
                <NavBar />
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: '#F4EAE0' // Background color of the screen
    },
    content: {
        flex: 1,
        marginTop: 30,
        alignItems: "center",
    },
    textContainer: {

        alignItems: "center", // Align text horizontally
    },
    // heading: {
    //     fontSize: 23,
    //     marginBottom: 1,
    //     textAlign: 'center',
    // },
    rights: {
        top:70,
        marginTop: 5,
        fontSize: 16,
        textAlign: 'center', // Align text horizontally
        paddingHorizontal: 20, // Add padding
    },
    welcome: {
        height: 200,
        aspectRatio: 1
    },
    
     messageContainer: {
        backgroundColor: 'transparent',
        zIndex: 1,
        position: 'absolute',
        paddingHorizontal: 20,
        maxWidth: '100%',
        
        
        
         // Limit the width of the speech bubble
         // Adjust as needed to position the message above the character
        
    },
    animationAndMessageContainer: {
        top:10,
        flexDirection: 'row',
        alignItems: 'center',
        
    },
        bubble: {
            backgroundColor: 'white',
            borderRadius: 20,
            paddingHorizontal: 10,
            paddingVertical: 10,
            elevation: 3,
            maxWidth: '100%',
            top:10 ,
            right:40,
            width:200 // Ensure the speech bubble doesn't overflow
        },
        animationContainer: {
            right:120,
            top:30
         },
         animation: {
             width: 100,
             height: 100,
         },
         messageText: {
             fontSize: 16,
             color: 'black',
         },
         childContainer:{
            top:60
         }
         
});

export default HomeScreen;