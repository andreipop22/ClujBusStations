import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Alert,
    StatusBar
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Fumi} from 'react-native-textinput-effects';
import CheckBox from 'react-native-checkbox';

import Button from 'react-native-button';


export default class RegisterScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            value: 0,
            enable: false,
            errors: '',
            name: '',
            nameError: '',
            email: '',
            emailError: '',
            password: '',
            confirmPassword: '',
            passwordError: '',
            confirmPasswordError: '',
            accountStatus: "true",
            acceptTerms: false
        }
        this.handleAcceptTerms = this.handleAcceptTerms.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }

    async onRegisterPressed() {
        const {navigate} = this.props.navigation;
        let error = false;
        if (this.state.name == '') {
            this.setState({nameError: 'This field is required'});
            error = true;
        }
        else if (this.nameStringValidation(this.state.name) === false) {
            this.setState({nameError: 'Full name format is incorrect.'});
            error = true;
        }

        if (this.state.email == '') {
            this.setState({emailError: 'This field is required'});
            error = true;
        }
        else if (this.emailStringIsValid(this.state.email) === false) {
            this.setState({emailError: 'E-mail address format is incorrect.'});
            error = true;
        }


        if (this.state.password == '') {
            this.setState({passwordError: 'This field is required.'});
            error = true;
        }
        // else if (this.passwordIsValid(this.state.password) === false) {
        //     this.setState({passwordError: 'Password must contain at least 8 characters and one special symbol.'});
        //     error = true;
        // }
        if (this.state.confirmPassword == '') {
            this.setState({confirmPasswordError: 'This field is required.'});
            error = true;
        }
        // else if (this.passwordIsValid(this.state.confirmPassword) === false) {
        //     this.setState({confirmPasswordError: 'Password must contain at least 8 characters and one special symbol.'});
        //     error = true;
        // }

        if (this.state.password !== this.state.confirmPassword) {
            this.setState({confirmPasswordError: 'Passwords do not match.'});
            error = true;
        }


        if (error == false) {
            try {
                let response = await fetch('http://192.168.56.1:8080/user/register', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: this.state.name,
                        email: this.state.email,
                        password: this.state.password,
                    })
                });
                let res = await response.text();
                console.log(response.status);
                //res e id-ul
                console.log(res);

                if (response.status >= 200 && response.status < 300) {
                    console.log("res success in: " + res);
                    this.setState({errors: ""});
                    Alert.alert("You will receive a confirmation email. Please confirm your account!");
                    navigate('Login');
                } else {
                    let errors = res;
                    this.setState({backendErrors: errors});
                    throw errors;
                }
            } catch (errors) {
                if (errors.contains('This email is already used'))
                    this.setState({emailError: 'This email is already used'});
                if (errors.contains('Password must contain at least 8 characters and one special symbol')) {
                    this.setState({passwordError: 'Password must contain at least 8 characters and one special symbol'});
                    this.setState({confirmPassword: 'Password must contain at least 8 characters and one special symbol'});
                }
            }
        }
    }

    handleChangeName(event) {
        this.setState({name: event.target.value});
        if (this.state.name.length > -1) {
            this.setState({nameError: false});
        }
    }

    nameStringValidation(nameString) {
        const nameRegex = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/
        return nameRegex.test(nameString);
    }

    handleChangeEmail(event) {
        this.setState({email: event.target.value});
        if (this.emailStringIsValid(this.state.email)) {
            this.setState({emailError: ''});
        }
    }

    handleChangePassword(event) {
        this.setState({password: event.target.value});
        if (this.state.password.length > -1) {
            this.setState({passwordError: ''});
        }
    }

    handleChangeConfirmPassword(event) {
        this.setState({confirmPassword: event.target.value});
        if (this.state.confirmPassword.length > -1) {
            this.setState({confirmPasswordError: ''});
        }
    }

    emailStringIsValid(emailString) {
        if (!emailString || emailString.length === 0) {
            return true;
        }
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()Z[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/;
        return emailRegex.test(emailString);
    }

    handleOnPress(value) {
        let toggle = !this.state.enable;
        if (value == 0) {
            this.setState({accountStatus: "true"});
        } else {
            this.setState({accountStatus: "false"});
        }
        this.setState({value: value});
        this.setState({enable: toggle});
    }

    handleAcceptTerms() {
        if (this.state.acceptTerms == true)
            this.setState({acceptTerms: false});
        else
            this.setState({acceptTerms: true});

    }

    static navigationOptions = {
        header: null,
    }

    render() {
        const {navigate} = this.props.navigation;
        return (

            <ScrollView contentContainerStyle={styles.content}>
                <View>
                    <Text
                        style={styles.title}>
                        Register
                    </Text>
                </View>
                <View style={{padding: 20}}>
                    <Button
                        icon={{name: 'home'}}
                        containerStyle={{padding: 10, height: 40, overflow: 'hidden', backgroundColor: '#1E90FF'}}
                        style={{fontSize: 15, color: 'white', fontFamily: 'Verdana'}}
                        onPress={() => navigate('Home')}
                    >Home
                    </Button>
                </View>

                <View style={styles.mandatoryMessage}>
                    <Text>(*) All the fields are mandatory</Text>
                </View>
                <View>
                    <Fumi
                        style={[styles.TextInput, this.state.nameError != '' && styles.TextInputError]}
                        label={'Full name'}
                        iconClass={FontAwesomeIcon}
                        iconName={'user'}
                        iconColor={'#1E90FF'}
                        iconSize={20}
                        passiveIconColor={'#1E90FF'}
                        fontFamily={'Verdana'}
                        onChangeText={(value) => this.setState({name: value})}
                        onChange={this.handleChangeName}
                    />
                </View>
                <Text style={{color: 'red'}}>
                    {this.state.nameError}
                </Text>
                <View>
                    <Fumi
                        style={[styles.TextInput, this.state.emailError != '' && styles.TextInputError]}
                        label={'E-mail'}
                        iconClass={FontAwesomeIcon}
                        iconName={'envelope'}
                        iconColor={'#1E90FF'}
                        iconSize={20}
                        passiveIconColor={'#1E90FF'}
                        fontFamily={'Verdana'}
                        onChangeText={(value) => this.setState({email: value})}
                        onChange={this.handleChangeEmail}
                    />
                </View>
                <Text style={{color: 'red'}}>
                    {this.state.emailError}
                </Text>
                <View>
                    <Fumi
                        style={[styles.TextInput, this.state.passwordError != '' && styles.TextInputError]}
                        label={'Password'}
                        iconClass={FontAwesomeIcon}
                        iconName={'unlock-alt'}
                        iconColor={'#1E90FF'}
                        iconSize={20}
                        passiveIconColor={'#1E90FF'}
                        fontFamily={'Verdana'}
                        secureTextEntry={true}
                        onChangeText={(value) => this.setState({password: value})}
                        onChange={this.handleChangePassword}
                    />
                </View>
                <Text style={{color: 'red'}}>
                    {this.state.passwordError}
                </Text>
                <View>
                    <Fumi
                        style={[styles.TextInput, this.state.confirmPasswordError != '' && styles.TextInputError]}
                        label={'Confirm Password'}
                        iconClass={FontAwesomeIcon}
                        iconName={'unlock-alt'}
                        iconColor={'#1E90FF'}
                        iconSize={20}
                        passiveIconColor={'#1E90FF'}
                        fontFamily={'Verdana'}
                        secureTextEntry={true}
                        onChangeText={(value) => this.setState({confirmPassword: value})}
                        onChange={this.handleChangeConfirmPassword}
                    />
                </View>
                <Text style={{color: 'red'}}>
                    {this.state.confirmPasswordError}
                </Text>

                <View style={styles.checkbox}>
                    <CheckBox
                        labelStyle={{color: "black", fontSize: 20, fontFamily: 'Verdana'}}
                        label="I agree to the"
                        checked={this.state.acceptTerms}
                        onChange={() => this.handleAcceptTerms()}
                    />
                    <Text
                        style={{color: 'blue', fontWeight: 'bold', fontSize: 20, fontFamily: 'Verdana'}}
                        //onPress={() => navigate('Terms&Conditions')}
                    >
                        Terms & Conditions
                    </Text>
                </View>
                <View style={{paddingBottom: 10}}>
                    <Button
                        disabled={!this.state.acceptTerms}
                        style={
                            [styles.registerButton, this.state.acceptTerms && styles.registerButtonEnable]
                        }
                        onPress={this.onRegisterPressed.bind(this)}
                    >Register
                    </Button>
                </View>
                <View>
                    <Text
                        style={{color: 'blue', paddingBottom: 20, textAlign: 'center', fontSize: 13}}
                        onPress={() => navigate('Login')}>
                        You already have an account? Login!
                    </Text>
                </View>
            </ScrollView>
        );
    }
}

var styles = StyleSheet.create({
    content: {
        backgroundColor: 'white',
        padding: 10,
        justifyContent: 'center',
        flexDirection: 'column',
        flexGrow: 1,
    },
    title: {
        marginTop:30,
        fontSize: 40,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    radioButton: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },
    TextInput: {
        backgroundColor: 'white',
        borderWidth: 1.1,
        borderColor: 'white',
        borderRadius: 10,
        marginBottom: 3
    },
    TextInputError: {
        borderColor: '#e71636',
    },
    registerButton: {
        fontSize: 15, color: 'white', fontFamily: 'Verdana',
        padding: 10,
        height: 40,
        overflow: 'hidden',
        backgroundColor: '#1E90FF',
        opacity: 0.5
    },
    registerButtonEnable: {
        opacity: 1
    },
    checkbox: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    mandatoryMessage: {
        paddingTop: 5,
        paddingBottom: 5,
        alignItems: 'center'
    }
});


