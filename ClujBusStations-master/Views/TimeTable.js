import React, { Component } from 'react';
import {View,Text,Linking,StyleSheet, Alert,SafeAreaView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/Entypo';
import Button from 'react-native-button';
import { FloatingAction } from 'react-native-floating-action';
import { Constants, WebBrowser } from 'expo';
import {ButtonGroup} from 'react-native-elements'



export default class TimeTable extends Component {

    constructor () {
        super();
        this.state = {
            selectedIndex: 2
        };
        this.updateIndex = this.updateIndex.bind(this)
    }

    updateIndex (selectedIndex) {
        this.setState({selectedIndex})
    }
    render() {
        const buttons = ['Monday-Friday', 'Saturday', 'Sunday'];
        const { selectedIndex } = this.state;
        return (
            <View style={styles.container}>
                <ButtonGroup
                    containerBorderRadius={20}
                    onPress={this.updateIndex}
                    selectedIndex={selectedIndex}
                    buttons={buttons}
                    containerStyle={{height: 50, borderRadius:20, marginTop:30}}
                    selectedButtonStyle={{backgroundColor:'#66b3ff'}}
                    selectedTextStyle={{color:'white'}}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container1:{
        flex: 1,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 40,
        textAlign: 'center',
        color: '#1E90FF',
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        //justifyContent: 'space-around',
        //alignItems: 'center',
    }
});
