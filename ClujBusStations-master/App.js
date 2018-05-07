import React from 'react';
import {StyleSheet, View,Alert, Image, TouchableOpacity} from 'react-native';
import HomeScreen from './Views/Home';
import LoginScreen from './Views/Login';
import RegisterScreen from './Views/Register';
import BusStation from './Views/BusStation';
import PresentationBusLine from './Views/PresentationBusLine';
import DrawerScreen from './Views/DrawerScreen';
import BusLines from './Views/BusLines';
import { TabNavigator } from 'react-navigation';
import RouteMap from './Views/RouteMap';
//import BuyTicket from './Views/BuyTicket';
import MaterialIcons from 'react-native-vector-icons/FontAwesome'

// import Example from './Views/Example';
import {StackNavigator} from 'react-navigation';
import MetropolitanBuses from "./Views/MetropolitanBuses";
import UrbanBuses from "./Views/UrbanBuses";
import BuyTicket from "./Views/BuyTicket";
import TimeTable from "./Views/TimeTable";

const Navigation = StackNavigator({



        TimeTable:{screen:TimeTable},
        Drawer: {screen: DrawerScreen},
        Home: {screen: HomeScreen,
            navigationOptions: {
                gesturesEnabled: false, //do not allow you to go back on the precendent screen
            }},
        Login: {screen: LoginScreen},
        Register: {screen: RegisterScreen},
        BusStation:{screen: BusStation},
        BuyTicket:{screen: BuyTicket},
        PresentationBusLine:{screen:PresentationBusLine},
        MetropolitanBuses:{screen:MetropolitanBuses},
        BusLines:{screen:BusLines},
        UrbanBuses:{screen:UrbanBuses},

        RouteMap:{screen:RouteMap}
    },
    {
        headerMode: 'float',
        navigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: 'rgb(30, 144, 255)',
                paddingLeft: 10,
                paddingRight: 10,
                height: 35,
                paddingTop:-10,

            },
            title: 'Cluj Bus Stations',
            headerTintColor: 'white',
            headerLeft: <View>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('DrawerOpen')
                    }}>
                    <Image style={styles.image} source={require('./Images/menu.png')}></Image>
                </TouchableOpacity>
            </View>
    })
    });


export default Navigation;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    legend:{
        height:60,
        width:60,
        position:'absolute',
        backgroundColor: 'white',
    },
    image: {
        width: 30,
        height: 30,
    }
});
