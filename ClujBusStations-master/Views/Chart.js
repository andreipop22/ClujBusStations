import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import {Bar} from 'react-native-pathjs-charts'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
    },
        text: {
        fontFamily: 'Verdana',
        fontWeight: 'bold',
        color: '#595856',
        fontSize: 20,
        alignSelf: 'center',
        paddingBottom: 50
    },
});

class PieChartBasic extends Component {
    static navigationOptions = {
        drawerIcon: ({tintColor}) => {
            return (
                <MaterialIcons
                    name='chart-bar'
                    size={24}
                    style={{color: tintColor}}
                >
                </MaterialIcons>
            );
        }
    };

    render() {
        let data = [
            [{
                "distance": 20,
                "name": "Linia 30"
            },
                {
                    "distance": 10,
                    "name": "Linia 33"
                },
                {
                    "distance": 22,
                    "name": "Linia 6"
                },
                {
                    "distance": 12,
                    "name": "Linia 48"
                },
                {
                    "distance": 30,
                    "name": "Linia M22"
                },
                {
                    "distance": 8,
                    "name": "Linia 1"
                },
                {
                    "distance": 17,
                    "name": "Linia 8"
                },
                {
                "distance": 18,
                "name": "Linia25"
            }],
        ];

        let options = {
            width: 300,
            height: 300,
            margin: {
                top: 20,
                left: 25,
                bottom: 50,
                right: 20
            },
            color: '#2980B9',
            gutter: 20,
            animate: {
                type: 'oneByOne',
                duration: 200,
                fillTransition: 3
            },
            axisX: {
                showAxis: true,
                showLines: true,
                showLabels: true,
                showTicks: true,
                zeroAxis: false,
                orient: 'bottom',
                label: {
                    fontFamily: 'Arial',
                    fontSize: 8,
                    fontWeight: true,
                    fill: '#34495E',
                    rotate: 45
                }
            },
            axisY: {
                showAxis: true,
                showLines: true,
                showLabels: true,
                showTicks: true,
                zeroAxis: false,
                orient: 'left',
                label: {
                    fontFamily: 'Arial',
                    fontSize: 8,
                    fontWeight: true,
                    fill: '#34495E'
                }
            }
        }

        return (
            <View style={styles.container}>
                <Text style={styles.text}>Distanta traseu standard</Text>
                <Bar data={data} options={options} accessorKey='distance'/>
            </View>
        )
    }
}

export default PieChartBasic;
