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

import { appName } from '../config';

import PropertyService from '../services/PropertyService';

class PropertyFormScreen extends Component {

    static navigationOptions = {
        title: appName + ' - New Propery',
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            propTitle: '',
            message: '',
            content: null,
            title: appName + ' - New Propery',
        };
    }

    onTitleTextChanged = (text) => {
        this.setState({ propTitle: text });
    };

    onSearchButtonPressed = async () => {
        try {
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
        } else if (this.state.message.length > 0) {
            this.state.content = <Text style={styles.message}>{this.state.message}</Text>;
        } else {
            this.state.content = (<Input value={this.state.title} placeholder="" onChangeText={this.onTitleTextChanged} />);
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
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18, }}>{this.state.title}</Text>
                    </Body>
                    <Right style={{ flex: 1.5, }} />
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

export default PropertyFormScreen;

