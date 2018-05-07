import React, { Component } from 'react';
import {View,Text,Linking,StyleSheet, Alert,SafeAreaView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/Entypo';
import Button from 'react-native-button';
import { FloatingAction } from 'react-native-floating-action';

import { Constants, WebBrowser } from 'expo';



export default class BuyTicket extends Component {
    static navigationOptions = {
        drawerIcon: ({tintColor}) => {
            return (
                <MaterialIcons
                    name='ticket'
                    size={24}
                    style={{color: tintColor}}
                >
                </MaterialIcons>
            );
        }
    };

    _handleOpenWithLinking = () => {
        Linking.openURL('sms:7479/aaaaa');
    };

    render() {
        const actions = [{
            text: 'Accessibility',
            icon: require('../Images/ic_accessibility.png'),
            name: 'bt_accessibility',
            position: 2
        }, {
            text: 'Language',
            icon: require('../Images/ic_language.png'),
            name: 'bt_language',
            position: 1
        }];
        return (
            <View style={styles.container}>

                <Button
                    containerStyle={{
                        padding: 10,
                        height: 40,
                        width: 240,
                        overflow: 'hidden',
                        backgroundColor: '#1E90FF',
                        borderRadius: 5,
                        marginRight: 30,
                        marginTop:80
                    }}
                    style={{fontSize: 15, color: 'white', fontFamily: 'Verdana'}}
                    title="Login"
                    onPress={this._handleOpenWithLinking}
                >Buy Ticket</Button>
                <SafeAreaView >
                    <View >
                        <FloatingAction
                            actions={actions}
                            position="right"
                            ref={(ref) => { this.floatingAction = ref; }}
                            onPressItem={
                                (name) => {
                                    Alert.alert('Icon pressed', `the icon ${name} was pressed`);
                                }
                            }
                        />
                    </View>
                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container1:{
        flex: 1,
        backgroundColor: '#fff'
    },
    container: {
        flex: 1,
        justifyContent: 'space-around',
             alignItems: 'center',
    },
    image:{

    }
});
