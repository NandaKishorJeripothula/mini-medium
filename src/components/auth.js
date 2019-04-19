import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { storeSession } from '../redux/actions'
import { tryAuth } from '../apis'
import { Container, Title, Content, Button, Thumbnail, Left, Body, Text, Form, Item, Label, Input, Right, Spinner } from 'native-base';
import { View, Alert } from 'react-native';
import { withNavigation } from 'react-navigation';

class Auth extends Component {
    static navigationOptions = {
        title: 'Authentication',
    };

    constructor(props) {
        super(props);
        this.state = {
            // loading: true,
            usernameInputVal: '',
            passwordInputVal: ''
        }
    }
    // async componentWillMount() {
    //     await Expo.Font.loadAsync({
    //         Roboto: require("native-base/Fonts/Roboto.ttf"),
    //         Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    //         //   Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
    //     });
    //     this.setState({ loading: false });
    // }
    /**
         * since we are using this keyword when we invoke method, there is no need to bind again
         * either should be done, binding or using of this keyword 
         */
    handleLoginPressed = async () => {
        var resp = await tryAuth(this.state.usernameInputVal, this.state.passwordInputVal, "login");
        console.log(resp)
        if (resp.status !== 200) {
            if (resp.status === 503) {
                Alert.alert("Network Error", "Please check your internet connection");
            } else {
                Alert.alert("Unauthorized", "Invalid Credentials");
            }
        } else {
            var respBody = await resp.json();
            console.log("Login Response")
            console.log(respBody);
            var session = {
                token: respBody.auth_token,
                userId: respBody.hasura_id
            }
            await storeSession(session);
            this.props.dispatch({ type: 'SET_SESSION', session });

        }
    }

    handleUsernameChange = (usernameTextBox) => {
        this.setState({ usernameInputVal: usernameTextBox });
    }

    handlePasswordChange = (passwordTextBox) => {
        this.setState({ passwordInputVal: passwordTextBox });

    }
    render() {
        // if (this.state.loading === true) {
        //     return (
        //         <Container>
        //             <Content>
        //                 <Spinner />
        //             </Content>
        //         </Container>
        //     );
        // } else {
        return (
            <Content contentContainerStyle={{ justifyContent: 'center', margin: 20 }}>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                    <Thumbnail square style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }} large source={require('../../assets/icon.png')} />

                </View>
                <Text> Login </Text>
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
                <Button block title="Log in" onPress={this.handleLoginPressed} >
                    <Text> Log in </Text>
                </Button>
                <View style={{ height: 10 }} />
                <Button transparent onPress={() => this.props.navigation.navigate('SignUp')}>
                    <Text> New to Mini-Medium? Join Us here...</Text>
                </Button>
                <View style={{ height: 10 }} />
            </Content>
        )
    }
    // }
}
function mapStateToProps(state) {
    return {
        session: state.session,
    };
}
export default connect(mapStateToProps)(withNavigation(Auth));