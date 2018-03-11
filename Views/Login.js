import React, {Component} from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Fumi} from 'react-native-textinput-effects';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    ActivityIndicator,
    StatusBar
} from 'react-native';
import CheckBox from 'react-native-checkbox';
import Button from 'react-native-button';
import firebase from 'firebase';


export default class LoginScreen extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: "",
            authenticating: false,
            isChecked: false
        }

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


    onPressSignIn() {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(
            () => {
                this.setState({authenticating: true});
                    this.props.navigation.navigate('Map');
            }
        )
            .catch((()=>{
                this.setState({errors:'Authentication failed!'})
            }))
    }

    static navigationOptions = {
        header: null,
    };

    renderCurrentState() {
        const {navigate} = this.props.navigation;

        if (this.state.authenticating == true) {
            return (
                <View style={styles.form}>
                    <ActivityIndicator size='large'/>
                </View>
            );
        }
        return (
            <View>
                <View>
                    <Text style={styles.loginText}>
                        Login
                    </Text>
                </View>
                <View style={styles.container}>
                    <Fumi
                        style={{backgroundColor: "white"}}
                        label={'Email'}
                        iconClass={FontAwesomeIcon}
                        iconName={'user'}
                        iconColor={'#1E90FF'}
                        iconSize={20}
                        passiveIconColor={'#1E90FF'}
                        fontFamily={'Verdana'}
                        onChangeText={(value) => this.setState({email: value})}
                    />
                </View>
                <View style={styles.container}>
                    <Fumi
                        style={{backgroundColor: "white"}}
                        label={'Password'}
                        iconClass={FontAwesomeIcon}
                        iconName={'unlock-alt'}
                        iconColor={'#1E90FF'}
                        iconSize={20}
                        passiveIconColor={'#1E90FF'}
                        secureTextEntry={true}
                        fontFamily={'Verdana'}
                        onChangeText={(value) => this.setState({password: value})}
                    />
                </View>
                <View style={styles.container}>
                    <CheckBox labelStyle={styles.checkBoxLabel}
                              label='Remember Me'
                              onChangeValue={(value) => this.setState({isChecked: value})}
                    />
                </View>
                <View style={styles.container}>
                    <Button
                        containerStyle={{padding: 10, height: 40, overflow: 'hidden', backgroundColor: '#1E90FF'}}
                        style={{fontSize: 15, color: 'white', fontFamily: 'Verdana'}}
                        onPress={() => this.onPressSignIn()}>
                        SUBMIT
                    </Button>
                </View>

                <View style={styles.forgotPassRegister}>
                    <Text
                        style={styles.link}
                        onPress={() => navigate('Register')}>
                        Register
                    </Text>
                    <Text
                        style={styles.link}
                        onPress={() => navigate('ForgotPassword')}>
                        Forgot Password
                    </Text>
                </View>
                <Text style={{
                    color: 'red'
                }}>
                    {this.state.errors}
                </Text>
            </View>

        );
    }


    render() {
        const {navigate} = this.props.navigation;

        return (
            <ScrollView contentContainerStyle={styles.contentScroll}>
                {this.renderCurrentState()}
            </ScrollView>
        );
    }
}


var styles = StyleSheet.create({
    contentScroll: {
        backgroundColor: 'white',
        padding: 20,
        justifyContent: 'center',
        flexDirection: 'column',
        flexGrow: 1

    },

    loginText: {
        fontFamily: 'Verdana',
        fontWeight: 'bold',
        color: '#595856',
        fontSize: 40,
        alignSelf: 'center',
        paddingBottom: 50
    },

    container: {
        paddingBottom: 10,
    },

    checkBoxLabel: {
        fontSize: 15,
        fontFamily: 'Verdana',
        color: '#595856',
        fontWeight: 'bold'
    },

    forgotPassRegister: {
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },

    link: {
        color: 'blue',
        alignSelf: 'center',
        fontSize: 20,
        fontFamily: 'Verdana'
    },
    image: {
        width: 60,
        height: 60,
        justifyContent: 'space-around',
        alignSelf: 'center'

    }

});

