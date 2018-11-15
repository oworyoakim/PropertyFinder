'use strict';
import React, { Component } from 'react';
import {
    Icon,
    Button,
    Header,
    Text,
} from 'native-base';

import { appName } from '../config';

class AppHeader extends Component {
    render() {
        return (
            <Header>
                <Button onPress={() => this.props.navigation.navigate('SearchProperty')}>
                    <Icon name="search" />
                </Button>
                <Button active>
                    <Text style={{ fontWeight: 'bold' }}>{appName}</Text>
                </Button>
                <Button onPress={() => this.props.navigation.navigate('AddProperty')}>
                    <Icon name="add-circle" />
                </Button>
            </Header>
        );
    }
}

export default AppHeader;