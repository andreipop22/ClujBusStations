import React, {Component} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from 'firebase';

import {
    StyleSheet,
    ScrollView,
    Text

} from 'react-native';


export default class BusLines extends Component {

    constructor(props) {
        super(props);
    }

    static navigationOptions = {

        drawerIcon: ({tintColor}) => {
            return (
                <MaterialIcons
                    name='bus'
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
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.contentScroll}>
                <Text style={styles.Text}>
                    Bus Lines
                </Text>
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

    Text: {
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


});