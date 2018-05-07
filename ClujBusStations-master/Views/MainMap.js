import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Alert,
    Image,
    TouchableOpacity,
    Dimensions,
    TouchableHighlight,
    Text,
    SafeAreaView
} from 'react-native';
import firebase from 'firebase';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Polyline from '@mapbox/polyline';
// import {Font} from 'expo';
import { FloatingAction } from 'react-native-floating-action';
import Button from 'react-native-button';

var MapView = require('react-native-maps');
let myPos = {
    latitude: null,
    longitude: null,
};
const {width, height} = Dimensions.get('window');
const markerIDs = ['Marker1', 'Marker2'];
const timeout = 1000;
let animationTimeout;
const LATITUDE_DELTA = 0.15;
const LONGITUDE_DELTA = 0.15;
let stationsArr = [];
let marker3, marker4;

let mode = 'standard';

 function changeMode(mapMode){
    mode=mapMode;
 }

function deg2rad(deg) {
    return deg * (Math.PI/180)
}
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    let R = 6371; // Radius of the earth in km
    let dLat = deg2rad(lat2-lat1);  // deg2rad below
    let dLon = deg2rad(lon2-lon1);
    let a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let d = R * c; // Distance in km
    return d;
}

export default class MainMap extends Component {

    static navigationOptions = {
        drawerIcon: ({tintColor}) => {
            return (
                <MaterialIcons
                    name='google-maps'
                    size={24}
                    style={{color: tintColor}}
                >
                </MaterialIcons>
            );
        },
        headerRight: <View>
            <TouchableOpacity
                onPress={() => {
                    Alert.alert(
                        'Select Map Type',
                        ' ',
                        [
                            {text: 'Satellite', onPress: () => changeMode('satellite')},
                            {text: 'Hybrid', onPress: () => changeMode('hybrid')},
                            {text: 'Standard', onPress: () => console.log(mode)},
                            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'destructive'},
                        ],
                    );
                }}>
                <Image style={{width: 25, height: 25, marginTop: -5,}} source={require('../Images/street-view.png')}/>
            </TouchableOpacity>
        </View>
    };


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

        this.mapRef = null;
        this.state = {
            mapMode: 'standard',
            coords: [],
            busStations:[],
            fontLoaded:false,
            initialPosition: {
                latitude: 46.7689,
                longitude: 23.5912,
                latitudeDelta: 0.15,
                longitudeDelta: 0.15
            },
            markerPosition: {
                latitude: 46.7689,
                longitude: 23.5912,
                latitudeDelta: 0.15,
                longitudeDelta: 0.15
            }
        };
    }

    createMarker() {
        return {
            latitude: this.state.markerPosition.latitude,
            longitude: this.state.markerPosition.longitude,
        };
    }


    watchID = null;



    getNearbyStations(){
           stationsArr = [];
       let ref = firebase.database().ref("BusStations");
       ref.on("value", (data) => {
           data.forEach(function (childSnapshot) {
               var item = childSnapshot.val();
               item.key = childSnapshot.key;
              let dist=getDistanceFromLatLonInKm(myPos.latitude,myPos.longitude,item.latitude,item.longitude);

               if(dist<0.5) {
                   stationsArr.push(item);
               }
           });
           this.setState({busStations: stationsArr});
       })
   }




    async componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
                let lat = parseFloat(position.coords.latitude);
                let long = parseFloat(position.coords.longitude);
                let initialRegion = {
                    latitude: lat,
                    longitude: long,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                };
                myPos.longitude=long;
                myPos.latitude=lat;

                this.setState({initialPosition: initialRegion});
                this.setState({markerPosition: initialRegion});
            },
            (error) => alert(JSON.stringify(error)),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
        this.watchID = navigator.geolocation.watchPosition((position) => {
            let lat = parseFloat(position.coords.latitude);
            let long = parseFloat(position.coords.longitude);
            let lastRegion = {
                latitude: lat,
                longitude: long,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            };
        });
       animationTimeout = setTimeout(() => {
            this.focus1();
         }, timeout);
    }

    componentWillUnmount() {
        if (animationTimeout) {
            clearTimeout(animationTimeout);
        }
    }

    focusMap(markers, animated) {
        this.map.fitToCoordinates(markers, animated);
    }

    fitPadding() {
        this.map.fitToCoordinates([marker3, marker4], {
            edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
            animated: true,
        });
    }

    focus1() {
        var marker1 = this.createMarker();
        var marker2 = this.createMarker();
        marker3 = this.createMarker();
        marker4 = this.createMarker();
        marker3.longitude = marker3.longitude - 0.01;
        marker4.longitude = marker4.longitude + 0.01;
        marker1.longitude = marker1.longitude - 0.01;
        marker2.longitude = marker2.longitude + 0.01;
        animationTimeout = setTimeout(() => {
            this.focusMap([
                marker1, marker2
            ], true);

        }, timeout);

    }

    componentWillMount() {
        navigator.geolocation.clearWatch(this.watchID);
    }


    render() {
        const actions = [{
            text: 'Nearby Stations',
            icon: require('../Images/bt_bus.png'),
            name: 'bt_nearbyStations',
            position: 2,
            color:'#1E90FF'
        }, {
            text: 'Buy Ticket',
            icon: require('../Images/BusTicket.png'),
            name: 'bt_ticket',
            position: 1,
            color:'#1E90FF'
        }];
        return (
            <View style={styles.container}>
                <MapView provider={this.props.provider} ref={ref => { this.map = ref; }}
                         style={styles.map} initialRegion={{
                    latitude: this.state.initialPosition.latitude,
                    longitude: this.state.initialPosition.longitude,

                    latitudeDelta: 0.18,
                    longitudeDelta: 0.18,
                }}
                         mapType={mode}
                         followsUserLocation={true}>
                    <TouchableOpacity
                        style={{
                            marginLeft:310,
                            marginTop:20,
                            position:'absolute',
                            width:40,
                            height:40,
                            backgroundColor: 'rgba(0,0,0,0.2)',
                            borderRadius:30,
                            alignItems:'center',
                            justifyContent:'center'
                        }}
                        onPress={() => this.fitPadding()}
                    >
                        <MaterialIcons name={'crosshairs-gps'} size={25}/>
                    </TouchableOpacity>

                    <MapView.Marker identifier="Marker2" coordinate={this.state.markerPosition}>
                        <View style={styles.radius}>
                            <View style={styles.marker}/>
                        </View>
                        <MapView.Callout>
                            <TouchableHighlight>
                                <View style={styles.tooltip}>
                                    <Text>My Location</Text>
                                </View>
                            </TouchableHighlight>
                        </MapView.Callout>
                    </MapView.Marker>

                    {this.state.busStations.map((marker, i) => (
                        <MapView.Marker
                            key={i}
                            coordinate={marker}
                        >

                            <Image style={styles.image} source={require('../Images/black_pin.png')}/>
                            <MapView.Callout>
                                <TouchableHighlight
                                    onPress={() => this.props.navigation.navigate('BusStation', {busStationId: marker.id, busName:marker.name})}>
                                    <View style={styles.tooltip}>
                                        <Text>{marker.name}</Text>
                                    </View>
                                </TouchableHighlight>
                            </MapView.Callout>
                        </MapView.Marker>
                    ))}

                </MapView>

                <SafeAreaView >
                    <View  style={{marginLeft:380}} >
                        <FloatingAction
                            actions={actions}
                            position="right"
                            color={'#1E90FF'}
                            ref={(ref) => { this.floatingAction = ref; }}
                            onPressItem={
                                (name) => {
                                    if(name=='bt_ticket') {
                                        this.props.navigation.navigate('BuyTicket');
                                        console.log('Here I am')
                                    }
                                    else if(name=='bt_nearbyStations'){
                                        this.getNearbyStations();
                                    }
                                }
                            }
                        />
                    </View>
                </SafeAreaView>
            </View>
        );
    };

}
MainMap.propTypes = {
    provider: MapView.ProviderPropType,
};
const styles = StyleSheet.create({

    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    tooltip: {
        width: 120,
        justifyContent: 'center',
        alignItems: 'center'
    },
    radius: {
        height: 50,
        width: 50,
        borderRadius: 50 / 2,
        overflow: 'hidden',
        backgroundColor: 'rgba(0, 122, 255,0.1)',
        borderWidth: 1,
        borderColor: 'rgba(0, 122, 255,0.3)',
        alignItems: 'center',
        justifyContent: 'center'
    },

    marker: {
        height: 20,
        width: 20,
        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 20 / 2,
        backgroundColor: '#007AFF',
        overflow: 'hidden'
    },

    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    tabIcon: {
        width: 16,
        height: 16,
    },
    image: {
        width: 30,
        height: 30,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
});