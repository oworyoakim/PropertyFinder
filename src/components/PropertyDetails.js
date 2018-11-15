'use strict'
import React, { Component } from 'react';
import { View, ScrollView, Text, Image, StyleSheet } from 'react-native';

class PropertyDetails extends Component {

    static navigationOptions = {
        title: 'Property Details',
    };

    constructor(props) {
        super(props);
        this.state = {
            property: this.props.navigation.getParam('property', null),
        };
    }

    render() {
        const { property } = this.state;
        return (
            <View style={styles.main}>
                <ScrollView style={styles.property}>
                    <Image
                        style={styles.image}
                        source={{ uri: property.thumb_url }}
                    />
                    <Text style={styles.title}>{property.title}</Text>
                    <View style={styles.info}>
                        <Text style={styles.price}>Price: {property.price_formatted}</Text>
                        <Text style={styles.infoLine}>Type: {property.type_desc}</Text>
                        <Text style={styles.infoLine}>Bedrooms: {property.bedroom_number}</Text>
                        <Text style={styles.infoLine}>Bathrooms: {property.bathroom_number}</Text>
                        <Text style={styles.infoLine}>Car Parking: {property.car_spaces}</Text>
                        <Text style={styles.infoLine}>Year: {property.construction_year}</Text>
                        <Text style={styles.userInfo}>Owner: {property.user.first_name}</Text>
                        <Text style={styles.description}>{property.description}</Text>
                    </View>
                </ScrollView>
            </View>
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
        fontSize: 23,
        backgroundColor: 'rgba(240,150,45,0.4)',
        marginBottom: 10,
        padding: 10,
    },
    info: {
        flex: 1,
        justifyContent: 'space-around',
        margin: 5,
    },
    type: {
        fontSize: 25,
        color: '#6B52AE',
        paddingBottom: 10,
    },
    infoLine: {
        fontSize: 25,
        paddingBottom: 10,
    },
    price: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#48BBEC',
        paddingBottom: 10,
    },
    userInfo: {
        marginTop: 5,
        fontSize: 25,
        color: '#F64E1A',
        paddingBottom: 10,
    },
    description: {
        fontSize: 23,
    },
});

export default PropertyDetails;

