import React, {Component} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from 'firebase';
import {TabNavigator} from 'react-navigation'
import {
    StyleSheet,
    ScrollView,
    ListView,
    TouchableHighlight,
    Image,
    StatusBar,
} from 'react-native';
import Button from 'react-native-button';
import MetropolitanBuses from './MetropolitanBuses';
import UrbanBuses from './UrbanBuses';
var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

 class BusLines extends Component {

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
            busLines:[],
        };
    }

    componentWillMount() {
        this.getBusLines();

    }


    getBusLines() {
        let ref = firebase.database().ref('busLines/');
        ref.on("value", (data) => {
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
            <Button
                containerStyle={{
                    height: 50,
                    overflow: 'hidden',
                    backgroundColor: '#1E90FF',
                    borderRadius: 5,
                    width: 240,
                    marginTop: 30,
                    marginBottom: 30,
                    alignSelf: 'center',

                }}
                style={{fontSize: 15, color: 'black', fontFamily: 'Verdana', marginLeft:-40, marginRight:20}}
                onPress={() => this.props.navigation.navigate('MetropolitanBuses')}
            >
                <TouchableHighlight>
                    <Image
                        style={styles.ButtonImage}
                        source={require('../Images/BusLineIcon.png')}
                    />
                </TouchableHighlight>
                Metropolitan buses
            </Button>
            <Button
                containerStyle={{
                    height: 50,
                    overflow: 'hidden',
                    backgroundColor: '#1E90FF',
                    borderRadius: 5,
                    width: 240,
                    marginTop: 30,
                    marginBottom: 30,
                    alignSelf: 'center',

                }}
                style={{fontSize: 15, color: 'black', fontFamily: 'Verdana', marginLeft:-100, marginRight:55}}
                onPress={() => this.props.navigation.navigate('UrbanBuses')}
            >
                <TouchableHighlight>
                    <Image
                        style={styles.ButtonImage}
                        source={require('../Images/BusLineIcon.png')}
                    />
                </TouchableHighlight>
                Urban buses
            </Button>
        </ScrollView>

    );
    }

}
// onst Tab =
//     {
//         label: 'HOME',
//         screen: 'Home',
//         icon: require('../img/ic_tabbar_inici.png'),
//         selectedIcon: require('../img/ic_tabbar_inici_on.png'),
//         title: 'HOME',
//     },
//     {
//         label: 'LIST',
//         screen: 'List',
//         icon: require('../img/ic_tabbar_inici.png'),
//         selectedIcon: require('../img/ic_tabbar_inici_on.png'),
//         title: 'LIST',
//     }
//
// };

const Tab = TabNavigator({

    UrbanBuses: {screen: UrbanBuses,},
    MetropolitanBuses: {screen: MetropolitanBuses}}
    ,{

        tabBarPosition: 'bottom',
        swipeEnabled:true,
        tabBarOptions: {
            activeTintColor: 'white',
            inactiveTintColor: 'black',
            activeBackgroundColor: '#66b3ff',
            labelStyle: {
                fontSize: 16,
                padding: 0
            }
        }
    }
);
export  default Tab;

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
        marginTop:30,
        marginLeft:100,
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