import React, {Component} from 'react';
import firebase from 'firebase';
import {
    StyleSheet,
    View,
    Image,
    Text,
    Dimensions,
    TouchableHighlight,
    StatusBar,
    TouchableOpacity,
    Alert
} from 'react-native';
import Polyline from '@mapbox/polyline';
import MapViewDirections from './MapViewDirections';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'

let MapView = require('react-native-maps');
const LATITUDE_DELTA = 0.15;
const LONGITUDE_DELTA = 0.15;
let stationsArr = [];
let retourStationsArr = [];
const {width, height} = Dimensions.get('window');
const GOOGLE_MAPS_APIKEY = 'AIzaSyBE4DQ4lNVRY3ThXiswNWvJLQMwiAZM-A4';


function createStation(longitude, latitude, name) {
    return {
        latitude: latitude,
        longitude: longitude,
        name: name
    };
}
function proba(){
    this.setState({Stations: null});
}
export default class RouteMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            coords: [],
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
            },
            name: this.props.navigation.state.params.busName,
            loaded: this.props.navigation.state.params.tourBusStations,
            retourStations: this.props.navigation.state.params.retourStations,
            Stations: [],
            retourArrStations: [],
            tourMode:true,
            retourMode:true,
        }
    }


    static navigationOptions = {
        headerRight: <View>
            <TouchableOpacity
                onPress={() => {
                    Alert.alert(
                        'Select route type',
                        ' ',
                        [
                            {text: 'Tour',
                                onPress: () => this.setState({mapMode: 'hybrid'})},
                            {text: 'Retour', onPress: () => this.setState({mapMode: 'hybrid'})},
                            {text: 'Tour-Retour', onPress: () => this.setState({mapMode: 'standard'})},
                            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'destructive'},
                        ],
                    );
                }}>
                <Image style={{width: 30, height: 30, marginTop: -5,}} source={require('../Images/route.png')}/>
            </TouchableOpacity>
        </View>
    }


    getStations() {
        stationsArr = [];
        let ref = firebase.database().ref("BusStations");
        for (let i = 0; i < this.state.loaded.length; i++) {
            ref.orderByChild("id").equalTo(this.state.loaded[i].idStation).on("value", (data) => {
                data.forEach(function (childSnapshot) {
                    let item = childSnapshot.val();
                    item.key = childSnapshot.key;
                    stationsArr.push(item);
                });
                this.setState({Stations: stationsArr});
            });

        }

    }

    getRetourStations() {
        retourStationsArr = [];
        var ref = firebase.database().ref("BusStations");
        for (var i = 0; i < this.state.retourStations.length; i++) {
            ref.orderByChild("id").equalTo(this.state.retourStations[i].idStation).on("value", (data) => {
                data.forEach(function (childSnapshot) {
                    var item = childSnapshot.val();
                    item.key = childSnapshot.key;
                    retourStationsArr.push(item);
                });
                this.setState({retourArrStations: retourStationsArr});
            });
        }
    }

    createMarker() {
        return {
            latitude: this.state.markerPosition.latitude,
            longitude: this.state.markerPosition.longitude,
        };
    }

    watchID = null;


    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
                let lat = parseFloat(position.coords.latitude);
                let long = parseFloat(position.coords.longitude);
                let initialRegion = {
                    latitude: lat,
                    longitude: long,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                };
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
        this.getRetourStations();
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true}/>
                <MapView
                    mapType={'standard'}
                    initialRegion={{
                        latitude: 46.7689,
                        longitude: 23.5912,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                    style={StyleSheet.absoluteFill}
                    ref={c => this.mapView = c}
                >
                    {/*<TouchableOpacity*/}
                        {/*style={{*/}
                            {/*marginLeft:310,*/}
                            {/*marginTop:40,*/}
                            {/*position:'absolute',*/}
                            {/*width:40,*/}
                            {/*height:40,*/}
                            {/*backgroundColor: 'rgba(0,0,0,0.2)',*/}
                            {/*borderRadius:30,*/}
                            {/*alignItems:'center',*/}
                            {/*justifyContent:'center'*/}
                        {/*}}*/}
                        {/*onPress={() => this.fitPadding()}*/}
                    {/*>   */}
                        {/*<MaterialIcons name={'crosshairs-gps'} size={25}/>*/}
                    {/*</TouchableOpacity>*/}
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

                    <View style={styles.nameView}>
                        <Text style={styles.nameText}>{this.state.name}</Text>
                    </View>
                    {this.state.Stations.map((marker, i) => (
                        <MapView.Marker
                            key={i}
                            coordinate={marker}
                        >
                            <Image style={styles.image} source={require('../Images/blue_pin.png')}/>
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

                    {this.state.retourArrStations.map((marker, i) => (
                        <MapView.Marker
                            key={i}
                            coordinate={marker}
                        >

                            <Image style={styles.image} source={require('../Images/red_pin.png')}/>
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

                    {(this.state.Stations.map((marker, i) => (
                        <MapViewDirections
                            origin={this.state.Stations[i]}
                            key={i}
                            destination={this.state.Stations[i + 1]}
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeWidth={4}
                            strokeColor="blue"
                        />
                    )))}

                    {(this.state.retourArrStations.map((marker, i) => (
                        <MapViewDirections
                            origin={this.state.retourArrStations[i]}
                            key={i}
                            destination={this.state.retourArrStations[i + 1]}
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeWidth={3}
                            strokeColor="red"
                        />
                    )))}
                </MapView>
            </View>
        );
    };

}
RouteMap.propTypes = {
    provider: MapView.ProviderPropType,
};
const styles = StyleSheet.create({
    nameView: {
        alignItems: 'center',
        backgroundColor: 'rgba(0, 122, 255,0.1)',

    },
    nameText: {
        color: 'red',
        alignSelf: 'center',
        fontSize: 20
    },
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
