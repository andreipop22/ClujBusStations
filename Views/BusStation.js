import React, {Component} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from 'firebase';

import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    TouchableHighlight,
    Image

} from 'react-native';
import Button from 'react-native-button';

export default class BusStation extends Component {

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

    function () {

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

    render() {
        return (
            <ScrollView contentContainerStyle={styles.contentScroll}>
                <Text style={styles.Text}>
                    Dispicerat Ira
                </Text>
                {/*<Image style={styles.Image}*/}
                       {/*source={require('../Images/BusStationSign.png')}>*/}

                {/*</Image>*/}
                <Text style={styles.Subtitle}>
                    Linii disponibile:
                </Text>
                <View style={styles.buttons}>
                    <Button
                        containerStyle={{
                            height: 50,
                            overflow: 'hidden',
                            backgroundColor: '#1E90FF',
                            borderRadius: 5,
                            width: 180,
                            marginTop: 30,
                            marginBottom: 30
                        }}
                        style={{fontSize: 15, color: 'black', fontFamily: 'Verdana', marginLeft: -40, marginRight: 40}}
                        title="25"
                        onPress={() => this.props.navigation.navigate('Map')}
                    >
                        <TouchableHighlight>
                            <Image
                                style={styles.ButtonImage}
                                source={require('../Images/852641-200.png')}
                            />
                        </TouchableHighlight>
                        Linia 25</Button>
                    <Button
                        containerStyle={{
                            height: 50,
                            overflow: 'hidden',
                            backgroundColor: '#1E90FF',
                            borderRadius: 5,
                            width: 180,
                            marginTop: 30,
                            marginBottom: 30
                        }}
                        style={{fontSize: 15, color: 'black', fontFamily: 'Verdana', marginLeft: -40, marginRight: 40}}
                        title="30"
                        onPress={() => this.props.navigation.navigate('Map')}
                    >
                        <TouchableHighlight>
                            <Image
                                style={styles.ButtonImage}
                                source={require('../Images/BusLineIcon.png')}
                            />
                        </TouchableHighlight>
                        Linia 30
                    </Button>

                    <Button
                        containerStyle={{
                            height: 50,
                            overflow: 'hidden',
                            backgroundColor: '#1E90FF',
                            borderRadius: 5,
                            width: 180,
                            marginTop: 30,
                            marginBottom: 30
                        }}
                        style={{fontSize: 15, color: 'black', fontFamily: 'Verdana', marginLeft: -40, marginRight: 40}}
                        title="101"
                        onPress={() => this.props.navigation.navigate('Map')}
                    >
                        <TouchableHighlight>
                            <Image
                                style={styles.ButtonImage}
                                source={require('../Images/Transport-Tram-icon.png')}
                            />
                        </TouchableHighlight>
                        Linia 101
                    </Button>
                    <Button
                        containerStyle={{
                            height: 50,
                            overflow: 'hidden',
                            backgroundColor: '#1E90FF',
                            borderRadius: 5,
                            width: 180,
                            marginTop: 30,
                            marginBottom: 30
                        }}
                        style={{fontSize: 15, color: 'black', fontFamily: 'Verdana', marginLeft: -40, marginRight: 40}}
                        title="25"
                        onPress={() => this.props.navigation.navigate('Map')}
                    >
                        <TouchableHighlight>
                            <Image
                                style={styles.ButtonImage}
                                source={require('../Images/852641-200.png')}
                            />
                        </TouchableHighlight>
                        Linia 25</Button>
                    <Button
                        containerStyle={{
                            height: 50,
                            overflow: 'hidden',
                            backgroundColor: '#1E90FF',
                            borderRadius: 5,
                            width: 180,
                            marginTop: 30,
                            marginBottom: 30
                        }}
                        style={{fontSize: 15, color: 'black', fontFamily: 'Verdana', marginLeft: -40, marginRight: 40}}
                        title="30"
                        onPress={() => this.props.navigation.navigate('Map')}
                    >
                        <TouchableHighlight>
                            <Image
                                style={styles.ButtonImage}
                                source={require('../Images/BusLineIcon.png')}
                            />
                        </TouchableHighlight>
                        Linia 30
                    </Button>

                    <Button
                        containerStyle={{
                            height: 50,
                            overflow: 'hidden',
                            backgroundColor: '#1E90FF',
                            borderRadius: 5,
                            width: 180,
                            marginTop: 30,
                            marginBottom: 30
                        }}
                        style={{fontSize: 15, color: 'black', fontFamily: 'Verdana', marginLeft: -40, marginRight: 40}}
                        title="101"
                        onPress={() => this.props.navigation.navigate('Map')}
                    >
                        <TouchableHighlight>
                            <Image
                                style={styles.ButtonImage}
                                source={require('../Images/Transport-Tram-icon.png')}
                            />
                        </TouchableHighlight>
                        Linia 101
                    </Button>
                </View>
            </ScrollView>

        );
    }
}
var styles = StyleSheet.create({
    contentScroll: {
        backgroundColor: 'white',
        padding: 20,
        flexGrow: 1

    },
    ButtonImage: {
        marginTop: 5,
        marginLeft: 5,
        width: 40,
        height: 40,
    },
    Subtitle: {
        color: '#595856',
        fontSize: 20,
        marginTop: 20,
        marginRight: 10,
    },

    Buttons: {
        flexDirection: 'column',
        padding: 30,
        marginLeft: 30,
        flex: .3,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    Button: {},

    Text: {
        marginTop: 20,
        fontFamily: 'Verdana',
        fontWeight: 'bold',
        color: '#595856',
        fontSize: 20,
        alignSelf: 'center',
    },
    Image: {
        marginTop:30,
        marginLeft:100,
        width: 100,
        height: 100,
        position: 'absolute'
    },
    container: {
        paddingBottom: 10,
    },


});