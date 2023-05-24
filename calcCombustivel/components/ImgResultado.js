import React from 'react';
import {
    Image,
    StyleSheet,
    View,
} from 'react-native';

export default props => {
    return (
        <View>
            {
                props.combustivel == '' ?
                    <Image
                        source={require('../assets/combustivel.jpg')}
                        style={styles.combustivel}
                    />
                    :
                    props.combustivel == 'A' ?
                        <Image
                            source={require('../assets/alcool.jpg')}
                            style={styles.combustivel}
                        />
                        :
                        <Image
                            source={require('../assets/gasolina.jpg')}
                            style={styles.combustivel}
                        />
            }

        </View>
    )
}

const styles = StyleSheet.create({
    combustivel: {
        width: 218,
        height: 200,
        resizeMode: 'stretch',
    }
})