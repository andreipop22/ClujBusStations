import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    TouchableHighlight,
    Animated,
    Easing,
    StatusBar
} from 'react-native';
import Button from 'react-native-button';
// import AccessToken from 'react-native-fbsdk';
// import LoginManager from 'react-native-fbsdk';
import FBSDK, { LoginManager , AccessToken } from 'react-native-fbsdk';
// import {GoogleSigninButton} from 'react-native-google-signin';
import firebase from 'firebase';

var codePush = require("react-native-fbsdk");
//const user = GoogleSignin.currentUser();

export default class HomeScreen extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props){
        super(props);
        this.spinValue = new Animated.Value(0)

    }

    spin () {
        this.spinValue.setValue(0)
        Animated.timing(
            this.spinValue,
            {
                toValue: 1,
                duration: 4000,
                easing: Easing.linear
            }
        ).start(() => this.spin())
    }

    componentWillMount(){
        this.spin();
        const config = {
            apiKey: "AIzaSyB2YlHXN5ATjpQNGmLLyzqKmiMjsubdfTc",
            authDomain: "clujbusstations.firebaseapp.com",
            databaseURL: "https://clujbusstations.firebaseio.com",
        };
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
        // GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
        //
        //     GoogleSignin.currentUserAsync().then((user) => {
        //         console.log('USER', user);
        //         this.setState({user: user});
        //     }).done();   // play services are available. can now configure library
        //
        // })
        //     .catch((err) => {
        //         console.log("Play services error", err.code, err.message);
        //     })
    }


    gmailLogin(){
        // GoogleSignin.signIn()
        //     .then((user) => {
        //         console.log(user);
        //         this.setState({user: user});
        //     })
        //     .catch((err) => {
        //         console.log('WRONG SIGNIN', err);
        //     })
        //     .done();
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
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "360deg"]
        });
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
                        {/*<GoogleSigninButton*/}
                            {/*style={{width: 48, height: 48}}*/}
                            {/*size={GoogleSigninButton.Size.Icon}*/}
                            {/*color={GoogleSigninButton.Color.Dark}*/}
                            {/*onPress={this._signIn.bind(this)}/>*/}
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
        fontWeight: 'bold',

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
        width: 180,
        height: 180,
        alignSelf: 'center'

    }
});




