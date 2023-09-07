import React,{Component} from "react";
import { View, 
         Text,
         Image,
         StatusBar,
         Platform,
         SafeAreaView,
         Switch,
         StyleSheet } from "react-native";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {initializeApp} from "firebase/app";
import { firebaseConfig} from "../config";
         
const app =  initializeApp(firebaseConfig);

export default class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            photoURL: false,
            displayName: ''
        }
    }

    componentDidMount(){
        const auth = getAuth();
        onAuthStateChanged(auth, (user)=>{
            this.setState({
                photoURL: user.photoURL,
                displayName: user.displayName
            });
        })
    }
    render(){
        const {displayName, photoURL} =  this.state;
        return(
            <View style={styles.container}>
                <SafeAreaView style={styles.droidSafeArea} />
                <View style={styles.titleContainer}>
                    <View style={styles.titleImageContainer}>
                        <Image
                            style={styles.iconImage}
                            source={require("../assets/camara1.png")}
                        />
                    </View>
                    <View style={styles.titleTextContainer}>
                        <Text style={styles.titleText}>
                            Spectagram
                        </Text>
                    </View>

                </View>
                <View styles={styles.postContainer}>
                    <View style={styles.photoPerfil}>
                        <Image
                            style={styles.photoPerfil}
                            source={{
                            uri: photoURL.toString(),
                            }}
                            /> 
                    </View>
                    <View>
                        <Text style={[styles.titleText,{alignSelf: 'center'}]}>
                            {displayName}
                        </Text>
                    </View>   
                </View>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "#F9F4FC"
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
    },
    titleContainer:{
        flex: 0.3,
        flexDirection: 'row'
    },
    titleImageContainer:{
        flex: 0.4,
        resizeMode: 'stretch',
        height:50,
        width:50
    },
    titleTextContainer:{
        flex:0.8
    },
    titleText:{
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: 35
    },
    iconImage: { 
        width: "100%",
        height: "100%",
        resizeMode: "contain"
    },
    postContainer:{
        flex:0.7
    },
    photoPerfil:{
        resizeMode: "contain",
        borderRadius: 100,
        width: 200,
        height: 200,
        alignSelf: 'center'
    }
})
