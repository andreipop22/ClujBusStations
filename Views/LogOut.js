import React, {Component} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from 'firebase';

import {
    StyleSheet,
    ActivityIndicator,
    View,
    ScrollView,

} from 'react-native';


export default class LogOut extends Component {

    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        tabBarLabel: 'Settings',
        drawerIcon: ({tintColor}) => {
            return (
                <MaterialIcons
                    name='logout'
                    size={24}
                    style={{color: tintColor}}
                >
                </MaterialIcons>
            );
        }
    };

    componentWillMount() {
        const config = {
            apiKey: "AIzaSyB2YlHXN5ATjpQNGmLLyzqKmiMjsubdfTc",
            authDomain: "clujbusstations.firebaseapp.com",
            databaseURL: "https://clujbusstations.firebaseio.com",
        };
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
        firebase.auth().signOut();
        this.props.navigation.navigate('Home');
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.contentScroll}>
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

