import React,{Component} from "react";
import { View, 
         Text,
         Image,
         StatusBar,
         Platform,
         SafeAreaView,
         Switch,
         TouchableOpacity,
         Pressable,
         StyleSheet,
         Modal, 
         Alert,
         FlatList} from "react-native";
import {onAuthStateChanged, updateProfile} from "firebase/auth";
import { getStorage,ref, listAll, getDownloadURL } from "firebase/storage";
import { authPerfil } from "../config";
import { Icon } from "react-native-elements";

export default class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            photoURL: false,
            displayName: '',
            uid: '',
            imagesRef: [],
            imagesStorage: [],
            modalVisible: false,
        }
    }

    componentDidMount(){
        onAuthStateChanged(authPerfil, (user)=>{
            this.setState({
                uid: user.uid,
                photoURL: user.photoURL,
                displayName: user.displayName
            });
        })
    }

    changePhotoProfile = async () =>{
        const storage = getStorage()
        const refImagesUser = ref(storage, this.state.uid);
        var imagesLocation = []
        
        listAll(refImagesUser)
        .then((res) => {
            res.items.forEach((itemRef) => {
                var folderStorage =  itemRef._location.path_
                imagesLocation.push(folderStorage);
            });
            this.setState({
                modalVisible: true,
                imagesRef: [...imagesLocation]
            });
            this.getURLImages()
        }).catch((error) => {
            Alert.alert(error)
        });
        
        
    }

    getURLImages = () => {
        const storage = getStorage()
        var imagesStorage = []
        this.state.imagesRef.forEach(imageRef => {
            getDownloadURL(ref(storage, imageRef))
            .then((url) => {  
                imagesStorage.push(url);
                this.setState({imagesStorage: [...imagesStorage]})
            })
            .catch((error) => {
                // Handle any errors
            });
        })

        
    }
    renderItem= ({item: imagen})=>{
        return (
            <TouchableOpacity
                onPress={()=>{
                    updateProfile(authPerfil.currentUser, {
                        photoURL: imagen
                    }).then(() => {
                        console.log('Cambio en la imagen del perfil exitoso')
                    }).catch((error) => {
                        Alert.alert(error)
                    });

                    this.setState({
                        modalVisible: false,
                        photoURL:imagen,
                    })
                }}>
                <Image
                    style={{width:100, height:100}}
                    source={{uri:imagen}}
                    />
            </TouchableOpacity>
)
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
                                uri: photoURL ?
                                photoURL
                                :
                                'https://firebasestorage.googleapis.com/v0/b/spectagram-dfd7e.appspot.com/o/imagen?alt=media&token=3a2b410d-1912-4663-8a31-c00e9ce49e29',
                                
                            }}
                            /> 
                        
                    </View>
                    <TouchableOpacity 
                        onPress={()=>this.changePhotoProfile()}
                        style={styles.iconEdit}>
                        <Icon
                            type="ionicon"
                            name="pencil"
                        />
                    </TouchableOpacity>
                    <View>
                        <Text style={[styles.titleText,{alignSelf: 'center'}]}>
                            {displayName}
                        </Text>
                    </View>   
                    {this.state.modalVisible ?
                    (
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.modalVisible}
                            >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Text style={styles.modalText}>Escoge tu nueva imagen</Text>
                                    <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => this.setState({modalVisible: false})}>
                                    <Text style={styles.textStyle}>Cancelar</Text>
                                    </Pressable>
                                    <FlatList
                                        data={this.state.imagesStorage}
                                        renderItem={this.renderItem}
                                        keyExtractor={(item, index) => {
                                            index.toString()
                                        }}
                                        numColumns={3}
                                        /> 
                                </View>
                            </View>
                        </Modal>
                    )
                    :
                    (
                        <View>
                        </View>
                    )
                    }
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
        width: 150,
        height: 150,
        alignSelf: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.2)'
    },
    iconEdit:{
        marginTop : -35,
        marginLeft: '25%',
        marginBottom: 50
    },

    centeredView: {
        flex: 1,
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 5,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: '#2196F3',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
})
