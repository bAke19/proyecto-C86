import React,{Component} from "react";
import { View, Text, StyleSheet,Image,TouchableOpacity } from "react-native";
import { Camera, CameraType, CameraCapturedPicture } from 'expo-camera';

export default class CameraPost extends Component{
    constructor(props){
        super(props);
        this.camRef = React.createRef();
        this.state = {
            image : null,
            permission: false,
            cameraType: CameraType.back,
        }
    }

    toggleCameraType = () => {
        return this.setState({ cameraType: this.state.cameraType === CameraType.back ? CameraType.front : CameraType.back})
        //return await Camera.takePictureAsync()
    }

    takePicture = async () => {  
        const options = { quality: 0.5, base64: true, skipProcessing: true };
       // const data = this.cameraRef.current.takePictureAsync(options);
        console.log("data2: " + this.camRef);
  
      };
    render(){
        return(
            <Camera 
              style={styles.camera} 
              type={this.state.cameraType}
              ratio="1:1">
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.button} onPress={this.toggleCameraType}>
                      <Text style={styles.text}>Flip Camera</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button}
                    onPress={() =>{
                      this.takePicture()
                    }}>
                    <Image
                        style={[styles.iconImage, {height:40, width: 40}]}
                        source={require("../assets/camara1.png")}
                    />
                  </TouchableOpacity>
                </View>
            </Camera>
          )
    }
}

const styles = StyleSheet.create({
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
    iconImage: { 
        width: "100%",
        height: "100%",
        resizeMode: "contain"
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
})