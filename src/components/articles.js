import React, { Component } from 'react'
import { connect } from 'react-redux';
import { View, Button, Text, Container, Content, Footer } from 'native-base';
import { logout } from '../redux/actions'
import { withNavigation } from 'react-navigation';
import FooterTabNavigator from './footerTabNavigator';
import { getArticles } from '../apis';
class Articles extends Component {
    static navigationOptions = {
        title: 'Articles',
    };
    constructor(props) {
        super(props);
        this.state = {
            articleData: '',
        }
        this.handleLogoutPressed = this.handleLogoutPressed.bind(this);

    }
    componentDidMount = async () => {
        //fetch and render the articles 
        var articleData = getArticles(this.props.session.auth_token);
        this.setState({ articleData=articleData });
    }


    handleLogoutPressed = async () => {
        this.props.dispatch(logout());
    }
    render() {
        let artciles = '';
        if (this.state.articleData.length > 0) {
            console.log(articleData)
        }
        return (
            <Container>
                <Content>
                    <View>
                        {articles}
                        <Text> Hey am artciles screen</Text>
                        <Button transparent onPress={() => { this.handleLogoutPressed }} >
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
function mapStateToProps(state) {
    return {
        session: state.session,
    };
}
export default connect(mapStateToProps)(withNavigation(Articles));