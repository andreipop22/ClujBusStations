import React from 'react';
import {StyleSheet, View, Image, TouchableHighlight, TouchableOpacity} from 'react-native';
import HomeScreen from './Views/Home';
import LoginScreen from './Views/Login';
import RegisterScreen from './Views/Register';
import BusStation from './Views/BusStation';
import PresentationBusLine from './Views/PresentationBusLine';
import DrawerScreen from './Views/DrawerScreen';
import BusLines from './Views/BusLines';
import RouteMap from './Views/RouteMap';
import MaterialIcons from 'react-native-vector-icons/FontAwesome'

// import Example from './Views/Example';
import {
    StackNavigator,
} from 'react-navigation';
import MetropolitanBuses from "./Views/MetropolitanBuses";
import UrbanBuses from "./Views/UrbanBuses";

const Navigation = StackNavigator({


        // Example:{screen:Example},
        Drawer: {screen: DrawerScreen},
        Home: {screen: HomeScreen,
                 navigationOptions: {
                gesturesEnabled: false, //do not allow you to go back on the precendent screen
            }},
        Login: {screen: LoginScreen},
        Register: {screen: RegisterScreen},
        BusStation:{screen: BusStation},
        BusLines:{screen:BusLines},
        PresentationBusLine:{screen:PresentationBusLine},
        MetropolitanBuses:{screen:MetropolitanBuses},
        UrbanBuses:{screen:UrbanBuses},
        RouteMap:{screen:RouteMap,
            navigationOptions: {
                gesturesEnabled: false,
            }}
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
            </View>,
            headerRight: <View>
                <TouchableOpacity
                    onPress={() => {
                       if(this.state.legend == true)
                           this.setState({legend:false});
                       else
                           this.setState({legend:true})
                    }}>
                    <MaterialIcons
                        name='street-view'
                        size={24}
                    >
                    </MaterialIcons>
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
