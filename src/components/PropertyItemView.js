'use strict'
import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import { ListItem, Thumbnail, Left, Body, Right, Text } from 'native-base';

class PropertyItemView extends Component {

    onViewDetails = () => {
        this.props.navigation.navigate('Details', { property: this.props.property });
    };

    render() {
        const { property } = this.props;
        return (
            <ListItem avatar onPress={this.onViewDetails}>
                <Left>
                    <Image style={styles.thumb} source={{ uri: property.thumb_url }} />
                </Left>
                <Body>
                    <Text style={styles.price}>{property.price_formatted}</Text>
                    <Text note style={styles.title}>{property.title}</Text>
                </Body>
                <Right>
                    <Text note>{property.created_at}</Text>
                </Right>
            </ListItem>
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

export default PropertyItemView;