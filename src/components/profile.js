import React, { Component } from 'react'
import { connect } from 'react-redux';

import { View, Button, Text, Container, Content, Footer, FooterTab } from 'native-base';

import FooterTabNavigator from './footerTabNavigator';

class Profile extends Component {
    render() {
        return (
            <Container>
                <Content>
                    <View>
                        <Text> Hey am artciles screen</Text>
                        <Button transparent onPress={() => { this.handleLogoutPressed() }} >
                            <Text>Logout</Text>
                        </Button>
                    </View >
                </Content>
                <Footer>
                    <FooterTab>
                        <Button full onPress={() => { this.props.navigation.navigate('Articles') }} >
                            <Text>Articles</Text>
                        </Button>
                        <Button full onPress={() => { this.props.navigation.navigate('Profile') }}>
                            <Text>Profile</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>

        )
    }
}

export default connect()(Profile);