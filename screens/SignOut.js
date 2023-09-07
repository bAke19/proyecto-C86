import React,{Component} from "react";
import { View, Text } from "react-native";
import {getAuth, signOut} from "firebase/auth";
import {initializeApp} from "firebase/app";
import { firebaseConfig} from "../config";

const app =  initializeApp(firebaseConfig);
const auth = getAuth(app);

export default class SignOut extends Component{
    componentDidMount(){
        signOut(auth)
        .then(()=>{
            this.props.navigation.replace("LoginScreen")
        })
    }

    render(){
        return(
            <View style={{
                flex:1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text>
                    SignOut
                </Text>
            </View>
        )
    }
}