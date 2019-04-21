import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getArticles } from '../apis';
import { View, Button, Text, Container, Content, Footer, FooterTab, List } from 'native-base';
import ArticleCard from './articleCard';
class Profile extends Component {
    static navigationOptions = {
        title: 'Profile',
    };
    constructor(props) {
        super(props);
        this.state = {
            articleData: [],
        };
        this.handleLogoutPressed = this.handleLogoutPressed.bind(this);
        this.fetchArticles = this.fetchArticles.bind(this);
    }
    componentDidMount = () => {
        this.fetchArticles();
    }
    fetchArticles = async () => {
        //fetch and render the articles 
        var articleData = await getArticles(this.props.session.token);
        //console.log("From Profile \n", articleData);
        this.setState({ articleData: articleData });
    }

    renderArticles = () => {
        if (this.state.articleData.length > 0) {
            console.log("Aftrs Before map");
            var aa = [];
            this.state.articleData.forEach((item, i) => {
                aa[i] = <ArticleCard id={item.id} key={i} article={item} userArticle={true} />;

            })
            console.log(aa);

            return aa;
        }
    }
    handleLogoutPressed = async () => {
        this.props.dispatch(logout());
    }
    render() {
        return (
            <Container>
                <Content>
                    <View>
                        <Text> Hey am Profile screen</Text>
                        <Button transparent onPress={() => { this.handleLogoutPressed() }} >
                            <Text>Logout</Text>
                        </Button>
                        <List>{this.renderArticles()}</List>
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