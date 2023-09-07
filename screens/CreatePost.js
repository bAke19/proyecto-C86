import React,{Component} from "react";
import { View, 
         Text,
         Image,
         Button, 
         StyleSheet, 
         TouchableOpacity,
         SafeAreaView,
         StatusBar,
         ScrollView,
         TextInput,
         KeyboardAvoidingView, 
         Alert} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { Camera, CameraType, CameraCapturedPicture } from 'expo-camera';
import { RFValue } from "react-native-responsive-fontsize";
import CameraPost from "./CameraPost";

import {initializeApp} from "firebase/app";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import { firebaseConfig} from "../config";
import {getStorage, ref, uploadBytes} from "firebase/storage"
         
const app =  initializeApp(firebaseConfig);
const storage = getStorage(app);

export default class CreatePost extends Component{
    constructor(props){
        super(props);
        this.cameraRef = null;
        this.state = {
            permission: false,
            cameraType: CameraType.back,
            image: null,
            imageURL : null,
            imageHeight: 0,
            title: '',
            description: '',
            uid: ''
        }
    }

    componentDidMount(){
      const auth =  getAuth();
      onAuthStateChanged(auth, (user)=>{
        this.setState({
          uid: user.uid
        })
        console.log(user.uid)
      })
    }

    getGranted = async () => {
        const status = await Camera.requestCameraPermissionsAsync();

        if(status.granted){
            //return this.setState({permission: true});
            return this.takePicture()
        }else{
            return await Camera.requestCameraPermissionsAsync()
        }
        
    }

    

    toggleCameraType = () => {
        return this.setState({ cameraType: this.state.cameraType === CameraType.back ? CameraType.front : CameraType.back})
        //return await Camera.takePictureAsync()
    }

    pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          quality: 1,
        });

        var newImageHeight = result.assets[0].height/5
    
        if (!result.canceled) {
          this.setState({
            imageURL: result.assets[0].uri, 
            imageHeight: newImageHeight < 500 ? newImageHeight : 450
          });
        }
        
        
      };

    takePicture = async () => {  
      const cameraResponse = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality:1
      })

      var newPhotoHeight = cameraResponse.assets[0].height/5;

      if(!cameraResponse.canceled){
        this.setState({
          imageURL: cameraResponse.assets[0].uri, 
          imageHeight: newPhotoHeight < 500 ? newPhotoHeight : 450
        });
      }

    };

    uploadImage = async (file) =>{

      const fetchRequest = await fetch(file);
      const theblob = await fetchRequest.blob()
      const imageRef =  ref(storage, 'imagen');

      uploadBytes(imageRef, theblob).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      })
      .catch(error=> Alert.alert(error));
    }

    render(){
            return (
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
                <ScrollView>
                  <Image source={{ uri: this.state.imageURL }} style={!this.state.imageURL ? {height:20}: [styles.imageSelected, {height: this.state.imageHeight}]} />
                  <View style={styles.twoColums}>
                    <TouchableOpacity 
                      style={styles.buttons}
                      onPress={() => {this.getGranted()}}>
                      <Text
                        style={styles.textButtons}>
                        Tomar Foto
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.buttons}
                      onPress={() =>{this.pickImage()}}>
                      <Text
                        style={styles.textButtons}>
                        Galeria
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <KeyboardAvoidingView>
                    <TextInput
                      style={[styles.buttons,styles.inputs]}
                      onChangeText={text => this.setState({title: text})}
                      placeholder="  Titulo"
                      maxLength={100}
                      />
                    <TextInput
                      style={[styles.buttons,styles.inputs]}
                      onChangeText={text => this.setState({description: text})}
                      placeholder="  Descripción"
                      multiline={true}
                      numberOfLines={4}
                      maxLength={200}
                      />
                  </KeyboardAvoidingView>
                </ScrollView>
                <TouchableOpacity 
                  onPress={()=> this.uploadImage(this.state.imageURL)}
                  style={styles.uploadButton}>
                  <Text style={[styles.textButtons,{color: 'white'}]}>
                    Crear Publicación
                  </Text>
                </TouchableOpacity>
                
              </View>
            );        
    }
}
const styles = StyleSheet.create({
    container: {
        flex:1
    },
    camera: {
      flex: 0.8,
      justifyContent: 'center',
      width:'100%'
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'transparent',
      margin: 64,
      alignItems: 'center'
    },
    button: {
      flex: 1,
      alignSelf: 'flex-end',
      alignItems: 'center',
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
    },
    droidSafeArea: {
      marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
    },
    titleContainer:{
        flexDirection: 'row'
    },
    titleImageContainer:{
        flex: 0.4,
        resizeMode: 'stretch',
        height:50,
        width:50
    },
    titleTextContainer:{
        flex:1
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
    imageSelected:{
      width: '90%',
      borderRadius: 30,
      alignSelf: 'center',
      marginTop: 30,
      marginBottom: 30
    },
    twoColums:{
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    buttons:{
      borderRadius: 15,
      borderWidth: 2,
      width:'45%',
      paddingTop: 10,
      paddingBottom: 10,
      justifyContent: 'center',
    },
    textButtons:{
      fontSize:RFValue(15),
      alignSelf: 'center'
    },

    inputs:{
      width: '95%', 
      alignSelf: 'center',
      marginTop: 20
    },
    uploadButton:{
      width: '95%', 
      alignSelf: 'center',
      padding: 10,
      borderRadius: 15,
      backgroundColor: 'black'
    }
    
  });
  