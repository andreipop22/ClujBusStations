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

let retour = [];
let tour =[];
export default class PresentationBusLine extends Component {

    constructor(props) {
        super(props);
        this.state = {
            busName: this.props.navigation.state.params.busName,
            busId: this.props.navigation.state.params.busId,
            tourStations: [],
            retourStations:[]
        };
    }



    getBusStations() {
       tour=[];
       retour=[];
        let ref = firebase.database().ref("bus-Station");
        ref.orderByChild("idBus").equalTo(this.state.busId).on("value", (data) => {
            data.forEach(function (childSnapshot) {
                let item = childSnapshot.val();
                item.key = childSnapshot.key;
                if(item.direction=='dus')
                    tour.push(item);
                else if(item.direction=='intors')
                    retour.push(item);
            });
            this.setState({tourStations: tour});
            this.setState({retourStations: retour});

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
        if(this.state.tourStations.length==0)
            this.getBusStations();
    }


    render() {
        return (
            <ScrollView contentContainerStyle={styles.contentScroll}>
                <StatusBar hidden={true}/>
                <Text style={styles.Text}>
                    {this.state.busName}
                </Text>
                <ScrollView style={styles.container}>
                    {this.state.tourStations.map((bus, i) => (
                    <Text
                        style={{fontSize: 15, color: 'black', fontFamily: 'Verdana', marginRight: 40}}
                        key={i}
                    >
                        {tour[i].idStation}
                    </Text>

                    ))}
                    {this.state.retourStations.map((bus, i) => (
                        <Text
                            style={{fontSize: 15, color: 'red', fontFamily: 'Verdana', marginRight: 40}}
                            key={i}
                        >
                            {retour[i].idStation}
                        </Text>

                    ))}
                </ScrollView>
                <View style={styles.container}>
                    <Button
                        containerStyle={{
                            padding: 10,
                            marginTop: 10,
                            height: 40,
                            overflow: 'hidden',
                            backgroundColor: '#1E90FF'
                        }}
                        style={{fontSize: 15, color: 'white', fontFamily: 'Verdana'}}
                        onPress={() => this.props.navigation.navigate('RouteMap',{busName:this.state.busName,tourBusStations:this.state.tourStations, retourStations:this.state.retourStations})}>
                        View Route
                    </Button>
                </View>

            </ScrollView>

        );
    }
}
let styles = StyleSheet.create({
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
        width: 300,
    },
    container: {
        paddingBottom: 10,
    },


});