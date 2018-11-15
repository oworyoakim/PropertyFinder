'use strict'
import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import PropertyItem from './PropertyItem';
import { appName } from '../config';

class Results extends Component {

    static navigationOptions = {
        title: appName + ' - Results',
    };

    constructor(props) {
        super(props);
        this.state = {
            properties: this.props.navigation.getParam('properties', []),
            city: this.props.navigation.getParam('city', null),
        };
        Results.navigationOptions.title += ' (' + this.state.city + ')';
    }

    render() {
        return (
            <View style={styles.main}>
                <FlatList
                    data={this.state.properties}
                    renderItem={({ item }) => <PropertyItem property={item} navigation={this.props.navigation} />} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
});

export default Results;

