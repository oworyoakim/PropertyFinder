'use strict';
import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';

import {
    Container,
    Content,
    Text,
} from 'native-base';

import AppFooter from './AppFooter';
import AppHeader from './AppHeader';

import { leadText, appName, welcomeMessage1 } from '../config';

class HomeScreen extends Component {

    static navigationOptions = {
        title: appName + ' - Home',
    };

    render() {
        return (
            <Container>
                <AppHeader navigation={this.props.navigation} />
                <Content style={styles.content}>
                    <Text style={styles.leadText}>{leadText}</Text>
                    <Text style={styles.welcome}>{welcomeMessage1}</Text>
                    <Image source={require('../images/house1.jpg')} style={styles.image} />
                </Content>
                <AppFooter navigation={this.props.navigation} />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        alignContent: 'space-around',
    },
    leadText: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center',
        margin: 10,
        flex: 1,
    },
    welcome: {
        fontSize: 25,
        textAlign: 'center',
        justifyContent: 'center',
        margin: 10,
        flex: 1,
    },
    image: {
        width: 300,
        height: 250,
        alignSelf: 'center',
        flex: 2,
    },
});

export default HomeScreen;