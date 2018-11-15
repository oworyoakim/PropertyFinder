'use strict'
import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import {
    Container,
    Header,
    Left,
    Right,
    Content,
    Body,
    Card,
    CardItem,
    Button,
    Text,
    Title,
    Icon
} from 'native-base';


import { appName } from '../config';

import AppFooter from './AppFooter';

class PropertyDetailsScreen extends Component {

    static navigationOptions = {
        title: appName + ' - Property Details',
    };

    constructor(props) {
        super(props);
        this.state = {
            title: appName + ' - Property Details',
            property: this.props.navigation.getParam('property', null),
        };
    }

    render() {
        const { property } = this.state;
        return (
            <Container>
                <Header style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Left style={{ flex: 1.3, }}>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body style={{ flex: 7.2, }}>
                        <Text style={{ color: '#fff' }}>{this.state.title}</Text>
                    </Body>
                    <Right style={{ flex: 1.5, }} />
                </Header>
                <Content>
                    <Card>
                        <CardItem>
                            <Body>
                                <Text style={styles.title}>{property.title}</Text>
                            </Body>
                        </CardItem>
                        <CardItem cardBody>
                            <Image source={{ uri: property.thumb_url }} style={{ height: 200, width: null, flex: 1 }} />
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text style={styles.price}>Price: {property.price_formatted}</Text>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text style={styles.infoLine}>Type: {property.type_desc}</Text>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text style={styles.infoLine}>Bedrooms: {property.bedroom_number}</Text>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text style={styles.infoLine}>Bathrooms: {property.bathroom_number}</Text>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text style={styles.infoLine}>Car Parking: {property.car_spaces}</Text>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text style={styles.infoLine}>Year: {property.construction_year}</Text>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text style={styles.infoLine}>Documents: {property.documents}</Text>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text style={styles.userInfo}>Owner: {property.user.first_name}</Text>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text style={styles.description}>{property.description}</Text>
                            </Body>
                        </CardItem>
                        <CardItem footer>
                            <Left>
                                <Button warning iconLeft onPress={() => alert("Calling Owner")}>
                                    <Icon name='md-call' />
                                    <Text>Call Owner</Text>
                                </Button>
                            </Left>
                            <Right>
                                <Button success onPress={() => alert("Beginning Chat With Owner")}>
                                    <Icon name='md-mail' />
                                    <Text>Begin Chat</Text>
                                </Button>
                            </Right>
                        </CardItem>
                    </Card>
                </Content>
                <AppFooter navigation={this.props.navigation} />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        width: '100%',
        margin: 5,
    },
    property: {
        flex: 1,
    },
    image: {
        width: '100%',
        height: 300,
        marginRight: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 25,
    },
    info: {
        flex: 1,
        justifyContent: 'space-around',
        margin: 5,
    },
    type: {
        fontSize: 22,
        color: '#6B52AE',
        paddingBottom: 5,
    },
    infoLine: {
        fontSize: 22,
        paddingBottom: 5,
    },
    price: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#48BBEC',
        paddingBottom: 5,
    },
    userInfo: {
        marginTop: 5,
        fontSize: 25,
        color: '#F64E1A',
        paddingBottom: 5,
    },
    description: {
        fontSize: 23,
    },
});

export default PropertyDetailsScreen;

