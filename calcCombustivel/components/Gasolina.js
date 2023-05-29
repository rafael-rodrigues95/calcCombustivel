import React from 'react';
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

export default props => {
    return (
        <View>
            <Text>Digite o preço da Gasolina</Text>
            <TextInput
            style={styles.txt}
            keyboardType='numeric'
            onChangeText={text => props.aoModificar(text.replace(/,/g,'.'))}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    txt: {
        width: '100%',
        borderWidth: 1,
        borderBottomColor: '#000',
        padding: 10,
        borderRadius: 10,
        marginBottom: 15,
    }
})