import React, { Component } from 'react'
import { connect } from 'react-redux';

import { storeSession } from '../redux/actions'
import { ImagePicker } from 'expo';
import { tryAuth, uploadImage } from '../apis';
import { Container, Title, Content, Button, Thumbnail, Body, Text, Form, Item, Label, Input, Right, Spinner } from 'native-base';
import { View, Alert } from 'react-native';
import Articles from './articles';
class SignUp extends Component {
    static navigationOptions = {
        title: 'Signup',
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            usernameInputVal: '',
            passwordInputVal: '',
            fullName: '',
            profileImageId: '',
            city: '',
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
    async componentWillMount() {
        await Expo.Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            //   Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
        });
        this.setState({ loading: false });
    }

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

    handleSignUpPressed = async () => {


        var resp = await tryAuth(this.state.usernameInputVal, this.state.passwordInputVal, "signup");
        console.log(resp)
        if (resp.status !== 200) {
            if (resp.status === 503) {
                Alert.alert("Network Error", "Please check your internet connection");
            } else if (resp.status === 400) {
                Alert.alert("Account Exists", "Please choose diff username");
            } else {
                Alert.alert("Unauthorized", "Invalid Credentials");
            }
        } else {
            var respBody = await resp.json();
            console.log("SignUp Response")
            console.log(respBody);
            var session = {
                token: respBody.auth_token,
                userId: respBody.hasura_id
            }
            await storeSession(session);
            this.props.dispatch({ type: 'SET_SESSION', session });
            // var imageUploadRes = await uploadImage()
            // var createUserData= await tryUserCreate(this.state.fullName, this.state.) 
        }
    }
    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({ image: result.uri });
            console.log(this.state)
        }
    };

    render() {
        if (Object.keys(this.props.session).length === 0) {
            return (
                <Content contentContainerStyle={{ justifyContent: 'center', margin: 20 }}>
                    <Form>
                        <Text style={{ paddingBottom: 10, paddingTop: 10 }}>Profile Details</Text>
                        <Item floatingLabel>
                            <Label>Username</Label>
                            <Input value={this.state.usernameInputVal} onChangeText={this.handleUsernameChange} />
                        </Item>
                        <Item floatingLabel>
                            <Label>Password</Label>
                            <Input value={this.state.passwordInputVal} onChangeText={this.handlePasswordChange} secureTextEntry />
                        </Item>
                        <Item floatingLabel>
                            <Label>Full Name</Label>
                            <Input value={this.state.fullName} onChangeText={this.handleFullNameChange} />
                        </Item>
                        <Item floatingLabel>
                            <Label>City</Label>
                            <Input value={this.state.city} onChangeText={this.handleCityChange} />
                        </Item>
                        <Text style={{ paddingBottom: 10, paddingTop: 10 }}>Profile Picture</Text>
                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", paddingTop: 10 }}>
                            <Button onPress={this._pickImage} >
                                <Text>Pick </Text>
                            </Button>
                            <Button>
                                <Text>Upload</Text>
                            </Button>
                        </View>

                    </Form>
                    <View style={{ height: 10 }} />
                    <Button block title="Log in" onPress={this.handleSignUpPressed} >
                        <Text>SingUp</Text>
                    </Button>
                    <View style={{ height: 10 }} />
                </Content>
            )
        }
        else {
            return (<Articles />)
        }

    }
}

function mapStateToProps(state) {
    return {
        /**
         * This state object is taken from the store 
         * session curresponds to the session attribute in initial state
         */
        session: state.session,
    };
}
export default connect(mapStateToProps)(SignUp);