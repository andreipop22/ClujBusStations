import React, {Component} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from 'firebase';

import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    TouchableHighlight,
    Image,
    StatusBar

} from 'react-native';
import Button from 'react-native-button';

var linesArr = [];
export default class BusStation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.navigation.state.params.busStationId,
            name: this.props.navigation.state.params.busName,
            Stations: [],
            lineStation: []
        };
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

    getStations() {
        linesArr=[];
        let ref = firebase.database().ref("bus-Station");
        let ref1 = firebase.database().ref("busLines");
        ref.orderByChild("idStation").equalTo(this.state.id).on("value", (data) => {
            data.forEach(function (childSnapshot) {
                let item = childSnapshot.val();
                ref1.orderByChild("id").equalTo(item.idBus).on("value",(data1)=>{
                    data1.forEach(function (childSnapshot) {
                        let bus = childSnapshot.val();
                        bus.key = childSnapshot.key;
                        console.log(bus.name);
                        linesArr.push(bus);

                    });

                });
            });
            this.setState({lineStation: linesArr});
        });
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
        this.getStations();
    }
    componentDidMount(){

    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.contentScroll}>
                <StatusBar hidden={true}/>
                <Text style={styles.Text}>
                    {this.state.name} Station
                </Text>
                <Text style={styles.Subtitle}>
                    Linii disponibile:
                </Text>
                    {this.state.lineStation.map((bus, i) => (
                        <Button
                            containerStyle={{
                                height: 50,
                                overflow: 'hidden',
                                backgroundColor: '#1E90FF',
                                borderRadius: 5,
                                width: 150,
                                marginTop: 30,
                                alignSelf: 'center',
                                marginBottom: 30

                            }}
                            style={{fontSize: 15, color: 'black', fontFamily: 'Verdana', marginLeft: -40, marginRight: 40}}
                            key={i}
                            onPress={() => this.props.navigation.navigate('PresentationBusLine', {
                                busId: bus.id,
                                busName: bus.name
                            })}                        >
                            <TouchableHighlight>
                                <Image
                                    style={styles.ButtonImage}
                                    source={{uri: bus.image}}
                                />
                            </TouchableHighlight>
                            {bus.name}
                        </Button>
                    ))}
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
        paddingBottom: 10,
    },


});