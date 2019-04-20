import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getArticles } from '../apis';
import { View, Button, Text, Container, Content, Footer, FooterTab } from 'native-base';

import FooterTabNavigator from './footerTabNavigator';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.fetchArticles = this.fetchArticles.bind(this);
    }
    componentDidMount = () => {
        this.fetchArticles();
    }
    fetchArticles = async () => {
        //fetch and render the articles 
        var articleData = await getArticles(this.props.session.token, this.props.session.user_id);
        console.log("From Profile Page \n", articleData);
        this.setState({ articleData: articleData });
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
mapStatetoProps = (state) => {
    return { session: state.session }
}
export default connect(mapStatetoProps)(Profile);