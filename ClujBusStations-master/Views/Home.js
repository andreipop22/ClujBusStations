import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    TouchableHighlight,
    Alert,
    ActivityIndicator
} from 'react-native';
import Button from 'react-native-button';
import firebase from 'firebase';
import {Font} from 'expo';


export default class HomeScreen extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            authenticating: false,
            fontLoaded: false
        }

    }

  async componentDidMount() {
       await Font.loadAsync({
            'open-sans-italic': require('../assets/fonts/PermanentMarker-Regular.ttf'),
        });
        this.setState({fontLoaded: true});

    }


    componentWillMount() {
        const config = {
            apiKey: "AIzaSyB2YlHXN5ATjpQNGmLLyzqKmiMjsubdfTc",
            authDomain: "clujbusstations.firebaseapp.com",
            databaseURL: "https://clujbusstations.firebaseio.com",
        };
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
    }

    async facebookLogIn() {
        const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync('198241124118826', {
            permissions: ['public_profile'],
        });
        if (type === 'success') {
            // Get the user's name using Facebook's Graph API
            const response = await fetch(
                `https://graph.facebook.com/me?access_token=${token}`);
            this.props.navigation.navigate('Drawer');
            Alert.alert(
                'Logged in!',
                `Hi ${(await response.json()).name}!`,
            );
        }
    }

    async signInWithGoogleAsync() {
        try {
            this.setState({authenticating: true});
            const result = await Expo.Google.logInAsync({
                iosClientId: '471040849625-rov29hbvhkfssk9dfr30d3eiec4k3k8t.apps.googleusercontent.com',
                scopes: ['profile', 'email'],
            });

            if (result.type === 'success') {
                console.log('succes');
                this.props.navigation.navigate('Drawer');

                return result.accessToken;
            } else {
                console.log('nu chiar');
                return {cancelled: true};
            }
        } catch (e) {
            console.log('error');
            return {error: true};
        }
    }

    renderCurrentState() {
        const {navigate} = this.props.navigation;

        if (this.state.authenticating) {
            return (
                <View>
                    <ActivityIndicator size='large' color="#1E90FF"/>
                </View>
            );
        }
        return (
            <ImageBackground source={require('../Images/hexa.jpg')} style={styles.MainContainer}>
                <View style={styles.container}>


                    <Image style={styles.image} source={require('../Images/bus.png')}/>
                    <View style={styles.backdropView}>
                        {this.state.fontLoaded ? (
                            <Text style={styles.title}>
                                Cluj Bus Stations
                            </Text>
                        ) : null
                        }
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
                            style={{fontSize: 15, color: 'white', fontFamily: 'Verdana', marginLeft: 10}}
                            title="Login"
                            onPress={() => this.facebookLogIn()}
                        >
                            <TouchableHighlight>
                                <Image
                                    style={styles.facebookButton}
                                    source={require('../Images/facebook-icon.png')}
                                />
                            </TouchableHighlight>
                            Login with Facebook
                        </Button>

                        <Button
                            containerStyle={{
                                paddingRight: 30,
                                height: 40,
                                overflow: 'hidden',
                                backgroundColor: '#DD4B39',
                                borderRadius: 5,
                                width: 240,
                                marginRight: 30,
                                marginTop: 30,
                                marginBottom: 30
                            }}
                            style={{fontSize: 15, color: 'white', fontFamily: 'Verdana'}}
                            onPress={this.signInWithGoogleAsync.bind(this)}
                            title="Login"
                        >
                            <TouchableHighlight>
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
                                width: 240,
                                overflow: 'hidden',
                                backgroundColor: '#1E90FF',
                                borderRadius: 5,
                                marginRight: 30
                            }}
                            style={{fontSize: 15, color: 'white', fontFamily: 'Verdana'}}
                            onPress={() => navigate('Login')}
                            title="Login"
                        >Login</Button>
                    </View>
                </View>
            </ImageBackground>
        );
    }

    render() {
        return (
            <ImageBackground source={require('../Images/hexa.jpg')} style={styles.MainContainer}>
                <View style={styles.container}>
                    {this.renderCurrentState()}
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({

    facebookButton: {
        width: 40,
        height: 40,
    },
    backdropView: {
        height: 120,
        //width: ,
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
    },
    title: {
        fontSize: 40,
        textAlign: 'center',
        color: '#1E90FF',
        fontWeight: 'bold',
        fontFamily:'open-sans-italic'
    },
    details: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    buttons: {
        marginTop: -30,
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




