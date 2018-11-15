'use strict'
import React, { Component } from 'react';
import { ActivityIndicator, Button, Image, View, Text, TextInput, StyleSheet } from 'react-native';
import PropertyService from '../services/PropertyService';

class Search extends Component {

    static navigationOptions = {
        title: 'Property Finder',
    };

    constructor(props) {
        super(props);
        this.state = {
            searchString: 'kampala',
            isLoading: false,
            properties: [],
            message: '',
        };
    }

    onSearchTextChanged = (event) => {
        this.setState({ searchString: event.nativeEvent.text });
        console.log(this.state.searchString);
    };

    onSearchButtonPressed = async () => {
        try {
            this.setState({ isLoading: true, message: 'Loading...' });
            const results = await PropertyService.searchProperties(this.state.searchString)
            console.log(results);
            // let properties = results.response.listings;
            let properties = results;
            if (properties.length === 0) {
                this.setState({ isLoading: false, message: 'No results matching you search, please try again.' });
            } else {
                this.setState({ isLoading: false, properties: properties, message: '' });
                this.props.navigation.navigate('Results', { properties: this.state.properties });
            }
        } catch (error) {
            console.error(error);
            this.setState({ isLoading: false, message: error.message });
        }
    };

    render() {
        const spinner = this.state.isLoading ?
            <ActivityIndicator size='large' /> : null;
        return (
            <View style={styles.container}>
                <View style={styles.flowRight}>
                    <TextInput
                        underlineColorAndroid={'transparent'}
                        style={styles.searchInput}
                        value={this.state.searchString}
                        onChange={this.onSearchTextChanged}
                        placeholder='city, suburb, name' />
                    <Button
                        onPress={this.onSearchButtonPressed}
                        color='#48BBEC'
                        title='Go!'
                        style={styles.searchButton}
                    />
                </View>
                <View style={styles.imageContainer}>
                    <Image source={require('../images/house.png')} style={styles.image} />
                </View>
                <View style={styles.info}>
                    {spinner}
                    <Text style={styles.message}>{this.state.message}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
    },
    flowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
    },
    searchInput: {
        height: 40,
        padding: 5,
        margin: 5,
        flexGrow: 1,
        fontSize: 24,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        color: '#48BBEC',
    },
    searchButton: {
        padding: 10,
    },
    imageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
    },
    image: {
        width: 217,
        height: 200,
    },
    info: {
        marginBottom: 20,
    },
    message: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
        color: 'red',
    },
});

export default Search;