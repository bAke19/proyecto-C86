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
import {getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {initializeApp} from "firebase/app";
import {getDatabase, ref, set} from "firebase/database"
import { firebaseConfig} from "../config";


const app =  initializeApp(firebaseConfig);
const auth = getAuth(app);

export default class RegisterScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            name: '',
            lastName: '',
            email: '',
            password: '',
            passwordConfirm: ''
        }
    }
    /*
   
    */
    register = (email,password) => {
        if(this.state.password === this.state.passwordConfirm){

            createUserWithEmailAndPassword(auth,email,password)
            .then((userCredential)=>{
                var newUserUID = userCredential.user.uid;
                const db = getDatabase();
                set(ref(db, 'users/' + newUserUID), {
                    name: this.state.name,
                    last_name: this.state.lastName,
                    email: this.state.email,
                    theme: 'light',
                    posts: 'horizontal'
                });

                updateProfile(auth.currentUser, {
                    displayName: this.state.name + ' ' + this.state.lastName, 
                    photoURL: 'https://png.pngtree.com/png-vector/20220608/ourlarge/pngtree-anonymous-user-unidentified-contact-avatar-png-image_4816655.png'
                  }).then(() => {
                    console.log(userCredential.currentUser)
                  }).catch((error) => {
                    Alert.alert('error')
                  });
                this.props.navigation.replace('LoginScreen');
            })
            .catch(error =>{
                console.log(error)
            })
        }else{
            Alert.alert("Las contraseñas no coinciden");
        }
        
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
                    placeholder="Nombre"
                    onChangeText={(name)=> this.setState({name:name})}
                    />
                <TextInput
                    style={styles.input}
                    placeholder="Apellido"
                    onChangeText={(lastName)=> this.setState({lastName:lastName})}
                    />
                <TextInput
                    style={styles.input}
                    placeholder="Correo"
                    onChangeText={(email)=> this.setState({email:email})}
                    />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    onChangeText={(password)=> this.setState({password:password})}
                    />
                
                <TextInput
                    style={styles.input}
                    placeholder="Confirmación de Contraseña"
                    onChangeText={(passwordConfirm)=> this.setState({passwordConfirm:passwordConfirm})}
                    />

                <TouchableOpacity 
                    onPress={() =>{
                        this.register(this.state.email, this.state.password)
                    }}>
                    <LinearGradient
                        colors={['#01dadd', '#13cae1' ,'#2ab7e3', '#489de7', '#6e7cec', '#a54bf4','#bf35f7', '#fb01ff']}
                        start={{ x: 0, y: 0 }}
                        end={{x: 0.8, y: 1 }}
                        style={styles.gradientButton}
                        >
                        <Text style={styles.textButton}>
                            Registrarme
                        </Text>
                    </LinearGradient>
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
        height: "15%",
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
        padding: 12,
        justifyContent: 'center',
    },
    textButton:{
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: 20,
        color: 'white'
    }

})