import React,{Component} from "react";
import { View,
         Text,
         StyleSheet,
         Image,
         ImageBackground,
         TouchableOpacity,
         StatusBar,
         SafeAreaView
         } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Icon } from "react-native-elements";

export default class PostScreen extends Component{
    render(){
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
                    <View>
                        <Image
                            style={styles.imageCard}
                            source={require("../assets/landspance1.jpg")}
                        />
                    </View>
                    <View
                        style={styles.textContainer}
                    >
                        <View>
                            
                            <Text style={styles.textTitle}>
                                        {this.props.route.params.post.title}
                            </Text>
                            
                        </View>
                        <View style={styles.likesContainer}>
                            <Text style={styles.likesNumber}>0</Text>
                            <Icon
                            type={"ionicon"}
                            name="heart-outline"
                            color="#F8EE38"
                            />
                        </View>
                    </View>
                    <Text >
                        {this.props.route.params.post.author}
                    </Text>
                    <Text >
                        description: {this.props.route.params.post.description}
                    </Text>
                </View>
                
            </View>
            
                
        )
    }
}

const styles= StyleSheet.create({
    postContainer: { 
        flex:1,        
        borderRadius: 15,
        backgroundColor: "#FDFBFF",
        margin: 5
    },
    imageCard:{
        width: "95%",
        height: 230,
        borderRadius: 15,
        marginTop:20,
        alignSelf: 'center'
    },
    textTitle:{
        fontWeight: 'bold',
        fontSize: RFValue(15),
        marginLeft: 35,
        color: 'white'
    },
    textContainer:{
        paddingBottom: 15,
        paddingTop:15,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: 'rgba(84, 117, 158, 0.5)',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    likesContainer:{
        flexDirection: 'row',
        
    },
    likesNumber:{
        color: 'white',
        fontSize:RFValue(17),
        marginLeft: 30
    },
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
})