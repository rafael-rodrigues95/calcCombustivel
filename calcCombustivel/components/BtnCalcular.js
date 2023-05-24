import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';

export default props => {
    return (
    <View>
        <TouchableHighlight
        style={styles.btnCalc}
        onPress={props.aoPressionar}
        >
            <Text style={styles.btnTxt}>Calcular</Text>
        </TouchableHighlight>
    </View>
)}

const styles = StyleSheet.create({

    btnCalc: {
        backgroundColor: '#048',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
    },

    btnTxt: {
        fontSize: 15,
        textTransform: 'uppercase',
        color: '#fff',
    },

});