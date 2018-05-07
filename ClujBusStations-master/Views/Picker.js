import React from 'react';
import {
    Alert,
    Text,
    TextInput,
    StyleSheet,
    View,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

export default class Picker extends React.Component {
    constructor(props) {
        super(props);

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
            ]
        };
    }

    componentDidMount() {
        // if the component is using the optional `value` prop, the parent
        // has the abililty to both set the initial value and also update it
        // setTimeout(() => {
        //     this.setState({
        //         favColor: 'red',
        //     });
        // }, 1000);

        // parent can also update the `items` prop
        // setTimeout(() => {
        //     this.setState({
        //         items: this.state.items.concat([{ value: 'purple', label: 'Purple' }]),
        //     });
        // }, 2000);
    }

    render() {
        return (
            <View style={styles.container}>


                <View style={{ paddingVertical: 5,  width:200}} >

                <Text>What&rsquo;s your favorite color?</Text>
                <RNPickerSelect
                    placeholder={{
                        label: 'Select a color...',
                        value: 'all',
                    }}
                    items={this.state.items}
                    onValueChange={
                        (item) => {
                            this.setState({
                                favColor: item.value,
                            });
                        }
                    }
                    onUpArrow={() => { this.inputRefs.name.focus(); }}
                    onDownArrow={() => { this.inputRefs.picker2.togglePicker(); }}
                    style={{ ...pickerSelectStyles }}
                    value={this.state.favColor}
                    ref={(el) => {
                        this.inputRefs.picker = el;
                    }}
                />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        backgroundColor: '#fff',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
});

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