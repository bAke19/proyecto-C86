import React,{Component} from "react";
import { View,
         Text,
         StyleSheet,
         Image,
         ImageBackground,
         TouchableOpacity
         } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Icon } from "react-native-elements";


         //<a href="https://www.freepik.com/free-photo/mesmerizing-view-three-peaks-hill-cloudy-sky-argentina_16027233.htm#query=landscape&position=2&from_view=search&track=sph">Image by wirestock</a> on Freepik
export default class CreatePost extends Component{
    constructor(props){
        super(props);
        this.state={
            fontLoaded: false
        }
    }

    render(){
        return(
            <TouchableOpacity 
                style={styles.cardContainer}
                onPress={() =>
                    this.props.navigation.navigate("PostScreen", {
                        post: this.props.post
                    })
                  }
                >
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
                                    {this.props.post.title}
                        </Text>
                        <Text style={styles.textTitle}>
                            {this.props.post.author}
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
                

            </TouchableOpacity>
        )
    }
}

const styles= StyleSheet.create({
    cardContainer: { 
        flex:1,        
        borderRadius: 15,
        backgroundColor: "#FDFBFF",
        margin: 5,
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
        marginLeft:9,
        marginRight: 9,
        paddingBottom: 15,
        paddingTop:15,
        marginTop: -70,
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
    }
})