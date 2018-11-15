'use strict'
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';

import {
    Container,
    Form,
    Text,
    Content,
    Header,
    Button,
    Icon,
    Item,
    Input,
    Spinner,
    Left,
    Title,
    Right,
    Body,
    Label,
    Textarea,
    Picker,
} from 'native-base';

import {appName} from '../config';
import numeral from 'numeral';

import propertyService from '../services/PropertyService';

class PropertyFormScreen extends Component
{

    static navigationOptions = {
        title: appName + ' - New Propery',
    };

    constructor(props)
    {
        super(props);
        this.state = {
            types: new Array(),
            isLoading: false,
            propTitle: '',
            propDescription: '',
            propPrice: 0,
            type_id: 0,
            propAction: '',
            message: '',
            title: appName + ' - New Propery',
        };
        this.fetchPropertyTypes();
    }

    async fetchPropertyTypes()
    {
        try {
            let results = await propertyService.fetchAllPropertyTypes();
            //console.log(results);
            this.setState({types: results});
        } catch (error) {
            console.error(error);
        }
    }

    onTitleTextChanged = (text: string) => {
        this.setState({propTitle: text});
    };

    onDescriptionTextChanged = (text: string) => {
        this.setState({propDescription: text});
    };

    onPriceChanged = (text: string) => {
        this.setState({propPrice: numeral(text).value()});
    };

    onTypeChanged = (val: number) => {
        console.log(val);
        this.setState({type_id: val});
    };

    onActionChanged = (val: string) => {
        console.log(val);
        this.setState({propAction: val});
    };

    onSubmitButtonPressed = async () => {
        try {
            alert(JSON.stringify(this.state.types));
            /*
            this.setState({ isLoading: true, message: 'Loading...' });
            const results = await propertyService.addProperties(this.state.searchString)
            console.log(results);
            // let properties = results.response.listings;
            let properties = results;
            if (properties.length === 0) {
                this.setState({ isLoading: false, properties: new Array(), message: 'No results matching you search, please try again.' });
            } else {
                this.setState({ isLoading: false, properties: properties, message: '' });
            }
            */
        } catch (error) {
            console.error(error);
            this.setState({isLoading: false, message: error.message});
        }
    };

    renderContent()
    {
        if (this.state.isLoading) {
            return <Spinner color='blue' style={styles.spinner}/>;
        } else if (this.state.message.length > 0) {
            return <Text style={styles.message}>{this.state.message}</Text>;
        } else {
            return (
                <Form>
                    <Item>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="ios-arrow-down-outline"/>}
                            placeholder="Property Type"
                            placeholderStyle={{color: "#bfc6ea"}}
                            placeholderIconColor="#007aff"
                            style={{width: undefined}}
                            selectedValue={this.state.type_id}
                            onValueChange={this.onTypeChanged.bind(this)}
                        >
                            {
                                this.state.types.map((item, index) => {
                                    return (<Picker.Item label={item.title} value={item.id} key={item.id}/>);
                                })
                            }
                        </Picker>
                    </Item>
                    <Item>
                        <Picker
                            iosIcon={<Icon name="ios-arrow-down-outline"/>}
                            placeholder="For ?"
                            placeholderStyle={{color: "#bfc6ea"}}
                            placeholderIconColor="#007aff"
                            style={{width: undefined}}
                            selectedValue={this.state.propAction}
                            onValueChange={this.onActionChanged.bind(this)}
                        >
                            <Picker.Item label="Sale" value="sale" />
                            <Picker.Item label="Rent" value="rent" />
                            <Picker.Item label="Lease" value="lease" />
                        </Picker>
                    </Item>
                    <Item floatingLabel>
                        <Label>Title</Label>
                        <Input value={this.state.propTitle} onChangeText={this.onTitleTextChanged}/>
                    </Item>
                    <Item floatingLabel>
                        <Label>Description</Label>
                        <Textarea rowSpan={5} value={this.state.propDescription}
                                  onChangeText={this.onDescriptionTextChanged}></Textarea>
                    </Item>
                    <Item floatingLabel>
                        <Label>Price</Label>
                        <Input keyboardType='numeric'
                               value={this.state.propPrice > 0 ? numeral(this.state.propPrice).format("0,0") : ''}
                               onChangeText={this.onPriceChanged}/>
                    </Item>
                    <Button warning style={styles.submitBtn} onPress={this.onSubmitButtonPressed}>
                        <Text style={styles.submitBtnTxt}>Add Property</Text>
                    </Button>
                </Form>
            );
        }
    }

    render()
    {
        return (
            <Container>
                <Header style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Left style={{flex: 1.3,}}>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body style={{flex: 7.2,}}>
                    <Title style={{color: '#fff', fontWeight: 'bold', fontSize: 18,}}>{this.state.title}</Title>
                    </Body>
                    <Right style={{flex: 1.5,}}>
                        <Button transparent>
                            <Icon name='menu'/>
                        </Button>
                    </Right>
                </Header>
                <Content>
                    {this.renderContent()}
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
    submitBtn: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "center",
        alignSelf: "center",
    },
    submitBtnTxt: {
        fontSize: 22,
        justifyContent: "center",
    },
});

export default PropertyFormScreen;

