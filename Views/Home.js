import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    TouchableHighlight
} from 'react-native';
import Button from 'react-native-button';
// import AccessToken from 'react-native-fbsdk';
// import LoginManager from 'react-native-fbsdk';
import FBSDK, { LoginManager , AccessToken } from 'react-native-fbsdk';
import firebase from 'firebase';

var codePush = require("react-native-fbsdk");

export default class HomeScreen extends Component {
    static navigationOptions = {
        header: null,
    };

    componentWillMount(){
        const config = {
            apiKey: "AIzaSyB2YlHXN5ATjpQNGmLLyzqKmiMjsubdfTc",
            authDomain: "clujbusstations.firebaseapp.com",
            databaseURL: "https://clujbusstations.firebaseio.com",
        };
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
    }



    _fbAuth(){

        // LoginManager.logInWithReadPermissions(['public_profile']).then(
        //     function(result) {
        //         if(result.isCancelled){
        //             alert('Login cancelled!');
        //         }
        //         else {
        //             AccesToken.getCurrentAccessToken().then((accessTokenData)=>{
        //                 const credential = firebase.auth.FacebookAuthProvider.credential(accessTokenData.accessToken)
        //                 firebase.auth().signInWithCredential(credential).then((result)=>{
        //                     //Promise was succesfull
        //                 }, (error) => {
        //                     console.log(error);
        //                 })
        //             },(error =>{
        //
        //                 console.log('Some error was occured '+error)
        //             }))
        //         }
        //     },
        // )
    }
    render() {
        const {navigate} = this.props.navigation;
        return (
            <ImageBackground source={require('../Images/hexa.jpg')} style={styles.MainContainer}>
                <View style={styles.container}>
                    <Image style={styles.image} source={require('../Images/bus.png')}></Image>
                    <View style={styles.backdropView}>
                        <Text style={styles.title}>
                            Cluj Bus Stations
                        </Text>
                    </View>
                    <View style={styles.buttons}>
                        <Button
                            containerStyle={{
                                paddingRight: 10,
                                height: 40,
                                overflow: 'hidden',
                                backgroundColor: '#4C69BA',
                                borderRadius: 5,
                                marginRight: 30
                            }}
                            style={{fontSize: 15, color: 'white', fontFamily: 'Verdana',marginLeft:10}}
                            onPress={this._fbAuth()}
                            title="Login"
                        >
                            <TouchableHighlight >
                                <Image
                                    style={styles.facebookButton}
                                    source={require('../Images/facebook-icon.png')}
                                />
                            </TouchableHighlight>
                            Login with Facebook</Button>

                        <Button
                            containerStyle={{
                                paddingRight: 30,
                                height: 40,
                                overflow: 'hidden',
                                backgroundColor: '#DD4B39',
                                borderRadius: 5,
                                width:240,
                                marginRight: 30,
                                marginTop:30,
                                marginBottom:30
                            }}
                            style={{fontSize: 15, color: 'white', fontFamily: 'Verdana'}}
                            onPress={this._fbAuth()}
                            title="Login"
                        >
                            <TouchableHighlight >
                                <Image
                                    style={styles.facebookButton}
                                    source={require('../Images/google.png')}
                                />
                            </TouchableHighlight>
                            Login with Google
                        </Button>
                        <Button
                            containerStyle={{
                                padding: 10,
                                height: 40,
                                width:240,
                                overflow: 'hidden',
                                backgroundColor: '#1E90FF',
                                borderRadius: 5,
                                marginRight: 30
                            }}
                            style={{fontSize: 15, color: 'white', fontFamily: 'Verdana'}}
                            onPress={() => navigate('Login')}
                            title="Login"
                        >Login</Button>
                        {/*<Button*/}
                            {/*containerStyle={{*/}
                                {/*padding: 10,*/}
                                {/*height: 40,*/}
                                {/*overflow: 'hidden',*/}
                                {/*backgroundColor: '#1E90FF',*/}
                                {/*borderRadius: 10*/}
                            {/*}}*/}
                            {/*style={{fontSize: 15, color: 'white', fontFamily: 'Verdana'}}*/}
                            {/*onPress={() => navigate('Register')}*/}
                            {/*title="Register"*/}
                        {/*>Register</Button>*/}
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({

    facebookButton:{
        width:40,
        height:40,
},
    backdropView: {
        height: 120,
        width: 320,
        backgroundColor: 'rgba(0,0,0,0)',
    },
    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: null,
        height: null,
    },
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    title: {
        fontSize: 40,
        textAlign: 'center',
        color:'#1E90FF',
        margin: 5,
    },
    details: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    buttons: {
        marginTop:-30,
        flex: .3,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    image: {
        marginTop: 40,
        width: 120,
        height: 120,
        alignSelf: 'center'

    }
});




