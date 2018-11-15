'use strict'
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import {
    Container,
    List,
    Text,
    Content,
    Header,
    Button,
    Icon,
    Item,
    Input,
    Spinner,
    Left,
    Right,
    Body,
} from 'native-base';

import PropertyItemView from './PropertyItemView';
import { appName } from '../config';

import PropertyService from '../services/PropertyService';

class SearchScreen extends Component {

    static navigationOptions = {
        title: appName + ' - Results',
    };

    constructor(props) {
        super(props);
        this.state = {
            searchString: 'kampala',
            isLoading: false,
            properties: new Array(),
            message: '',
            content: null,
        };
    }

    onSearchTextChanged = (text) => {
        this.setState({ searchString: text });
    };

    onSearchButtonPressed = async () => {
        try {
            if(this.state.searchString.trim() === ''){
                return;
            }
            this.setState({ isLoading: true, message: 'Loading...' });
            const results = await PropertyService.searchProperties(this.state.searchString)
            console.log(results);
            // let properties = results.response.listings;
            let properties = results;
            if (properties.length === 0) {
                this.setState({ isLoading: false, properties: new Array(), message: 'No results matching you search, please try again.' });
            } else {
                this.setState({ isLoading: false, properties: properties, message: '' });
            }
        } catch (error) {
            console.error(error);
            this.setState({ isLoading: false, properties: new Array(), message: error.message });
        }
    };

    render() {
        if (this.state.isLoading) {
            this.state.content = <Spinner color='blue' style={styles.spinner} />;
        } else if (this.state.properties.length) {
            this.state.content = <List
                dataArray={this.state.properties}
                renderRow={(item) => <PropertyItemView property={item} navigation={this.props.navigation} />}
            />;
        } else if (this.state.message.length > 0) {
            this.state.content = <Text style={styles.message}>{this.state.message}</Text>;
        }

        return (
            <Container>
                <Header style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Left style={{ flex: 1.3, }}>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body style={{ flex: 7.2, }}>
                        {/* <TextInput style={{ backgroundColor: '#fff', height: 45, fontSize: 20, width: '100%' }} placeholder="City, Suburb, property type" /> */}
                        <Item rounded style={{ width: '100%' }}>
                            <Input value={this.state.searchString} onChangeText={this.onSearchTextChanged} style={styles.input} placeholder="City, Suburb, property type" />
                        </Item>
                    </Body>
                    <Right style={{ flex: 1.5, }}>
                        <Button transparent onPress={this.onSearchButtonPressed}>
                            <Icon name="search" />
                        </Button>
                    </Right>
                </Header>
                <Content>
                    {this.state.content}
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    message: {
        marginTop: 70,
        marginLeft: 30,
        marginRight: 30,
        color: 'red',
        fontSize: 24,
        alignContent: 'center',
    },
    input: {
        backgroundColor: '#fff',
        height: 45,
        fontSize: 20,
        width: '100%',
    },
    spinner: {
        alignSelf: 'center',
        marginTop: 70,
        marginLeft: 30,
        marginRight: 30,
    },
});

export default SearchScreen;

