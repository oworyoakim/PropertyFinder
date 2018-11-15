'use strict';
import React, { Component } from 'react';
import {
    FooterTab,
    Icon,
    Button,
    Footer,
} from 'native-base';

class AppFooter extends Component {
    render() {
        return (
            <Footer>
                <FooterTab>
                    <Button onPress={() => this.props.navigation.navigate('Home')}>
                        <Icon name="home" />
                    </Button>
                    <Button active>
                        <Icon active name="notifications" />
                    </Button>
                    <Button>
                        <Icon name="contact" />
                    </Button>
                </FooterTab>
            </Footer>
        );
    }
}

export default AppFooter;