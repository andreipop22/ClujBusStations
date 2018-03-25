import React, {Component} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from 'firebase';
import {
    StyleSheet,
    ScrollView,
    ListView,
    TouchableHighlight,
    Image,
    StatusBar
} from 'react-native';
import Button from 'react-native-button';
import PresentationBusLine from "./PresentationBusLine";

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class UrbanBuses extends Component {

    constructor(props) {
        super(props);
        const config = {
            apiKey: "AIzaSyB2YlHXN5ATjpQNGmLLyzqKmiMjsubdfTc",
            authDomain: "clujbusstations.firebaseapp.com",
            databaseURL: "https://clujbusstations.firebaseio.com",
        };
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }

        this.state = {
            dataSource: ds,
            loaded: false,
            busLines: [],
        };
    }

    componentWillMount() {
        this.getBusLines();

    }


    getBusLines() {
        let ref = firebase.database().ref('busLines/');
        ref.orderByChild("type").equalTo("urban").on("value", (data) => {
            var returnArr = [];

            data.forEach(function (childSnapshot) {
                var item = childSnapshot.val();
                item.key = childSnapshot.key;

                returnArr.push(item);
            });
            this.setState({busLines: returnArr});
        })

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

    render() {
        return (

            <ScrollView style={styles.container}>
                <StatusBar hidden={true}/>
                {this.state.busLines.map((bus, i) => (
                    <Button
                        containerStyle={{
                            height: 50,
                            overflow: 'hidden',
                            backgroundColor: '#1E90FF',
                            borderRadius: 5,
                            width: 180,
                            marginTop: 30,
                            alignSelf: 'center',
                            marginBottom: 30

                        }}
                        style={{fontSize: 15, color: 'black', fontFamily: 'Verdana', marginLeft: -40, marginRight: 40}}
                        key={i}
                        onPress={() => this.props.navigation.navigate('PresentationBusLine', {
                            busId: bus.id,
                            busName: bus.name
                        })}
                    >
                        {/*<TouchableHighlight>*/}
                            {/*<Image*/}
                                {/*style={styles.ButtonImage}*/}
                                {/*source={bus.image}*/}
                            {/*/>*/}
                        {/*</TouchableHighlight>*/}
                        {bus.name}
                    </Button>
                ))}
            </ScrollView>

        );
    }

}
var styles = StyleSheet.create({
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
    Text: {
        marginTop: 20,
        fontFamily: 'Verdana',
        fontWeight: 'bold',
        color: '#595856',
        fontSize: 20,
        alignSelf: 'center',
    },
    Image: {
        marginTop: 30,
        marginLeft: 100,
        width: 100,
        height: 100,
        position: 'absolute'
    },
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        padding: 12,
        flexDirection: 'column',
    },
    text: {
        fontSize: 25
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
    },
    rightContainer: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        marginBottom: 8,
        textAlign: 'center',
    },
    year: {
        textAlign: 'center',
    }

});