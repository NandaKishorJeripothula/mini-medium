import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Container, Header, Title, Content, Button, Left, Body, Text, Form, Item, Label, Input, Right, Spinner } from 'native-base';
import { View, Alert } from 'react-native';

class Auth extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            usernameInputVal: '',
            passwordInputVal: ''
        }
    }
    async componentWillMount() {
        await Expo.Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            //   Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
        });
        this.setState({ loading: false });
    }
    /**
         * since we are using this keyword when we invoke method, there is no need to bind again
         * either should be done, binding or using of this keyword 
         */

    handleUsernameChange = (usernameTextBox) => {
        this.setState({
            ...this.state,
            usernameInputVal: usernameTextBox
        })
    }

    handlePasswordChange = (passwordTextBox) => {
        this.setState({
            ...this.state,
            passwordInputVal: passwordTextBox
        })
    }
    render() {
        if (this.state.loading === true) {
            return (
                <Container>
                    <Header />
                    <Content>
                        <Spinner />
                    </Content>
                </Container>
            );
        } else {
            return (
                <Container>
                    {/* <Header>
                        <Left />
                        <Body>
                            <Title> Login </Title>
                        </Body>
                        <Right />
                    </Header> */}
                    <Content contentContainerStyle={{ justifyContent: 'center', margin: 20 }}>
                        <Form>
                            <Item floatingLabel>
                                <Label>Username</Label>
                                <Input value={this.state.usernameInputVal} onChangeText={this.handleUsernameChange} />
                            </Item>
                            <Item floatingLabel>
                                <Label>Password</Label>
                                <Input value={this.state.passwordInputVal} onChangeText={this.handlePasswordChange} secureTextEntry />
                            </Item>
                        </Form>
                        <View style={{ height: 10 }} />
                        <Button block onPress={this.handleSignupPressed} >
                            <Text> Sign up </Text>
                        </Button>
                        <View style={{ height: 10 }} />
                        <Button block title="Log in" onPress={this.handleLoginPressed} >
                            <Text> Log in </Text>
                        </Button>
                    </Content>
                </Container>
            )
        }
    }
}
export default connect()(Auth);