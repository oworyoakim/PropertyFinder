'use strict'
import React, { Component } from 'react';
import { Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { formatPrice } from '../utils';

class Propertyproperty extends Component {

    onViewDetails = () => {
        this.props.navigation.navigate('Details', { property: this.props.property });
    };

    render() {
        const { property } = this.props;
        return (
            <TouchableOpacity style={styles.main} onPress={this.onViewDetails}>
                <View style={styles.rowContainer}>
                    <Image style={styles.thumb} source={{ uri: property.thumb_url }} />
                    <View style={styles.textContainer}>
                        <Text style={styles.price}>{property.price_formatted}</Text>
                        <Text style={styles.title}>{property.title}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        margin: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        backgroundColor: '#fff',
    },
    thumb: {
        width: 80,
        height: 80,
        marginRight: 10
    },
    textContainer: {
        flex: 1
    },
    price: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#48BBEC',
    },
    title: {
        fontSize: 18,
        color: '#656565'
    },
    rowContainer: {
        flexDirection: 'row',
        padding: 10
    },
});

export default Propertyproperty;