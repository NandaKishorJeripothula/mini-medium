import React, { Component } from 'react'
import { connect } from 'react-redux';
import { View, Button, Text, Container, Content, Footer } from 'native-base';
import { logout } from '../redux/actions'
import { withNavigation } from 'react-navigation';
import FooterTabNavigator from './footerTabNavigator';
class Articles extends Component {
    static navigationOptions = {
        title: 'Articles',
    };
    constructor(props) {
        super(props);
    }

    handleLogoutPressed() {
        this.props.dispatch(logout());
    }
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
                    <FooterTabNavigator />
                </Footer>

            </Container>

        )
    }
}
export default connect()(withNavigation(Articles));