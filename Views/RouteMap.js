import React, {Component} from 'react';
import firebase from 'firebase';
import {
    StyleSheet,
    View,
    Image,
    Text,
    Dimensions,
    TouchableHighlight,
    StatusBar
} from 'react-native';
import Polyline from '@mapbox/polyline';
import MapViewDirections from './MapViewDirections';

var MapView = require('react-native-maps');

const timeout = 1000;
let animationTimeout;
const LATITUDE_DELTA = 0.15;
const LONGITUDE_DELTA = 0.15;
const origin = {latitude: 46.781842,  longitude: 23.6362};
const destination = {latitude: 46.780784, longitude: 23.6278};
const GOOGLE_MAPS_API_KEY='AIzaSyCW3Luze8Z-YUAAtiU1fHyIo1H4y2gf6rY';
var stationsArr = [];


const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;


const GOOGLE_MAPS_APIKEY = 'AIzaSyBE4DQ4lNVRY3ThXiswNWvJLQMwiAZM-A4';


function createStation(longitude, latitude, name){
    return {
        latitude: latitude,
        longitude: longitude,
        name:name
    };
}

export default class RouteMap extends Component {
    // static navigationOptions = {
    //     drawerIcon: ({tintColor}) => {
    //         return (
    //             <MaterialIcons
    //                 name='map'
    //                 size={24}
    //                 style={{color: tintColor}}
    //             >
    //             </MaterialIcons>
    //         );
    //     }
    // };


    constructor(props) {
        super(props);
        this.mapRef = null;
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
            loaded: this.props.navigation.state.params.busStations,
            Stations:[]
        }
    }


    getStations() {
        stationsArr=[];
        var ref = firebase.database().ref("BusStations");
        for(var i=0;i<this.state.loaded.length;i++){
            ref.orderByChild("id").equalTo(this.state.loaded[i].idStation).on("value", (data)=>{
                data.forEach(function (childSnapshot) {
                    var item=childSnapshot.val();
                    item.key = childSnapshot.key;
                    stationsArr.push(item);
                });
                // var tourStation=[];
                // var ti=0;
                // var retourStation=[];
                // var ri=0;
                // for(var i=0;i<stationsArr.length;i++)
                // {
                //     if(stationsArr[i].direction='dus')
                //         tourStation[ti]=stationsArr[i];
                //     else if(stationsArr[i].direction='intors')
                //         to
                // }
                this.setState({Stations:stationsArr});
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


    async getDirections(startLoc, destinationLoc) {
        try {
            let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }`)
            let respJson = await resp.json();
            let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
            let coords = points.map((point, index) => {
                return {
                    latitude: point[0],
                    longitude: point[1]
                }
            });
            this.setState({coords: coords});
            return coords
        } catch (error) {
            return error
        }
    }

    componentDidMount() {

        this.getDirections("46.781842, 23.6362", "46.780784,23.6278");
        this.getDirections("46.781842, 23.6362", "46.766878,23.569601");


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
        })
        // animationTimeout = setTimeout(() => {
        //     this.focus1();
        // }, timeout);
    }

    // componentWillUnmount() {
    //     if (animationTimeout) {
    //         clearTimeout(animationTimeout);
    //     }
    // }

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

    focusMap(markers, animated) {
        this.map.fitToCoordinates(markers, animated);
    }

    focus1() {
        var marker1 = this.createMarker();
        var marker2 = this.createMarker();
        marker1.longitude=marker1.longitude-0.01;
        marker2.longitude=marker2.longitude+0.01;
        animationTimeout = setTimeout(() => {
            this.focusMap([
                marker1,marker2
            ], true);

        }, timeout);

    }

    // componentWillMount() {
    //     navigator.geolocation.clearWatch(this.watchID);
    // }

    goToBusLines() {
        this.props.navigation.navigate('BusStation');
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true}/>
                {/*<MapView provider={this.props.provider} ref={ref => { this.map = ref; }}  style={styles.map} initialRegion={{*/}
                    {/*latitude: this.state.initialPosition.latitude,*/}
                    {/*longitude: this.state.initialPosition.longitude,*/}

                    {/*latitudeDelta: 0.18,*/}
                    {/*longitudeDelta: 0.18,*/}
                {/*}}>*/}
                    {/*{this.state.Stations.map((marker, i) => (*/}
                        {/*<MapView.Marker*/}
                            {/*key={i}*/}
                            {/*coordinate={marker}*/}
                        {/*>*/}
                            {/*<Image style={styles.image} source={require('../Images/_Bus_Station-512.png')}/>*/}
                            {/*<MapView.Callout>*/}
                                {/*<TouchableHighlight onPress={() => this.goToBusLines()} underlayColor='#dddddd'>*/}
                                    {/*<View style={styles.tooltip}>*/}
                                        {/*<Text>{marker.name}</Text>*/}
                                    {/*</View>*/}
                                {/*</TouchableHighlight>*/}
                            {/*</MapView.Callout>*/}
                        {/*</MapView.Marker>*/}
                    {/*))}*/}

                {/*</MapView>*/}
                <MapView
                    initialRegion={{
                        latitude: 46.7689,
                        longitude: 23.5912,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                    style={StyleSheet.absoluteFill}
                    ref={c => this.mapView = c}
                    // onPress={this.onMapPress}
                >
                    {this.state.Stations.map((marker, i) => (
                        <MapView.Marker
                            key={i}
                            coordinate={marker}
                        >

                            <Image style={styles.image} source={require('../Images/_Bus_Station-512.png')}/>
                            <MapView.Callout>
                                <TouchableHighlight onPress={() => this.goToBusLines()} underlayColor='#dddddd'>
                                    <View style={styles.tooltip}>
                                        <Text>{marker.name}</Text>
                                    </View>
                                </TouchableHighlight>
                            </MapView.Callout>
                        </MapView.Marker>
                    ))}

                    {(this.state.Stations.map((marker,i) => (
                        <MapViewDirections
                            origin={this.state.Stations[i]}
                            key={i}
                           // waypoints={ (this.state.Stations.length > 2) ? this.state.Stations.slice(1, -1): null}
                            destination={this.state.Stations[i+1]}
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeWidth={3}
                            strokeColor="blue"
                            onReady={(result) => {
                                this.mapView.fitToCoordinates(result.coordinates, {
                                    edgePadding: {
                                        right: (width / 20),
                                        bottom: (height / 20),
                                        left: (width / 20),
                                        top: (height / 20),
                                    }
                                });
                            }}
                            onError={(errorMessage) => {
                            }}
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
        alignItems:'center'
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
