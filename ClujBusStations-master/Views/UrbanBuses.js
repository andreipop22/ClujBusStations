import React, {Component} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from 'firebase';
import {
    StyleSheet,
    ScrollView,
    ListView,
    StatusBar,
    View,
    Text,
    TouchableHighlight,
    Image,
    ActivityIndicator
} from 'react-native';

import Button from 'react-native-button';
import PresentationBusLine from "./PresentationBusLine";
import TimeTable from './TimeTable';
import BuyTicket from "./BuyTicket";
import RNPickerSelect from 'react-native-picker-select';
import {List, ListItem, SearchBar} from 'react-native-elements'

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
let returnArr=[];
export default class UrbanBuses extends Component {
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
        },
        tabBarLabel: 'Urban Buses',
        tabBarIcon: ({tintColor}) => (
            <MaterialIcons name='bus' size={22} style={{color: tintColor}}/>
        )
    }
    ;

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
        this.inputRefs = {};

        this.state = {
            favColor: undefined,
            items: [
                {
                    label: 'Red',
                    value: 'red',
                },
                {
                    label: 'Orange',
                    value: 'orange',
                },
                {
                    label: 'Blue',
                    value: 'blue',
                },
            ],
            dataSource: ds,
            loaded: false,
            load: false,
            text:null,
            busLines: [],
        };
    }

    componentWillMount() {

        this.getBusLines();

    }


    getBusLines() {
        let ref = firebase.database().ref('busLines/');
        ref.orderByChild("type").equalTo("urban").on("value", (data) => {
            returnArr = [];

            data.forEach(function (childSnapshot) {
                var item = childSnapshot.val();
                item.key = childSnapshot.key;
                returnArr.push(item);
            });
            this.setState({busLines: returnArr});
            this.setState({load: true})
        })

    }

    onValueChange(value: string) {
        this.setState({
            selected1: value
        });
    }

    filterSearch(text){
        const newData = returnArr.filter(function (item) {
            const itemData = item.name.toUpperCase();
            console.log(itemData);
            const textData = text.toUpperCase();
            return itemData.indexOf(textData)>-1;
        });
        this.setState({busLines:newData});
    }

    renderCurrentState() {
        const {navigate} = this.props.navigation;
        if (!this.state.load) {
            return (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator style={{alignSelf: 'center'}} size='large' color="#1E90FF"/>
                </View>
            );
        }
        return (
            <View>
                <SearchBar
                    lightTheme
                     onChangeText={(text)=>this.filterSearch(text)}
                    value={this.state.text}
                    clearIcon={{ type: 'font-awesome', name: 'close', color:'rgb(30, 144, 255)'}}
                    containerStyle={{backgroundColor:'#F5FCFF', borderColor:'#F5FCFF'}}
                    inputStyle={{color:'rgb(30, 144, 255)'}}
                    icon={{ type: 'font-awesome', name: 'search', color:'rgb(30, 144, 255)'}}
                    placeholder='Search bus line...'
                    placeholderTextColor={'rgb(30, 144, 255)'}
                    round={true}
                />

                <List containerStyle={{marginBottom: 20}}>
                    {this.state.busLines.map((bus, i) => (
                        <ListItem
                            roundAvatar
                            avatar={{uri: bus.image}}
                            key={i}
                            title={bus.name}
                            titleStyle={{color: 'rgb(30, 144, 255)'}}
                            //  subtitle={l.subtitle}
                            onPress={() => this.props.navigation.navigate('PresentationBusLine', {
                                busId: bus.id,
                                busName: bus.name
                            })}
                            rightIcon={
                                <TouchableHighlight underlayColor={'rgb(30, 144, 255)'}
                                                    onPress={() => this.props.navigation.navigate('TimeTable')}>
                                    <Image source={require('../Images/imetable.png')}
                                           style={{width: 25, height: 25}}/>
                                </TouchableHighlight>}
                        />
                    ))
                    }
                </List>
            </View>
        );
    }

    render() {
        return (

            <ScrollView style={styles.container}>
                <StatusBar hidden={true}/>
                <View style={{paddingVertical: 5, width: 200}}>

                    {/*<RNPickerSelect*/}
                    {/*placeholder={{*/}
                    {/*label: 'Select a public transport type...',*/}
                    {/*value: 'all',*/}
                    {/*}}*/}
                    {/*items={this.state.items}*/}
                    {/*onValueChange={*/}
                    {/*(item) => {*/}
                    {/*this.setState({*/}
                    {/*favColor: item.value,*/}
                    {/*});*/}
                    {/*}*/}
                    {/*}*/}
                    {/*onUpArrow={() => {*/}
                    {/*this.inputRefs.name.focus();*/}
                    {/*}}*/}
                    {/*onDownArrow={() => {*/}
                    {/*this.inputRefs.picker2.togglePicker();*/}
                    {/*}}*/}
                    {/*style={{...pickerSelectStyles}}*/}
                    {/*value={this.state.favColor}*/}
                    {/*ref={(el) => {*/}
                    {/*this.inputRefs.picker = el;*/}
                    {/*}}*/}
                    {/*/>*/}
                </View>
                {this.renderCurrentState()}
            </ScrollView>

        );
    }

}
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: 'white',
    },
});
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