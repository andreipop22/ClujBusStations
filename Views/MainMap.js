import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableHighlight,
    Dimensions
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Polyline from '@mapbox/polyline';

var MapView = require('react-native-maps');

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const markerIDs = ['Marker1', 'Marker2'];
const timeout = 1000;
let animationTimeout;
const LATITUDE_DELTA = 0.15;
const LONGITUDE_DELTA = 0.15;


function createStation(longitude, latitude, name){
    return {
        latitude: latitude,
        longitude: longitude,
        name:name
    };
}

const MARKERS = [
    createStation(23.617301,46.778918, "Cinema Marasti"),
    createStation(23.611604,46.777899, "P-ta. Marasti"),
    createStation(23.604646,46.775998, "Biserica Sf. Petru"),
    createStation(23.597372,46.773345, "Regionala CFR"),
    createStation(23.59204,46.771692, "Victoria"),
    createStation(23.586971,46.769763, "Memorandumului"),
    createStation(23.580179,46.766507, "Calea Motilor"),
    createStation(23.574954,46.767948, "Hotel Sport"),
    createStation(23.569601,46.766878, "Sala Polivalenta"),


];

export default class MainMap extends Component {
    static navigationOptions = {
        drawerIcon: ({tintColor}) => {
            return (
                <MaterialIcons
                    name='map'
                    size={24}
                    style={{color: tintColor}}
                >
                </MaterialIcons>
            );
        }
    };


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
            }
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
            })
            this.setState({coords: coords})
            return coords
        } catch (error) {
            return error
        }
    }

    componentDidMount() {

       // this.createStations();

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

    componentWillMount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    goToBusLines() {
        this.props.navigation.navigate('BusStation');
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView provider={this.props.provider} ref={ref => { this.map = ref; }}  style={styles.map} initialRegion={{
                    latitude: this.state.initialPosition.latitude,
                    longitude: this.state.initialPosition.longitude,

                    latitudeDelta: 0.18,
                    longitudeDelta: 0.18,
                }}>
                    {MARKERS.map((marker, i) => (
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
                    <MapView.Marker  identifier="Marker2" coordinate={this.state.markerPosition}>
                        <View style={styles.radius}>
                            <View style={styles.marker}/>
                        </View>
                    </MapView.Marker>

                    <MapView.Marker coordinate={{
                        latitude: 46.78175,
                        longitude: 23.6363,
                    }}
                                    icon={require('../Images/_Bus_Station-512.png')}
                    >
                        <Image style={styles.image} source={require('../Images/_Bus_Station-512.png')}>

                        </Image>
                        <MapView.Callout>
                            <TouchableHighlight onPress={() => this.goToBusLines()} underlayColor='#dddddd'>
                                <View style={styles.tooltip}>
                                    <Text>Dispecerat IRA</Text>
                                </View>
                            </TouchableHighlight>
                        </MapView.Callout>

                    </MapView.Marker>
                    <MapView.Polyline
                        coordinates={this.state.coords}
                        strokeWidth={3}
                        strokeColor="blue"/>

                    <MapView.Marker coordinate={{
                        latitude: 46.780784,
                        longitude: 23.6278

                    }}>
                        <Image style={styles.image} source={require('../Images/_Bus_Station-512.png')}>

                        </Image>
                    </MapView.Marker>

                </MapView>
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

    }
});
