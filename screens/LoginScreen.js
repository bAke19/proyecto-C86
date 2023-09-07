import React,{Component} from "react";
import { View, 
         Text,
         TouchableOpacity,
         StyleSheet,
         TextInput,
         Image,
         Alert
         } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import {signInWithEmailAndPassword, getAuth} from "firebase/auth";
import {initializeApp} from "firebase/app";
import { firebaseConfig} from "../config";

const app =  initializeApp(firebaseConfig);
const auth = getAuth(app);

export default class LoginScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            email: '',
            password: ''
        }
    }

    singIn = (email,password) => {
        signInWithEmailAndPassword(auth,email,password)
        .then(()=>{
            this.props.navigation.replace('Dashboard')
        })
        .catch(error =>{
            console.log(error)
        })
    }

    singInGoogle = async () => {
        
    }
    render(){
        return(
            <View style={styles.container}>
                <Image
                    source={require("../assets/camara1.png")}
                    style={styles.imageLogo}
                    />
                <Text style={styles.titleText}>
                    SpectaGram
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Correo"
                    onChangeText={(email)=> this.setState({email:email})}
                    />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    onChangeText={(password)=> this.setState({password:password})}
                    passwordRules={true}
                    />

                <TouchableOpacity 
                    onPress={() =>{
                        this.singIn(this.state.email, this.state.password)
                    }}>
                    <LinearGradient
                        colors={['#01dadd', '#13cae1' ,'#2ab7e3', '#489de7', '#6e7cec', '#a54bf4','#bf35f7', '#fb01ff']}
                        start={{ x: 0, y: 0 }}
                        end={{x: 0.8, y: 1 }}
                        style={styles.gradientButton}
                        >
                        <Text style={styles.textButton}>
                            Iniciar Sesion
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.blackButton}
                    onPress={() =>{
                        this.props.navigation.navigate('RegisterScreen')
                    }}>
                        <Text style={styles.textButton}>
                            Nuevo Usuario
                        </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageLogo:{
        width: "30%",
        height: "17%",
        resizeMode: "stretch"
    },
    titleText:{
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: 35
    },
    input:{
        borderRadius: 12,
        borderWidth: 3,
        padding: 7,
        width: "53%",
        margin: 10
    },
    gradientButton:{
        borderRadius: 10,
        alignContent: 'center',
        margin: 10,
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 16.5,
        paddingRight: 16.5,
        justifyContent: 'center'
    },
    blackButton:{
        borderRadius: 10,
        alignContent: 'center',
        justifyContent: 'center',
        margin: 5,
        padding: 12,
        backgroundColor: 'black'
    },
    textButton:{
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: 20,
        color: 'white'
    }

})