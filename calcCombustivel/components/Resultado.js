import React from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

export default props => {
    return (
        <View>
            <Text style={styles.txt}>Melhor combustível: {props.resultado} </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    txt: {
        width: '100%',
        fontSize: 20,
        textAlign: 'center',
    }
})