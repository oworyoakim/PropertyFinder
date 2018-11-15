'use strict'
import React, { Component } from 'react';
import { ActivityIndicator, Image, StyleSheet } from 'react-native';
import PropertyService from '../services/PropertyService';
import {
    Card,
    CardItem,
    Button,
    Input,
    Icon,
    Toast,
    Form,
    Item,
    Spinner,
    Body,
    Footer,
} from 'native-base';

class SearchView extends Component {

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
                Toast.show({
                    text: this.state.message,
                    buttonText: "Close",
                    type: "warning"
                });
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
            <Spinner color='blue' style={{ alignSelf: 'center' }} /> : null;
        return (
            <Body style={styles.container}>
                <Form style={styles.flowRight}>
                    <Input
                        style={styles.searchInput}
                        underlineColorAndroid={'transparent'}
                        value={this.state.searchString}
                        onChange={this.onSearchTextChanged}
                        placeholder='city, suburb, name' />

                    <Button
                        large
                        style={{ flex: 2 }}
                        primary
                        onPress={this.onSearchButtonPressed}>
                        <Icon name='md-search' />
                    </Button>
                </Form>
                <Image source={require('../images/house.png')} style={styles.image} />
                {spinner}
            </Body>
        );
    }
}

const styles = StyleSheet.create({
    container: { width: '100%' },
    flowRight: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'flex-start',
    },
    searchInput: {
        flex: 8,
        fontSize: 24,
        height: 50,
        marginRight: 5,
        borderWidth: 1,
        borderColor: '#48BBEC',
        color: '#48BBEC',
    },
    imageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        width: 217,
        height: 200,
    },
    image: {
        width: 217,
        height: 200,
    },
    spinner: {
        flexDirection: 'row',
        alignContent: 'center',
    },
});

export default SearchView;